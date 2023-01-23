import { Region, mouse, screen } from '@nut-tree/nut-js';
import robot from 'robotjs';
import Jimp from 'jimp';
//https://stackoverflow.com/questions/41941151/capture-and-save-image-with-robotjs
export async function printing() {
  const left = (await mouse.getPosition()).x;
  const top = (await mouse.getPosition()).y;
  const region = new Region(left - 100, top + 100, 200, 200);
  const img = (await screen.grabRegion(region));
  const context = robot.screen.capture(left - 100, top - 100, 200, 200);
  const image = new Jimp(200, 200);
  image.bitmap.data = context.image;
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    const red = image.bitmap.data[ idx + 0 ];
    const blue = image.bitmap.data[ idx + 2 ];
    image.bitmap.data[ idx + 0 ] = blue;
    image.bitmap.data[ idx + 2 ] = red;
  });
  const base64 = await image.getBase64Async(Jimp.MIME_PNG);
  console.log(base64)
  return base64;
}