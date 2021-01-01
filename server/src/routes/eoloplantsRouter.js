import {Router} from 'express';
import {EoloPlant} from '../models/EoloPlant.js'
import amqpProducer from "../connections/amqpProducer.js";

function getRoutes() {
  const routes = Router();

  // routes.get('/api/eoloplants', async function (req, res, next) {
  //     const books = await Book.find({}).select('_id title').exec();
  //     return res.json(books);
  // });

  routes.post('/api/eoloplants', async (req, res) => {
    const plant = EoloPlant.build(req.body)
    try {
      await plant.save();
    } catch (e) {
      return res.status(409).send('Bad request!');
    }
    amqpProducer(plant);
    return res.json(plant);
  });

  routes.get("/api/eoloplants/:id", async (req, res) => {

      return res.json(book);
  });

  return routes;
}

export default getRoutes();
