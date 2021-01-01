package es.sanguino.planner.clients;

import es.sanguino.planner.Producer;
import es.sanguino.planner.models.Eoloplant;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

@Component
public class RabbitConsumer {

	@Autowired
	private Producer producer;

	@Autowired
	private WeatherClient weatherClient;

	@Autowired
	private TopoClient topoClient;

	@RabbitListener(queues = "eoloplantCreationRequests", ackMode = "AUTO")
	public void received(Eoloplant eoloplant){

		CompletableFuture<String> weather = weatherClient.getWeather(eoloplant.getCity());
		CompletableFuture<String> landscape = topoClient.getLandscape(eoloplant.getCity());
		CompletableFuture<Void> allFutures = CompletableFuture.allOf(weather, landscape);

		weather.thenRun(() -> {
			eoloplant.setWeather(weather.join());
			producer.sendMessage(eoloplant);
		});

		landscape.thenRun(() -> {
			eoloplant.setLandscape(landscape.join());
			producer.sendMessage(eoloplant);
		});

		allFutures.thenRun(() -> producer.sendMessage(eoloplant));

		producer.sendMessage(eoloplant);
	}
}
