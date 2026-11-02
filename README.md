# Francis Annor — portfolio

A React portfolio for a software developer and systems builder. Vite builds the client bundle; a build-time React render writes complete HTML for every route. The browser hydrates that HTML for navigation and the email-brief composer.

## Run

Use Node 22.12+ or Node 24 and npm.

```sh
npm ci
npm run dev
npm run lint
npm run build
npm test
npm run preview
```

Tests inspect generated `dist/` output, so build before running them. CI performs lint, build, and tests in that order. The site is static: no database, server credentials, or contact-form service is required.

## Routes

- `/`: identity, selected work, and client/employer entry points.
- `/work-with-me`: scope, GHS price ranges, process, and contact.
- `/engineering`: engineering decisions, other work, and verified credentials.
- `/work/trendy-norms`, `/work/besia`, `/work/perkos`: shared case-study pool.
- `/notes/lease-based-push`: technical design note.
- `/404.html`: missing-page document.

## Edit

- `src/content.js`: projects, case-study text, credential links, metadata.
- `src/App.jsx`: page templates and shared components.
- `src/index.css`: responsive design and accessibility styles.
- `scripts/prerender.mjs`: static HTML, canonical metadata, schema, sitemap.
- `scripts/prepare-images.mjs`: optional maintainer-only image preparation; requires locally held source assets. It is not part of the production build. Optimized public assets are committed.
- `tests/build.test.js`: route text, metadata, assets, links, anchors, and content guardrails.

The project form prepares a message in the visitor's email app; it does not send automatically. Direct email and WhatsApp remain available. No analytics or trackers are installed.

## Deployment

Build command: `npm run build`. Output: `dist`. Vercel configuration preserves static route files rather than rewriting every path to the home page. The existing production project deploys from `main`; a push there can publish immediately.

Before publishing, check desktop and mobile layouts, keyboard navigation, the menu and contact composer, deep links, unknown-page HTTP status, browser console, and Lighthouse. Automated route tests do not establish full WCAG conformance or real-user Core Web Vitals.

Keep pricing, availability dates, project status, and outbound links current. Publish only attributable work and approved assets. Source control history retains the previous design.
