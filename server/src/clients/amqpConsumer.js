import ch from '../connections/amqpConnection.js';
import config from 'config';
import {updateEoloPlant} from '../models/EoloPlant.js'
import {getWs} from '../models/EoloPlantsUsers.js';
import DebugLib from 'debug';
const debug = new DebugLib('amqp:consumer');

const QUEUE = config.get('amqp.queues.progress');
const OPTIONS = config.get('amqp.options');
let clients;



async function consumePlant (msg) {
  const plant = JSON.parse(msg.content.toString());
  debug('plant received', plant);
  await updateEoloPlant(plant);
  if (plant.progress === 100) {
    clients.forEach(client => {
      client.send(JSON.stringify(plant));
    });
  } else {
    const ws = getWs(plant.id);
    if (ws) ws.send(JSON.stringify(plant));
  }
}

export default function amqpConsumer(wsEoloplants) {
  clients = wsEoloplants.clients;
  ch.assertQueue(QUEUE, OPTIONS);
  ch.consume(QUEUE, consumePlant, {noAck: true});
}