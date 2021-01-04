import bodyParser from "body-parser";
import express from "express";
import eoloplantsRouter from "../routes/eoloplantsRouter.js";

export function createExpress() {
  const server = express();
  server.use(bodyParser.urlencoded({extended: true}));
  server.use(express.json());
  server.use('/', eoloplantsRouter);

  server.use(express.static('public'));
  return server;
}