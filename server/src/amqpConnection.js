import {connect} from 'amqplib';
import config from 'config';

const URL = config.get('amqp.url');
const conn = await connect(URL);
const ch = await conn.createChannel();

process.on('exit', (code) => {
  ch.close();
  console.log(`Closing rabbitmq channel`);
});

export default ch;