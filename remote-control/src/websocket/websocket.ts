import { WebSocketServer, createWebSocketStream } from 'ws';
import { movement } from '../methods/navigation';
import { drawing } from '../methods/drawing';
import { printing } from '../methods/screen';
import { mouse, left, right, up, down, } from '@nut-tree/nut-js';

const port = 8080

export const wss = new WebSocketServer({ port });

console.log(`Start WebSocket server http://localhost:${port} on the port ${port}!`);

wss.on('connection', (ws) => {
  const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  duplex.on('open', () => {
    console.log('connected');
  });

  duplex.on('data', async (chunk: object) => {
    console.log(`received: ${chunk}`);
    const [command, distance, height] = chunk.toString().split(' ');

    switch (command.split('_')[0]) {
      case 'mouse':
        if (command === 'mouse_position') {
          duplex.write(`${command}_(${(await mouse.getPosition()).x.toString()},${(await mouse.getPosition()).y.toString()})`);
        }
        else {
          movement(command, Number(distance));
          duplex.write(`${command}_${distance}`);
        }
        break;
      case 'draw':
        if (chunk.toString().split(' ').length === 3) {
          drawing(command, Number(distance), Number(height));
          duplex.write(`${command}_${distance}_${height}`);
        } else {
          drawing(command, Number(distance), Number(distance));
          duplex.write(`${command}_${distance}`);
        }
        break;
      case 'prnt':
        printing();
        break;
    }
  });

  duplex.on('close', () => {
    console.log('disconnected');
  });

  duplex.on('error', (err) => {
    console.log(err);
  })
});

/*
    Drawing
Draw circle with pushed left button:
<- draw_circle {px}
Draw rectangle with pushed left button:
<- draw_rectangle {px} {px}
Draw square with pushed left button:
<- draw_square {px}
Print screen
Make print screen command and send image (a base64 buffer of the 200 px square around the mouse position):
<- prnt_scrn
-> prnt_scrn {base64 string (png buf)}
*/
