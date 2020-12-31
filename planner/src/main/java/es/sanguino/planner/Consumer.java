package es.sanguino.planner;

import es.sanguino.planner.clients.WeatherClient;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

@Component
public class Consumer {


	@Autowired
	private Producer producer;

	@Autowired
	private WeatherClient weatherClient;

	@RabbitListener(queues = "eoloplantCreationRequests", ackMode = "AUTO")
	public void received(Eoloplant eoloplant) {
		System.out.println("eoloplantCreationRequests: "+eoloplant.toString());

		CompletableFuture<String> weather = weatherClient.getWeather(eoloplant.getCity());


		producer.sendMessage(eoloplant);
	}
}
