package es.sanguino.planner;

import es.sanguino.planner.clients.TopoClient;
import es.sanguino.planner.clients.WeatherClient;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Component
public class Consumer {


	@Autowired
	private Producer producer;

	@Autowired
	private WeatherClient weatherClient;

	@Autowired
	private TopoClient topoClient;

	@RabbitListener(queues = "eoloplantCreationRequests", ackMode = "AUTO")
	public void received(Eoloplant eoloplant) throws ExecutionException, InterruptedException {
		System.out.println("eoloplantCreationRequests: "+eoloplant.toString());

		CompletableFuture<String> weather = weatherClient.getWeather(eoloplant.getCity());
		CompletableFuture<String> landscape = topoClient.getLandscape(eoloplant.getCity());

		System.out.println("11111");
		weather.whenCompleteAsync((s, throwable) -> {
			System.out.println("22222");
			System.out.println(s);
			eoloplant.setWeather(s);
			//producer.sendMessage(eoloplant);
		});
		System.out.println("33333");
		landscape.whenCompleteAsync((s, throwable) -> {
			System.out.println("44444");
			System.out.println(s);
			eoloplant.setLandscape(s);
			//producer.sendMessage(eoloplant);
		});
		System.out.println("44444");

		CompletableFuture<Void> combinedFuture = CompletableFuture.allOf(weather, landscape);
		System.out.println("55555");
		producer.sendMessage(eoloplant);

	}
}
