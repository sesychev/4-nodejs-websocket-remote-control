import { Region, mouse, centerOf, straightTo, screen, imageResource } from '@nut-tree/nut-js';
import Jimp from 'jimp';

export async function printing() {
const left = (await mouse.getPosition()).x;
const top = (await mouse.getPosition()).y;
const region = new Region(left-100, top+100, 200, 200);
const image = new Jimp(region.width, region.height);
console.log(image.bitmap.data)
  const base64 = await image.getBase64Async(Jimp.MIME_PNG);
  return base64;
}
/*
Print screen
Make print screen command and send image (a base64 buffer of the 200 px square around the mouse position):
<- prnt_scrn
-> prnt_scrn {base64 string (png buf)}
*/