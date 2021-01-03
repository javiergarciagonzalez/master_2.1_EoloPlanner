const plantsWs = new Map();
const usersWs = new Map();
import DebugLib from 'debug';

const debug = new DebugLib('server:users:relations');
let wsEoloplants;

export function savePlant(plantId, userId) {
  debug('savePlant', plantId, userId);
  plantsWs.set(plantId, usersWs.get(userId));
}

export function saveClient(userId, ws) {
  debug('saveClient', userId);
  usersWs.set(userId, ws);
}

export function createWSEoloplants(wsEP) {
  wsEoloplants = wsEP;
}

export function wsSend(plant) {
  if (plant.progress === 100) {
    wsEoloplants.clients.forEach(client => {
      client.send(JSON.stringify(plant));
    });
  } else {
    const ws = plantsWs.get(plant.id);
    if (ws)
      ws.send(JSON.stringify(plant));
  }
}