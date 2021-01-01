import ch from './amqpConnection.js';
import config from 'config';

const QUEUE = config.get('amqp.queues.progress');
const OPTIONS = config.get('amqp.options');

ch.assertQueue(QUEUE, OPTIONS);
ch.consume(QUEUE, function (msg) {
    console.log("Message:", msg.content.toString());
  }, {noAck: true}
);
