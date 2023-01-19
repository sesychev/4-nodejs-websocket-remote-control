import { httpServer } from '../http_server/index';
import { WebSocketServer, createWebSocketStream } from 'ws';

const port = 8080

const ws = new WebSocketServer({ port });

console.log(`Start WebSocketServer on the port ${port}!`);

ws.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});


//export const duplex = createWebSocketStream(ws, { encoding: 'utf8' });

//duplex.pipe(process.stdout);

//process.stdin.pipe(duplex);


ws.on('connection', (ws) => {

  console.log('WebSocketServer started')

  const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });
  
  duplex.on('data', async (chunk: object) => {
    console.log('received: %s', chunk);
  });

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

