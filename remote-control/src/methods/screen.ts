import { Region, mouse, centerOf, straightTo, screen, imageResource } from '@nut-tree/nut-js';
import Jimp from 'jimp';
//https://stackoverflow.com/questions/41941151/capture-and-save-image-with-robotjs
export async function printing() {
  const left = (await mouse.getPosition()).x;
  const top = (await mouse.getPosition()).y;
  const region = new Region(left - 100, top + 100, 200, 200);
  const img = (await screen.grabRegion(region));
  const image = new Jimp(img.width, img.height)
  //const image = new Jimp(region.width, region.height); => //console.log(image.bitmap.data.buffer)
  //image.bitmap.data = img.data;
  const base64 = await image.getBase64Async(Jimp.MIME_PNG);
  console.log(base64)
  return base64;
}