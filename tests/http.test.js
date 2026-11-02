import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { preview } from "vite";
import { pages } from "../src/content.js";

let server;
let origin;
beforeAll(async () => {
  server = await preview({
    preview: { host: "127.0.0.1", port: 0, open: false },
  });
  origin = `http://127.0.0.1:${server.httpServer.address().port}`;
});
afterAll(async () => {
  if (server) await new Promise((resolve) => server.httpServer.close(resolve));
});
describe("Direct URL delivery", () => {
  it("does not disguise unknown URLs as successful home pages", async () => {
    const response = await fetch(`${origin}/this-page-does-not-exist`);
    expect(response.status).toBe(404);
  });
  for (const page of pages.filter((page) => page.path !== "/404")) {
    it(`${page.path} serves its own HTML before JavaScript runs`, async () => {
      const response = await fetch(`${origin}${page.path}`);
      expect(response.status).toBe(200);
      const html = await response.text();
      expect(html).toContain(
        `<title>${page.title.replaceAll("&", "&amp;")}</title>`,
      );
      expect(html).toContain(
        `rel="canonical" href="https://perkins-swart.vercel.app${page.path}"`,
      );
    });
  }
});
