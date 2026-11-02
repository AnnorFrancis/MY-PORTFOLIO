import { readFile, writeFile } from "node:fs/promises";
import { pages } from "../src/content.js";

const urls = new Set();
for (const p of pages) {
  const file =
    p.path === "/"
      ? "dist/index.html"
      : p.path === "/404"
        ? "dist/404.html"
        : `dist${p.path}.html`;
  const html = await readFile(file, "utf8");
  for (const [, url] of html.matchAll(/<a[^>]+href="(https:\/\/[^" ]+)"/g))
    urls.add(url.replaceAll("&amp;", "&"));
}
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
if (results.some((r) => r.error || r.status >= 400)) process.exitCode = 1;
