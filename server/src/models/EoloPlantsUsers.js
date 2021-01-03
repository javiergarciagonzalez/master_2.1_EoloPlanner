const plantsWs = new WeakMap();
const usersWs = new WeakMap();


export function savePlant (plantId, userId) {
  console.log('savePlant', plantId, userId);
  plantsWs.set(plantId, usersWs.get(userId));
}

export function saveClient (userId, ws) {
  console.log('saveClient', userId);
  usersWs.set(userId, ws);
}

export function getWs (plantId) {
  console.log('getWs', plantId);
  console.log('getWs', plantsWs.get(plantId));
  return plantsWs.get(plantId);
}