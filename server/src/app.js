import express from 'express';
import expressWs from 'express-ws';
import eoloplantsRouter from './routes/eoloplantsRouter.js';
import wsRouter from './routes/wsRouter.js';
import bodyParser from 'body-parser';
import amqpConsumer from "./connections/amqpConsumer.js";

const app = express();
const wsApp = expressWs(app);
const wsEoloplants = wsApp.getWss('/eoloplants');
amqpConsumer(wsEoloplants)

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use('/', eoloplantsRouter);


app.use(express.static('public'));

app.ws('/eoloplants', wsRouter(wsApp));

app.listen(8880, () => console.log('Example app listening on port 8080!'));



