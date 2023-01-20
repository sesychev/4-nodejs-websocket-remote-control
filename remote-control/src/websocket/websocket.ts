import { WebSocketServer, createWebSocketStream } from 'ws';

const port = 8282

export const wss = new WebSocketServer({ port });

console.log(`Start WebSocket server http://localhost:${port} on the port ${port}!`);

wss.on('connection', (ws) => {
  const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  duplex.on('data', async (chunk: object) => {
    console.log('received: %s', chunk.toString().split(' '));
  });

  duplex.on('open', () =>{
    console.log('connected');
  });
  
  duplex.on('close', () => {
    console.log('disconnected');
  });

  duplex.on('error', (err) => {
    console.log(err);
  })
});