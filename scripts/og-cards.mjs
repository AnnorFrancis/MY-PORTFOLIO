// Social preview cards (the image WhatsApp, LinkedIn and X show for a link) for
// pages that have no flyer. Pages with a flyer get theirs from scripts/flyers.mjs.
// Run with `node scripts/og-cards.mjs`; the PNGs are committed.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

await mkdir("public/images/og", { recursive: true });
const cards = [
  ["about", "Meet the people", "behind the systems."],
  ["contact", "Your next project", "starts here."],
  ["engineering", "The interface is only", "half the work."],
  ["trendy-norms", "Trendy Norms Hub", "From storefront to stockroom."],
  ["besia", "Bēsia Beauty Studio", "Bookings, deposits, studio."],
  ["perkos", "PerkOS", "Sales keep going offline."],
];
const font = "Segoe UI, Montserrat, Arial, sans-serif";
for (const [name, line1, line2] of cards) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<rect width="1200" height="630" fill="#ffffff"/>
<rect x="0" y="560" width="1200" height="70" fill="#06506f"/>
<text x="96" y="140" fill="#1e2731" font-family="${font}" font-size="34" font-weight="800">Perkins</text>
<rect x="228" y="136" width="34" height="6" rx="3" fill="#2ba3cf"/>
<text x="266" y="140" fill="#1e2731" font-family="${font}" font-size="34" font-weight="500">Creatives Tech</text>
<text x="92" y="318" fill="#1e2731" font-family="${font}" font-size="76" font-weight="800" letter-spacing="-2">${line1}</text>
<text x="92" y="412" fill="#0a6f96" font-family="${font}" font-size="76" font-weight="800" letter-spacing="-2">${line2}</text>
<text x="96" y="605" fill="#ffffff" font-family="${font}" font-size="26" font-weight="600">perkinscreatives.perkos.app · Call 053 871 3916 · Accra, Ghana</text>
</svg>`;
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(`public/images/og/${name}.png`);
}
await sharp("public/favicon.svg").resize(180).png().toFile("public/apple-touch-icon.png");
console.log("Social cards and touch icon written.");
