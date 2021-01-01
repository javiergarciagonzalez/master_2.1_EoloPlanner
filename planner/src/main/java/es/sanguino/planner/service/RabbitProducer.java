package es.sanguino.planner.service;

import es.sanguino.planner.models.Eoloplant;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class RabbitProducer {

	@Autowired
	RabbitTemplate rabbitTemplate;

	public void sendMessage(Eoloplant eoloplant) {
		eoloplant.advanceProgress();
		System.out.println(System.currentTimeMillis() + "  eoloplantCreationProgressNotifications: "+eoloplant.toString());
		rabbitTemplate.convertAndSend("eoloplantCreationProgressNotifications", eoloplant);
	}
}
