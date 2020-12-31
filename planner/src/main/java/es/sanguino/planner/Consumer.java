package es.sanguino.planner;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Consumer {


	@Autowired
	private Producer producer;

	@RabbitListener(queues = "eoloplantCreationRequests", ackMode = "AUTO")
	public void received(Eoloplant eoloplant) {
		System.out.println("eoloplantCreationRequests: "+eoloplant.toString());
		producer.sendMessage(eoloplant);
	}
}
