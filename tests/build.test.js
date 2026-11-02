import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { projects, pages } from "../src/content";

const readPage = (path) =>
  readFileSync(
    path === "/"
      ? "dist/index.html"
      : path === "/404"
        ? "dist/404.html"
        : `dist${path}/index.html`,
    "utf8",
  );
describe("Published route contract", () => {
  for (const page of pages) {
    it(`${page.path} ships meaningful HTML, a single heading and its own metadata`, () => {
      const html = readPage(page.path);
      expect((html.match(/<h1[ >]/g) || []).length).toBe(1);
      expect(html).toContain(
        `<title>${page.title.replaceAll("&", "&amp;")}</title>`,
      );
      expect(html).toContain('rel="canonical"');
      expect(html).toContain('name="description"');
      expect(html).not.toContain('<div id="root"></div>');
      expect(existsSync(`public/images/og/${page.image}.png`)).toBe(true);
      const body = html
        .split("<body>")[1]
        .replace(/<script[^>]*>[\s\S]*?<\/script>/g, "")
        .replace(/<[^>]*>/g, "");
      expect(body.length).toBeGreaterThan(page.path === "/404" ? 250 : 1800);
    });
    it(`${page.path} has no broken local images, links or fragment targets`, () => {
      const html = readPage(page.path);
      for (const [, url] of html.matchAll(/(?:href|src)="([^" ]+)"/g)) {
        if (!url.startsWith("/") && !url.startsWith("#")) continue;
        const [pathname, hash] = url.split("#");
        const target = pathname || page.path;
        if (target.includes(".")) {
          expect(existsSync(`dist${target}`), url).toBe(true);
        } else {
          expect(
            pages.some((p) => p.path === target),
            url,
          ).toBe(true);
          if (hash) expect(readPage(target), url).toContain(`id="${hash}"`);
        }
      }
    });
  }
  it("sitemap contains each indexable route and excludes the error page", () => {
    const sitemap = readFileSync("dist/sitemap.xml", "utf8");
    for (const page of pages.filter((p) => p.path !== "/404"))
      expect(sitemap).toContain(`https://perkins-swart.vercel.app${page.path}`);
    expect(sitemap).not.toContain("/404");
  });
  it("featured projects lead to hosted products, not repositories", () => {
    for (const p of projects) {
      expect(p.url).toMatch(/^https:\/\//);
      expect(p.url).not.toContain("github.com");
      expect(readPage("/")).toContain(`href="${p.url}"`);
    }
  });
  it("does not ship private transaction details or unsupported portfolio claims", () => {
    const html = pages.map((p) => readPage(p.path)).join(" ");
    for (const term of [
      "TN-03701",
      "TN-03238",
      "real subscribers",
      "Kira Forex",
      "Classic Sculpt",
      "10,000+ monthly",
    ])
      expect(html).not.toContain(term);
    expect(html).toContain("commercially unproven");
  });
});
