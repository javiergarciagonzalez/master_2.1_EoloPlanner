import {saveClient} from '../models/EoloPlantsUsers.js'

export default (ws, req) => {
  saveClient(req.headers['sec-websocket-key'], ws);
  console.log('user connected');
  ws.send(JSON.stringify({'sec-websocket-key': req.headers['sec-websocket-key']}));

}
