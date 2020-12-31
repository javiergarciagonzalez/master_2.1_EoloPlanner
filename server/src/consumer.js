var amqp = require('amqplib/callback_api');

const CONN_URL = 'amqp://guest:guest@localhost';

const QUEUE = "eoloplantCreationProgressNotifications";

amqp.connect(CONN_URL, async function (err, conn) {

  let ch = await conn.createChannel();
  ch.assertQueue(QUEUE, {durable: false});
  ch.consume(QUEUE, function (msg) {

      console.log("Message:", msg.content.toString());

    }, {noAck: true}
  );

});
