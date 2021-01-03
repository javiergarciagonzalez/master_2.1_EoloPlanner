export default wsApp => (ws, req) => {
  ws.secWebsocketKey = req.headers['sec-websocket-key'];
  ws.send({'sec-websocket-key': req.headers['sec-websocket-key']})
}
