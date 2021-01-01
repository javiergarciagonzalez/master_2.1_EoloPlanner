import ch from './amqpConnection.js';
import config from 'config';

const QUEUE = config.get('amqp.queues.creation');
const OPTIONS = config.get('amqp.options');

export default function amqpProducer(plant) {
  ch.assertQueue(QUEUE, OPTIONS);

  const data = JSON.stringify({
    id: plant.id,
    city: plant.city
  });

  console.log(`sending ${data}`);
  ch.sendToQueue(QUEUE, Buffer.from(data));
}