import {connect} from 'amqplib';
import config from 'config';
import DebugLib from 'debug';

const debug = new DebugLib('server:amqp');


const URL = config.get('amqp.url');
const conn = await connect(URL);
const ch = await conn.createChannel();

process.on('exit', () => {
  ch.close();
  debug(`Closing rabbitmq channel`);
});

export default ch;