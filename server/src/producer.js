const amqp = require('amqplib/callback_api');

const CONN_URL = 'amqp://guest:guest@localhost';
const QUEUE = "eoloplantCreationRequests";

amqp.connect(CONN_URL, async function (err, conn) {

  let ch = await conn.createChannel();
  ch.assertQueue(QUEUE, {durable: false});

  const data = JSON.stringify({
    id: 1,
    city: 'Madrid'
  });
  console.log(`sending ${data}`);
  ch.sendToQueue(QUEUE, Buffer.from(data));

  process.on('exit', (code) => {
    ch.close();
    console.log(`Closing rabbitmq channel`);
  });
});




