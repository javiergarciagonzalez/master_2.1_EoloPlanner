package es.sanguino.planner.clients;

import es.sanguino.planner.service.RabbitProducer;
import es.sanguino.planner.models.Eoloplant;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Random;
import java.util.concurrent.CompletableFuture;

@Component
public class RabbitConsumer {

	@Autowired
	private RabbitProducer rabbitProducer;

	@Autowired
	private WeatherClient weatherClient;

	@Autowired
	private TopoClient topoClient;

	@RabbitListener(queues = "eoloplantCreationRequests", ackMode = "AUTO")
	public void received(Eoloplant eoloplant){
		rabbitProducer.sendMessage(eoloplant);

		CompletableFuture<String> weather = weatherClient.getWeather(eoloplant.getCity());
		CompletableFuture<String> landscape = topoClient.getLandscape(eoloplant.getCity());
		CompletableFuture<Void> allFutures = CompletableFuture.allOf(weather, landscape);

		eoloplant.advanceProgress();
		rabbitProducer.sendMessage(eoloplant);

		weather.thenRun(() -> {
			eoloplant.addPlanning(weather.join());
			eoloplant.advanceProgress();
			rabbitProducer.sendMessage(eoloplant);
		});

		landscape.thenRun(() -> {
			eoloplant.addPlanning(landscape.join());
			eoloplant.advanceProgress();
			rabbitProducer.sendMessage(eoloplant);
		});

		allFutures.thenRun(() -> {
			eoloplant.advanceProgress();
			rabbitProducer.sendMessage(eoloplant);
		});
	}
}
