import { createServer } from "vite";
import { renderToString } from "react-dom/server";
import React from "react";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";

const configuredOrigin = process.env.SITE_URL || "https://perkinscreatives.perkos.app";
const parsedOrigin = new URL(configuredOrigin);
if (parsedOrigin.protocol !== "https:" || parsedOrigin.pathname !== "/" || parsedOrigin.search || parsedOrigin.hash) throw new Error("SITE_URL must be an HTTPS origin without a path, query or fragment");
const origin = parsedOrigin.origin;
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
  let template = await readFile("dist/index.html", "utf8");
  // Inline the stylesheet: it removes a render-blocking request from every route.
  const cssLink = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
  if (cssLink) {
    const css = await readFile(`dist${cssLink[1]}`, "utf8");
    template = template.replace(cssLink[0], `<style>${css}</style>`);
  }
  for (const page of pages) {
    const url = `${origin}${page.path === "/" ? "/" : page.path}`;
    const image = `${origin}/images/og/${page.image}.png`;
    // The business as search engines should understand it: a professional
    // service in Accra that serves Ghana and clients abroad.
    const organization = {
      "@type": "ProfessionalService",
      "@id": `${origin}/#organization`,
      name: "Perkins_Creatives Tech",
      alternateName: ["Perkins Creatives Tech", "Perkins Creatives"],
      url: `${origin}/`,
      logo: `${origin}/apple-touch-icon.png`,
      image: `${origin}/images/og/home.png`,
      description:
        "Software, website and AI company in Accra, Ghana. Websites, online stores, POS systems, mobile apps, payroll systems, AI chatbots and Meta ads.",
      email: "hello@perkos.app",
      telephone: "+233200214147",
      priceRange: "GHS 1,500 to GHS 15,000",
      address: { "@type": "PostalAddress", addressLocality: "Accra", addressRegion: "Greater Accra", addressCountry: "GH" },
      areaServed: [{ "@type": "Country", name: "Ghana" }, "Worldwide"],
      contactPoint: [
        { "@type": "ContactPoint", contactType: "sales", telephone: "+233538713916", email: "hello@perkos.app", availableLanguage: ["English"], areaServed: ["GH", "Worldwide"] },
        { "@type": "ContactPoint", contactType: "customer support", telephone: "+233200214147", availableLanguage: ["English"], areaServed: ["GH", "Worldwide"] },
      ],
      knowsAbout: ["Website design", "E-commerce", "Point of sale systems", "Inventory management software", "Custom software development", "AI chatbots", "Workflow automation", "Paystack and Mobile Money payments"],
      founder: { "@type": "Person", name: "Francis Annor", url: `${origin}/about` },
      sameAs: ["https://www.instagram.com/perkins_creative/", "https://www.facebook.com/profile.php?id=61588510061817", "https://linkedin.com/in/francis-annor-649a0a26a", "https://github.com/AnnorFrancis"],
    };
    const website = {
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      url: `${origin}/`,
      name: "Perkins_Creatives Tech",
      alternateName: ["Perkins Creatives Tech", "Perkins Creatives"],
      inLanguage: "en",
      publisher: { "@id": organization["@id"] },
    };
    const schema = { "@context":"https://schema.org", "@graph": [organization, { "@type": page.path === "/about" ? "AboutPage" : page.path === "/contact" ? "ContactPage" : "WebPage", "@id": `${url}#webpage`, name:page.title, description:page.description, url, inLanguage: "en", isPartOf: { "@id": website["@id"] }, publisher:{"@id":`${origin}/#organization`}, ...(page.path.startsWith("/notes/") ? {author:{"@type":"Person",name:"Francis Annor"}} : {}) }, website] };
    if (page.path === "/")
      schema["@graph"].push({
        "@type": "VideoObject",
        name: "Perkins_Creatives Tech: what we build",
        description: "A one-minute film of the websites, business systems, mobile apps, AI assistants and ads we build for businesses in Ghana.",
        thumbnailUrl: `${origin}/videos/master-film.webp`,
        contentUrl: `${origin}/videos/master-film.mp4`,
        uploadDate: "2026-11-19",
        duration: "PT1M4S",
        publisher: { "@id": `${origin}/#organization` },
      });
    // Breadcrumbs for nested pages, so results show "Services > ..." or "Work > ...".
    const [, section, leaf] = page.path.split("/");
    if (leaf && (section === "services" || section === "work")) {
      const crumbs = [
        ["Home", `${origin}/`],
        [section === "services" ? "Services" : "Work", `${origin}/${section}`],
        [page.title.split(" | ")[0], url],
      ];
      schema["@graph"][1].breadcrumb = { "@id": `${url}#breadcrumb` };
      schema["@graph"].push({
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: crumbs.map(([name, item], i) => ({ "@type": "ListItem", position: i + 1, name, item })),
      });
    }
    if (page.path.startsWith("/services/")) {
      const serviceId = url + "#service";
      schema["@graph"][1].mainEntity = { "@id": serviceId };
      schema["@graph"].push({
        "@type": "Service",
        "@id": serviceId,
        name: page.title.split(" | ")[0],
        description: page.description,
        url,
        serviceType: page.title.split(" | ")[0],
        provider: { "@id": organization["@id"] },
        areaServed: [{ "@type": "Country", name: "Ghana" }, "Worldwide"],
        ...(page.price
          ? { offers: { "@type": "Offer", url, priceSpecification: { "@type": "PriceSpecification", priceCurrency: "GHS", minPrice: page.price[0], maxPrice: page.price[1] } } }
          : {}),
      });
    }
    const head = `<meta name="description" content="${escape(page.description)}" />
<link rel="canonical" href="${url}" />${page.path === "/" ? '<link rel="preload" as="image" href="/videos/master-film.webp" />' : ""}
<meta property="og:type" content="${page.path.startsWith("/notes/") ? "article" : "website"}" />
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
${page.path === "/404" || page.noindex ? '<meta name="robots" content="noindex" />' : ""}
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
          : `dist${page.path}.html`;
    await mkdir(dirname(output), { recursive: true });
    await writeFile(output, html);
    console.log(
      `Prerendered ${page.path}: ${body.replace(/<[^>]*>/g, "").length} text characters`,
    );
  }
  await writeFile("dist/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
      .filter((p) => p.path !== "/404" && !p.noindex)
      .map((p) => `<url><loc>${origin}${p.path}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>`)
      .join("")}</urlset>`,
  );
} finally {
  await server.close();
}
