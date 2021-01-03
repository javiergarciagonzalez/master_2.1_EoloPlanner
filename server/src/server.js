import express from 'express';
import expressWs from 'express-ws';
import eoloplantsRouter from './routes/eoloplantsRouter.js';
import wsRouter from './routes/wsRouter.js';
import bodyParser from 'body-parser';
import amqpConsumer from "./clients/amqpConsumer.js";

const server = express();
const wsEoloplants = expressWs(server).getWss('/eoloplants');

amqpConsumer(wsEoloplants)

server.use(bodyParser.urlencoded({extended: true}));
server.use(express.json());
server.use('/', eoloplantsRouter);

server.use(express.static('public'));

server.ws('/eoloplants', wsRouter);

server.listen(8880, () => console.log('Example server listening on port 8080!'));



