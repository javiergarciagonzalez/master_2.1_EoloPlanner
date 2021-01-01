package es.sanguino.planner.service;

import es.sanguino.planner.models.Eoloplant;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class RabbitProducer {

	@Autowired
	RabbitTemplate rabbitTemplate;

	public void sendMessage(Eoloplant eoloplant) {
		eoloplant.advanceProgress();
		if (eoloplant.getCompleted()) {
			try {
				Thread.sleep(1000 + new Random().nextInt(2000));
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		System.out.println(System.currentTimeMillis() + "  eoloplantCreationProgressNotifications: "+eoloplant.toString());
		rabbitTemplate.convertAndSend("eoloplantCreationProgressNotifications", eoloplant);
	}
}
