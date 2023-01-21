import { mouse, left, right, up, down } from '@nut-tree/nut-js';

export async function movement(direction: string, distance: number) {
  switch (direction) {
    case 'mouse_up':
      await mouse.move(up(distance));
      break;
    case 'mouse_down':
      await mouse.move(down(distance));
      break;
    case 'mouse_left':
      await mouse.move(left(distance));
      break;
    case 'mouse_right':
      await mouse.move(right(distance));
      break;
  }
}
