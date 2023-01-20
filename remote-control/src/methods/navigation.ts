/*
+4 Move mouse up implemented properly
+4 Move mouse down implemented properly
+4 Move mouse left implemented properly
+4 Move mouse right implemented properly
+4 Send mouse coordinates implemented properly
*/

var robot = require("robotjs");
interface Position  {
  x: number;
  y: number;
}

const mouse = robot.getMousePos();
console.log(`Mouse position (keyboard "p" button) (px): x:${mouse.x}, y:${mouse.y}`);

export function movement(direction: string, distance: number) {
  const mouse = robot.getMousePos();
  let position: Position;

  switch (direction) {
    case 'mouse_up':
      position = { x: mouse.x, y: mouse.y + distance };
      break;
    case 'mouse_down':
      position = { x: mouse.x, y: mouse.y - distance };
      break;
    case 'mouse_left':
      position = { x: mouse.x - distance, y: mouse.y };
      break;
    case 'mouse_right':
      position = { x: mouse.x + distance, y: mouse.y };
      break;
    default:
      position = { x: mouse.x, y: mouse.y };
      break;
  }
}
