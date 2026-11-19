// Checks every link in the built site (run after npm run build): internal links
// must point at a built page or a public file, external links must answer.
// Reads dist/ directly, so it runs under plain Node.
import { readFile, writeFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const files = (await readdir("dist", { recursive: true })).filter((f) => f.endsWith(".html"));
const urls = new Set();
const broken = [];
for (const file of files) {
  const html = await readFile(join("dist", file), "utf8");
  for (const [, raw] of html.matchAll(/<a[^>]+href="([^"]+)"/g)) {
    const url = raw.replaceAll("&amp;", "&");
    if (url.startsWith("https://")) {
      if (!url.startsWith("https://wa.me/")) urls.add(url);
    } else if (url.startsWith("/")) {
      const path = url.split(/[?#]/)[0];
      const found = [path, path + ".html", join(path, "index.html")].some((p) => existsSync(join("dist", p)));
      if (!found) broken.push({ file, url });
    }
  }
}
for (const b of broken) console.log(JSON.stringify({ broken: b.url, in: b.file }));
const results = await Promise.all(
  [...urls].map(async (url) => {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(20000),
        redirect: "follow",
      });
      await response.body?.cancel();
      return { url, status: response.status, finalUrl: response.url };
    } catch (error) {
      return { url, error: error.message };
    }
  }),
);
for (const result of results) console.log(JSON.stringify(result));
// Optional private record; never part of the published site.
if (process.argv.includes("--record"))
  await writeFile("_brief/link-check.json", JSON.stringify(results, null, 2));
if (broken.length || results.some((r) => r.error || r.status >= 400)) process.exitCode = 1;
console.log(files.length + " pages, " + urls.size + " external links, " + broken.length + " broken internal links.");
