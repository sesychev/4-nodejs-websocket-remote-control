import { WebSocketServer, createWebSocketStream } from 'ws';
import { movement } from '../methods/navigation';

const port = 8080

export const wss = new WebSocketServer({ port });

console.log(`Start WebSocket server http://localhost:${port} on the port ${port}!`);

wss.on('connection', (ws) => {
  const duplex = createWebSocketStream(ws, { encoding: 'utf8', decodeStrings: false });

  duplex.on('data', async (chunk: object) => {
    console.log(`received: ${chunk}`);
    const [command, distance] = chunk.toString().split(' ');
    //duplex.write(chunk.toString())
    duplex.write(`${command}_${distance}`);
    switch (command.split('_')[0]) {
      case 'mouse':
        movement(command, Number(distance))
        break;
      case 'draw':

        break;
      case 'prnt':
        break;
      default:
        break;
    }

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


//
    //mouse_position {x px},{y px}
    //mouse_right {x px}
    //mouse_left {x px}
    //duplex.write(`${movement} ${distance} px`);
    //duplex.write(`${movement} ${distance}`);
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
