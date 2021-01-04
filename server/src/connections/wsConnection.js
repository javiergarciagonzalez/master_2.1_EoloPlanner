import expressWs from 'express-ws';
import wsRouter from "../routes/wsRouter.js";
import DebugLib from 'debug';

const plantsWs = new Map();
const usersWs = new Map();
const debug = new DebugLib('server:ws');

export let wsEoloplants

export function createWs(server) {
  wsEoloplants = expressWs(server).getWss('/eoloplants');
  server.ws('/eoloplants', wsRouter);
}

export function savePlantCreator(plantId, userId) {
  debug('savePlantCreator', plantId, userId);
  plantsWs.set(plantId, usersWs.get(userId));
}

export function saveClientSocket(userId, ws) {
  debug('saveClientSocket', userId);
  usersWs.set(userId, ws);
}

export function wsSend(plant) {
  if (plant.completed) {
    wsEoloplants.clients.forEach(client => {
      client.send(JSON.stringify(plant));
    });
  } else {
    const ws = plantsWs.get(plant.id);
    if (ws)
      ws.send(JSON.stringify(plant));
  }
}