import {saveClientSocket} from '../connections/wsConnection.js'
import DebugLib from 'debug';
const debug = new DebugLib('server:ws');

export default (ws, req) => {
  debug('user connected', req.headers['sec-websocket-key']);
  saveClientSocket(req.headers['sec-websocket-key'], ws);
  ws.send(JSON.stringify({'user-key': req.headers['sec-websocket-key']}));
}
