import { WebSocketServer, createWebSocketStream } from 'ws';

const port = 8080
const WS_PORT = 8080;

export const wss = new WebSocketServer({ port });
console.log(`Start WebSocket server http://localhost:${WS_PORT} on the port ${WS_PORT}!`);

wss.on('connection', function connection(ws) {
  const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  duplex.on('data', async (chunk: object) => {
    console.log('received: %s', chunk);
  });
});