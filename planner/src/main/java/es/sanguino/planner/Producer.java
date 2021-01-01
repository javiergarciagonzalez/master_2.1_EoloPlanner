package es.sanguino.planner;

import es.sanguino.planner.models.Eoloplant;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class Producer {

	@Autowired
	RabbitTemplate rabbitTemplate;

	public void sendMessage(Eoloplant eoloplant) {
		eoloplant.advanceProgress();
		System.out.println("eoloplantCreationProgressNotifications: "+eoloplant.toString());
		rabbitTemplate.convertAndSend("eoloplantCreationProgressNotifications", eoloplant);
	}
}
