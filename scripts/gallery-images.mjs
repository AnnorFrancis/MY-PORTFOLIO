// Turns the raw live-site captures into gallery slides (WebP at 1200/640 plus a
// mobile shot), writes src/gallery-manifest.json listing only what exists, and
// renders a social card for every page in the site's own visual language.
//
//   node scripts/gallery-images.mjs            # slides + manifest + og cards
//
// Raw captures come from the scratchpad capture script (PNG, 1440x900 / 390x844).
import sharp from "sharp";
import puppeteer from "puppeteer-core";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";

const RAW =
  process.env.GALLERY_RAW ||
  "C:/Users/DELL/AppData/Local/Temp/claude/C--Users-DELL-Desktop-ME-portf/5b206597-c9a3-4bb1-9450-ed266b82e501/scratchpad/gallery-raw";
const OUT = "public/images/gallery";
await mkdir(OUT, { recursive: true });
await mkdir("public/images/og", { recursive: true });

const manifest = {};
const ogOnly = process.argv.includes("--og-only");
const files = !ogOnly && existsSync(RAW) ? (await readdir(RAW)).filter((f) => f.endsWith(".png")) : [];
for (const file of files.sort()) {
  const m = file.match(/^(.+)-([a-dm])\.png$/);
  if (!m) continue;
  const [, slug, key] = m;
  const src = `${RAW}/${file}`;
  const meta = await sharp(src).metadata();
  // skip blank captures (a solid-colour page that never rendered)
  const { channels } = await sharp(src).stats();
  const flat = channels.every((c) => c.stdev < 2.5);
  if (flat) {
    console.log(`skip ${file} (blank)`);
    continue;
  }
  manifest[slug] ||= { shots: [], mobile: false };
  if (key === "m") {
    await sharp(src).resize(420).webp({ quality: 82 }).toFile(`${OUT}/${slug}-m.webp`);
    manifest[slug].mobile = true;
  } else {
    // desktop captures are 1440x900; crop to 16:10 and emit two widths
    const h = Math.round(meta.width * (10 / 16));
    for (const w of [1200, 640]) {
      await sharp(src)
        .extract({ left: 0, top: 0, width: meta.width, height: Math.min(h, meta.height) })
        .resize(w)
        .webp({ quality: w === 1200 ? 80 : 76 })
        .toFile(`${OUT}/${slug}-${key}-${w}.webp`);
    }
    manifest[slug].shots.push(key);
  }
}
if (!ogOnly) {
  for (const v of Object.values(manifest)) v.shots.sort();
  await writeFile("src/gallery-manifest.json", JSON.stringify(manifest, null, 2) + "\n");
  console.log(`gallery: ${Object.keys(manifest).length} builds, ${files.length} raw captures processed`);
}

// ---- social cards --------------------------------------------------------
const cards = [
  ["home", "I build the software", "businesses run on.", "Francis Annor · Perkins_Creatives · Accra, working worldwide"],
  ["work", "Twenty-plus live builds.", "Open any of them.", "All work · Francis Annor · Perkins_Creatives"],
  ["work-with-me", "A better way to run", "your day-to-day.", "Work with me · published GHS ranges · Perkins_Creatives"],
  ["engineering", "The interface is only", "half the work.", "Engineering · Francis Annor · Perkins_Creatives"],
  ["trendy-norms", "Trendy Norms Hub", "From storefront to stockroom.", "Case study · launched retail system"],
  ["besia", "Bēsia Beauty Studio", "Both sides of the business.", "Case study · launched salon system"],
  ["perkos", "PerkOS", "Keep the work moving.", "Case study · my own business software"],
  ["notes", "When two workers", "reach for one job.", "Engineering note · lease-based push delivery"],
];
const html = (l1, l2, label) => `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600;900&display=swap" rel="stylesheet">
<style>
  html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#070a0f;font-family:Montserrat,system-ui,sans-serif;color:#edf1f7}
  .orb{position:absolute;border-radius:50%;filter:blur(90px);opacity:.7}
  .o1{width:700px;height:700px;left:-260px;top:-320px;background:radial-gradient(circle,rgba(201,162,75,.55),transparent 62%)}
  .o2{width:600px;height:600px;right:-200px;top:-100px;background:radial-gradient(circle,rgba(47,208,143,.4),transparent 62%)}
  .o3{width:620px;height:620px;left:380px;bottom:-380px;background:radial-gradient(circle,rgba(111,124,255,.45),transparent 62%)}
  .glass{position:absolute;inset:56px;border-radius:34px;background:linear-gradient(140deg,rgba(255,255,255,.09),rgba(255,255,255,.03));border:1px solid rgba(255,255,255,.16);box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 40px 100px rgba(0,0,0,.6);padding:64px 72px;box-sizing:border-box}
  .brand{display:flex;align-items:center;gap:18px;font-size:22px;font-weight:900;letter-spacing:.16em;text-transform:uppercase;background:linear-gradient(118deg,#f6e8bd,#c9a24b 42%,#9a7b2e);-webkit-background-clip:text;background-clip:text;color:transparent}
  .brand img{width:52px;height:52px}
  h1{margin:70px 0 0;font-size:78px;line-height:1.02;letter-spacing:-.03em;font-weight:900}
  h1 span{display:block;background:linear-gradient(118deg,#f6e8bd,#c9a24b 42%,#9a7b2e);-webkit-background-clip:text;background-clip:text;color:transparent}
  .label{position:absolute;left:72px;bottom:60px;font-size:20px;font-weight:600;color:#aab3c2;letter-spacing:.04em}
</style></head><body>
<div class="orb o1"></div><div class="orb o2"></div><div class="orb o3"></div>
<div class="glass">
  <div class="brand"><img src="file:///${process.cwd().replace(/\\/g, "/")}/public/brand/monogram.svg">Perkins_Creatives</div>
  <h1>${l1}<span>${l2}</span></h1>
  <div class="label">${label}</div>
</div></body></html>`;
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--allow-file-access-from-files"],
  defaultViewport: { width: 1200, height: 630, deviceScaleFactor: 1 },
});
const page = await browser.newPage();
for (const [name, l1, l2, label] of cards) {
  // "load" rather than networkidle0: the Google Fonts stylesheet keeps the
  // network busy long enough to trip the idle timeout.
  await page.setContent(html(l1, l2, label), { waitUntil: "load", timeout: 60000 });
  await page.evaluate(() => document.fonts.ready);
  await new Promise((r) => setTimeout(r, 500));
  await page.screenshot({ path: `public/images/og/${name}.png`, type: "png" });
  console.log(`og: ${name}.png`);
}
await browser.close();
