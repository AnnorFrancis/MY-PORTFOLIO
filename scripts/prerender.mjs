import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import React from "react";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const origin = "https://perkins-swart.vercel.app";
const escape = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
try {
  const { default: App, pages } = await server.ssrLoadModule("/src/App.jsx");
  const template = await readFile("dist/index.html", "utf8");
  for (const page of pages) {
    const url = `${origin}${page.path === "/" ? "/" : page.path}`;
    const image = `${origin}/images/og/${page.image}.png`;
    const schema =
      page.path === "/"
        ? {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
              "@type": "Person",
              name: "Francis Annor",
              jobTitle: "Software Developer and Systems Builder",
              url: origin,
              image: `${origin}/images/francis-640.webp`,
              sameAs: [
                "https://github.com/AnnorFrancis",
                "https://linkedin.com/in/francis-annor-649a0a26a",
              ],
            },
          }
        : {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: page.title,
            description: page.description,
            url,
            author: { "@type": "Person", name: "Francis Annor", url: origin },
          };
    const head = `<meta name="description" content="${escape(page.description)}" />
<link rel="canonical" href="${url}" />
<meta property="og:type" content="${page.path === "/" ? "website" : "article"}" />
<meta property="og:title" content="${escape(page.title)}" />
<meta property="og:description" content="${escape(page.description)}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${image}" />
<meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="${escape(page.title)}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${escape(page.title)}" />
<meta name="twitter:description" content="${escape(page.description)}" />
<meta name="twitter:image" content="${image}" />
${page.path === "/" ? '<link rel="preload" as="image" href="/images/francis-640.webp" type="image/webp" fetchpriority="high" />' : ""}
${page.path === "/404" ? '<meta name="robots" content="noindex" />' : ""}
<script type="application/ld+json">${JSON.stringify(schema).replaceAll("<", "\\u003c")}</script>`;
    const body = renderToString(React.createElement(App, { path: page.path }));
    const html = template
      .replace(/<title>.*?<\/title>/, `<title>${escape(page.title)}</title>`)
      .replace("<!--page-head-->", head)
      .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    const output =
      page.path === "/"
        ? "dist/index.html"
        : page.path === "/404"
          ? "dist/404.html"
          : `dist${page.path}/index.html`;
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, html);
    console.log(
      `Prerendered ${page.path}: ${body.replace(/<[^>]*>/g, "").length} text characters`,
    );
  }
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
      .filter((p) => p.path !== "/404")
      .map((p) => `<url><loc>${origin}${p.path}</loc></url>`)
      .join("")}</urlset>`,
  );
} finally {
  await server.close();
}
