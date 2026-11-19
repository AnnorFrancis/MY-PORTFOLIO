// Flyers: web sizes, a download copy, share previews (1200x630, flyer centred on
// its own background colour so WhatsApp's square crop still shows the whole
// flyer) and the service photos cut from the flyers' own photographs.
// Run with `node scripts/flyers.mjs <folder with the original flyer JPGs>`.
// The originals are 1600x2000; the outputs are committed.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { flyers } from "../src/flyers.js";

const src = process.argv[2];
if (!src) throw new Error("Pass the folder that holds the original flyers.");
await mkdir("public/images/flyers", { recursive: true });

for (const f of flyers) {
  const file = `${src}/${f.source}`;
  const meta = await sharp(file).metadata();
  if (meta.width !== 1600 || meta.height !== 2000) throw new Error(`${f.source} is ${meta.width}x${meta.height}, expected 1600x2000`);
  await sharp(file).jpeg({ quality: 84, mozjpeg: true }).toFile(`public/images/flyers/${f.key}.jpg`);
  for (const w of [640, 1000]) await sharp(file).resize(w).webp({ quality: 80 }).toFile(`public/images/flyers/${f.key}-${w}.webp`);
  // Background colour from the flyer's bottom margin.
  const { data } = await sharp(file).extract({ left: 10, top: 1986, width: 4, height: 4 }).raw().toBuffer({ resolveWithObject: true });
  const background = { r: data[0], g: data[1], b: data[2] };
  const flyer = await sharp(file).resize({ height: 630 }).toBuffer();
  for (const card of f.cards) {
    await sharp({ create: { width: 1200, height: 630, channels: 3, background } })
      .composite([{ input: flyer, left: 348, top: 0 }])
      .png({ compressionLevel: 9 })
      .toFile(`public/images/og/${card}.png`);
  }
  if (f.photo) {
    const { key, left, top, width, height } = f.photo;
    const crop = sharp(file).extract({ left, top, width, height });
    // The source photos are bright product shots; darken them so white tile titles stay readable.
    const buf = await crop.modulate({ brightness: 0.68, saturation: 0.9 }).toBuffer();
    for (const w of [640, 1000, 1200, 1600])
      await sharp(buf).resize(w, Math.round((w * 2) / 3), { fit: "cover", position: "centre" }).webp({ quality: 78 }).toFile(`public/images/photos/${key}-${w}.webp`);
  }
}
console.log(`Prepared ${flyers.length} flyers.`);
