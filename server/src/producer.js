import ch from './amqpConnection.js';
import config from 'config';

const QUEUE = config.get('amqp.queues.creation');
const OPTIONS = config.get('amqp.options');

ch.assertQueue(QUEUE, OPTIONS);

const data = JSON.stringify({
  id: 1,
  city: 'Madrid'
});

console.log(`sending ${data}`);
ch.sendToQueue(QUEUE, Buffer.from(data));
