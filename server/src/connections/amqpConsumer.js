import ch from './amqpConnection.js';
import config from 'config';
import {EoloPlant} from '../models/EoloPlant.js'

const QUEUE = config.get('amqp.queues.progress');
const OPTIONS = config.get('amqp.options');
let clients;

async function updateDB(plant) {
  const plantSQL = await EoloPlant.findOne({
    where: {
      id: plant.id
    }
  });

  plantSQL.progress = plant.progress;
  if (plant.completed) {
    const [,weather, landscape] = plant.planning.split('-');
    plantSQL.weather = weather;
    plantSQL.landscape = landscape;
  }
  await plantSQL.save();
}

async function consumePlant (msg) {
  const plant = JSON.parse(msg.content.toString());
  console.log("Plant progress:", plant);
  await updateDB(plant);
  clients.forEach(client => {
    client.send(JSON.stringify(plant));
  });
}

export default function amqpConsumer(wsEoloplants) {
  clients = wsEoloplants.clients;
  ch.assertQueue(QUEUE, OPTIONS);
  ch.consume(QUEUE, consumePlant, {noAck: true});
}