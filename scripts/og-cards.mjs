// Social preview cards (the image WhatsApp, LinkedIn and X show for a link).
// Run with `node scripts/og-cards.mjs`; the PNGs are committed.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";

await mkdir("public/images/og", { recursive: true });
const cards = [
  ["home", "Websites and business", "systems, built in Accra."],
  ["engineering", "The interface is only", "half the work."],
  ["trendy-norms", "Trendy Norms Hub", "From storefront to stockroom."],
  ["besia", "Bēsia Beauty Studio", "Bookings, deposits, studio."],
  ["perkos", "PerkOS", "Sales keep going offline."],
];
const font = "Segoe UI, Montserrat, Arial, sans-serif";
for (const [name, line1, line2] of cards) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f5f8fb"/><stop offset="1" stop-color="#dcEEf8"/></linearGradient>
<radialGradient id="o1" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#2ba3cf" stop-opacity="0.75"/><stop offset="1" stop-color="#2ba3cf" stop-opacity="0"/></radialGradient>
<radialGradient id="o2" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#8fd8ef" stop-opacity="0.8"/><stop offset="1" stop-color="#8fd8ef" stop-opacity="0"/></radialGradient>
<linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity="0.82"/><stop offset="1" stop-color="#ffffff" stop-opacity="0.5"/></linearGradient>
<linearGradient id="rim" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#8fd8ef"/></linearGradient>
</defs>
<rect width="1200" height="630" fill="url(#bg)"/>
<circle cx="1040" cy="90" r="360" fill="url(#o1)"/>
<circle cx="140" cy="600" r="320" fill="url(#o2)"/>
<rect x="60" y="60" width="1080" height="510" rx="40" fill="url(#glass)" stroke="url(#rim)" stroke-width="2.5"/>
<text x="120" y="160" fill="#1e2731" font-family="${font}" font-size="30" font-weight="800">Perkins</text>
<rect x="235" y="156" width="30" height="6" rx="3" fill="#0a6f96"/>
<text x="269" y="160" fill="#1e2731" font-family="${font}" font-size="30" font-weight="800">Creatives</text>
<text x="116" y="320" fill="#1e2731" font-family="${font}" font-size="70" font-weight="800" letter-spacing="-2">${line1}</text>
<text x="116" y="408" fill="#0a6f96" font-family="${font}" font-size="70" font-weight="800" letter-spacing="-2">${line2}</text>
<text x="120" y="510" fill="#4b5866" font-family="${font}" font-size="24" font-weight="600">Websites · Online stores · Business systems · Accra, Ghana</text>
</svg>`;
  await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toFile(`public/images/og/${name}.png`);
}
await sharp("public/favicon.svg").resize(180).png().toFile("public/apple-touch-icon.png");
console.log("Social cards and touch icon written.");
