import { httpServer } from "./src/http_server/index";
import { mouse } from "@nut-tree/nut-js";

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);

httpServer.listen(HTTP_PORT);
//
import WebSocket, { createWebSocketStream } from 'ws';

const ws = new WebSocket('wss://websocket-echo.com/');//

export const duplex = createWebSocketStream(ws, { encoding: 'utf8' });

//duplex.pipe(process.stdout);

//process.stdin.pipe(duplex);

//
ws.on('connection', (ws) => {

  console.log('WebSocketServer started')

  const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
  
  duplex.on('data', async (chunk: object) => {
    console.log('received: %s', chunk);
  });
    
    duplex.write('WebSocketServer_started');
    
  duplex.on('end', () => {
    console.log('WebSocketServer is closed!')
  })
    
  duplex.on('error', (err) => {
    console.log('ERROR: ', err);
  })
  
});
