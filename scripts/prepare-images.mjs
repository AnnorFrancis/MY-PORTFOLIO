// Run only when source imagery changes; generated public assets are committed.
import sharp from "sharp";
import { mkdir, copyFile } from "node:fs/promises";

await mkdir("public/images/og", { recursive: true });
await copyFile(
  "_brief/assets/francis-real-photo-SOURCE.jpg",
  "public/images/my-image.jpg",
);
await sharp("public/images/my-image.jpg")
  .webp({ quality: 85 })
  .toFile("public/images/francis-640.webp");
const inputs = [
  ["trendy-norms", "_brief/assets/screens/trendy-norms-hub.jpg"],
  ["besia", "_brief/assets/screens/besia-beauty.jpg"],
  ["perkos", "public/images/projects/perkos.jpg"],
  ["letteropedia", "public/images/projects/letteropedia.jpg"],
  ["meridian", "_brief/assets/screens/meridian-trading-desk.jpg"],
];
for (const [name, input] of inputs) {
  for (const width of [640, 1200]) {
    await sharp(input)
      .resize(width)
      .webp({ quality: 82 })
      .toFile(`public/images/projects/${name}-${width}.webp`);
  }
}
// Social cards and the touch icon are made by og-cards.mjs.
await import("./og-cards.mjs");
console.log(
  "Optimized portrait and project screenshots.",
);
