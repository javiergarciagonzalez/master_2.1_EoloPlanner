import {connect} from 'amqplib';
import config from 'config';
import DebugLib from 'debug';
import amqpConsumer from './amqpConsumer.js';

export let ch;

export async function createAmqp() {
  const debug = new DebugLib('server:amqp');
  const URL = config.get('amqp.url');
  const conn = await connect(URL);
  ch = await conn.createChannel();
  amqpConsumer(ch);

  process.on('exit', () => {
    ch.close();
    debug(`Closing rabbitmq channel`);
  });
}
