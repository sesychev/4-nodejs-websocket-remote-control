import { Region, mouse, screen } from '@nut-tree/nut-js';
import Jimp from 'jimp';
//https://stackoverflow.com/questions/41941151/capture-and-save-image-with-robotjs
export async function printing() {
  const left = (await mouse.getPosition()).x;
  const top = (await mouse.getPosition()).y;
  const region = new Region(left - 100, top + 100, 200, 200);
  const grab = (await screen.grabRegion(region));
  const img = await grab.toRGB();
  const image = new Jimp({ data: img.data, width: 200, height: 200 });
  const base64 = await image.getBase64Async(Jimp.MIME_PNG);
  console.log(base64)
  return base64;
}