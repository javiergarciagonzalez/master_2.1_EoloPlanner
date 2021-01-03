import {saveClient} from '../models/EoloPlantsUsers.js'
import DebugLib from 'debug';
const debug = new DebugLib('ws');

export default (ws, req) => {
  debug('user connected', req.headers['sec-websocket-key']);
  saveClient(req.headers['sec-websocket-key'], ws);
  ws.send(JSON.stringify({'user-key': req.headers['sec-websocket-key']}));
}
