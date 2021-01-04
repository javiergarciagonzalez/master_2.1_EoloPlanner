import {createAmqp} from "./connections/amqpConnection.js";
import {createWs} from './connections/wsConnection.js';
import {createExpress} from './connections/restConnection.js';

const server = createExpress();
createWs(server)
await createAmqp();

server.listen(3000, () => console.log('Server listening on port 3000!'));
