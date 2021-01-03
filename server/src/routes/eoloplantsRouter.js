import {Router} from 'express';
import {EoloPlant} from '../models/EoloPlant.js'
import amqpProducer from "../clients/amqpProducer.js";
import {savePlantCreator} from '../clients/wsClient.js';
import DebugLib from 'debug';

const debug = new DebugLib('server:rest');

function getRoutes() {
  const routes = Router();

  routes.get('/api/eoloplants', async function (req, res, next) {
    const plants = await EoloPlant.findAll();
    if (plants.length === 0)
      return res.status(404).send('Not Found!');
    return res.json(plants);
  });

  routes.post('/api/eoloplants', async (req, res) => {
    const plant = EoloPlant.build(req.body)
    try {
      await plant.save();
    } catch (e) {
      return res.status(409).send('Bad request!');
    }
    debug('user-key recieved', req.headers['user-key'])
    savePlantCreator(plant.id, req.headers['user-key']);
    amqpProducer(JSON.stringify({
      id: plant.id,
      city: plant.city
    }));
    return res.status(202).json(plant);
  });

  routes.get("/api/eoloplants/:id", async (req, res) => {
    const plant = await EoloPlant.findOne({
      where: {
        id: req.params.id
      }
    });
    if (plant === null)
      return res.status(404).send('Not Found!');
    return res.json(plant);
  });

  routes.delete("/api/eoloplants/:id", async (req, res) => {
    const plant = await EoloPlant.findOne({
      where: {
        id: req.params.id
      }
    });
    if (plant === null)
      return res.status(404).send('Not Found!');
    plant.destroy();
    return res.json(plant);
  });

  return routes;
}

export default getRoutes();
