import { mouse, left, right, up, down, Point } from '@nut-tree/nut-js';

export async function drawing(draw: string, width: number, length: number) {
  mouse.config.mouseSpeed = 100;
  switch (draw) {
    case 'draw_circle':
      await mouse.drag(circle(width));
      break;
    case 'draw_rectangle':
      await rectangle(width, length)
      break
    case 'draw_square':
      await rectangle(width, width)
      break;
  }
}

async function circle(radius: number): Promise<Point[]> {
  mouse.config.mouseSpeed = 75;
  const path: Point[] = [];

  for (let i = 0; i <= Math.PI * 2; i += 0.02) {
    const x = (await mouse.getPosition()).x + (radius * Math.cos(i));
    const y = (await mouse.getPosition()).y + (radius * Math.sin(i));
    path.push(new Point(x, y))
  }

  return path;
}

async function rectangle(width: number, length: number) {
  await mouse.move(right(width));
  await mouse.move(down(length));
  await mouse.move(left(width));
  await mouse.move(up(length));
}