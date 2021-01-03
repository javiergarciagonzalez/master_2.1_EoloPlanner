import ch from '../connections/amqpConnection.js';
import config from 'config';
import DebugLib from 'debug';

const debug = new DebugLib('server:amqp:producer');
const QUEUE = config.get('amqp.queues.creation');
const OPTIONS = config.get('amqp.options');

export default function amqpProducer(plant) {
  ch.assertQueue(QUEUE, OPTIONS);
  debug(`sending ${plant}`);
  ch.sendToQueue(QUEUE, Buffer.from(plant));
}