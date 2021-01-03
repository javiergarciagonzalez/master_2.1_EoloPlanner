const plantsWs = new Map();
const usersWs = new Map();
import DebugLib from 'debug';
const debug = new DebugLib('server:users:relations');
let wsEoloplants;

export function savePlant (plantId, userId) {
  debug('savePlant', plantId, userId);
  plantsWs.set(plantId, usersWs.get(userId));
}

export function saveClient (userId, ws) {
  debug('saveClient', userId);
  usersWs.set(userId, ws);
}

export function saveClients (wsEP) {
  wsEoloplants = wsEP;
}

export function getClients () {
  return wsEoloplants.clients;
}

export function getWs (plantId) {
  debug('getWs', plantId);
  return plantsWs.get(plantId);
}