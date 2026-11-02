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
await sharp("public/favicon.svg")
  .resize(180)
  .png()
  .toFile("public/apple-touch-icon.png");
const cards = [
  ["home", "Software businesses", "run on.", "Selected work / Francis Annor"],
  [
    "engineering",
    "The interface is only",
    "half the work.",
    "Engineering / Francis Annor",
  ],
  [
    "trendy-norms",
    "Trendy Norms Hub",
    "From sale to stockroom.",
    "Case study / Francis Annor",
  ],
  [
    "besia",
    "Bēsia Beauty Studio",
    "Behind the booking.",
    "Case study / Francis Annor",
  ],
  ["perkos", "PerkOS", "Keep the work moving.", "Case study / Francis Annor"],
];
for (const [name, line1, line2, label] of cards) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f7f7f2"/><path d="M70 90H1130M70 545H1130" stroke="#b8c4ab"/><text x="70" y="160" fill="#42583d" font-family="Arial" font-size="20">${label}</text><text x="65" y="310" fill="#23362e" font-family="Arial" font-size="76" letter-spacing="-3">${line1}</text><text x="65" y="405" fill="#375941" font-family="Georgia" font-style="italic" font-size="76" letter-spacing="-3">${line2}</text><text x="70" y="510" fill="#42583d" font-family="Arial" font-size="20">Software developer &amp; systems builder · Accra / Worldwide</text></svg>`;
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9, palette: true })
    .toFile(`public/images/og/${name}.png`);
}
console.log(
  "Optimized portrait, project screenshots, social cards, and touch icon.",
);
