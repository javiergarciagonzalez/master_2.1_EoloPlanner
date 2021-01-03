import ch from '../connections/amqpConnection.js';
import config from 'config';
import {updateEoloPlant} from '../models/EoloPlant.js'
import {wsSend} from './wsClient.js';
import DebugLib from 'debug';

const debug = new DebugLib('server:amqp:consumer');
const QUEUE = config.get('amqp.queues.progress');
const OPTIONS = config.get('amqp.options');

export default function amqpConsumer() {
  ch.assertQueue(QUEUE, OPTIONS);
  ch.consume(QUEUE, async msg => {
    const plant = JSON.parse(msg.content.toString());
    debug('plant received', plant.id);
    const saved = await updateEoloPlant(plant);
    await wsSend(saved);
  }, {noAck: true});
}