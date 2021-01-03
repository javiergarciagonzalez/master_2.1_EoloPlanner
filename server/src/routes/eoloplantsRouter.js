import {Router} from 'express';
import {EoloPlant} from '../models/EoloPlant.js'
import amqpProducer from "../clients/amqpProducer.js";
import {savePlant} from '../models/EoloPlantsUsers.js';

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
    savePlant(plant.id, req.headers['user-key']);
    amqpProducer(plant);
    return res.json(plant);
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
