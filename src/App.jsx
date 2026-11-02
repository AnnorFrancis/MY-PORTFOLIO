import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  brand,
  projects,
  pages,
  gallery,
  films,
  stats,
  services,
  pricing,
  credentials,
  categories,
  shotsFor,
  mobileShotFor,
} from "./content";

/* ------------------------------------------------------------------ icons */
const I = {
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  ),
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  ),
  left: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m15 6-6 6 6 6" />
    </svg>
  ),
  right: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12a8 8 0 1 1 3.3 6.5L4 20l1.5-3.3A8 8 0 0 1 4 12Z" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="16" rx="3" />
      <path d="M3 9h18M8 13h5" />
    </svg>
  ),
  store: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 10 5.5 4h13L20 10M4 10v10h16V10M4 10h16M10 20v-6h4v6" />
    </svg>
  ),
  system: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
      <path d="M17.5 14v7M14 17.5h7" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M6.5 6.5l2 2M15.5 15.5l2 2M6.5 17.5l2-2M15.5 8.5l2-2" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  ),
  film: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M3 9h18M3 15h18M8 5v14M16 5v14" />
    </svg>
  ),
  brand: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m12 3 2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.3 6.8 19l1-5.8L3.6 9.1l5.8-.8z" />
    </svg>
  ),
};

/* ------------------------------------------------------------------ hooks */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return undefined;
    }
    const io = new window.IntersectionObserver(
      (entries) => {
        for (const en of entries)
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((e) => io.observe(e));
    // Safety net: nothing may stay hidden if the observer never fires
    // (print, screenshot tools, unusual browsers). After a few seconds
    // every block is shown regardless.
    const t = window.setTimeout(() => els.forEach((e) => e.classList.add("in")), 3500);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);
}
function useTilt(max = 6) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--ry", `${((x - 0.5) * max * 2).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${((0.5 - y) * max * 2).toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    };
    const leave = () => {
      el.style.removeProperty("--rx");
      el.style.removeProperty("--ry");
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [max]);
  return ref;
}

/* ------------------------------------------------------------- primitives */
function Link({ href, children, className = "", arrow = true }) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const wrap = /text-link|btn-ghost/.test(className);
  return (
    <a
      className={className}
      href={href}
      target={external && !href.startsWith("mailto:") ? "_blank" : undefined}
      rel={external && !href.startsWith("mailto:") ? "noopener noreferrer" : undefined}
    >
      {wrap ? <span>{children}</span> : children}
      {arrow && I.arrow}
    </a>
  );
}
function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="grain" />
    </div>
  );
}
function Availability() {
  return (
    <p className="availability">
      <span className="dot" aria-hidden="true" />
      <b>Available</b> for projects &amp; engineering roles · Updated November 2026
    </p>
  );
}
function Slideshow({ shots, alt, label, interval = 4800, eager = false, sizes = "(max-width: 760px) 92vw, 48vw" }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(null);
  const n = shots.length;
  useEffect(() => {
    if (n < 2 || paused) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const t = window.setInterval(() => setI((v) => (v + 1) % n), interval);
    return () => window.clearInterval(t);
  }, [n, paused, interval]);
  if (!n)
    return (
      <div className="slideshow">
        <div className="placeholder">{label}</div>
      </div>
    );
  return (
    <div
      className="slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onPointerDown={(e) => {
        startX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (startX.current == null) return;
        const dx = e.clientX - startX.current;
        startX.current = null;
        if (Math.abs(dx) > 40) setI((v) => (v + (dx < 0 ? 1 : -1) + n) % n);
      }}
    >
      {shots.map((s, k) => (
        <div key={s.key} className={k === i ? "slide active" : "slide"} aria-hidden={k !== i}>
          <img
            src={s.large}
            srcSet={`${s.small} 640w, ${s.large} 1200w`}
            sizes={sizes}
            width="1200"
            height="750"
            loading={eager && k === 0 ? "eager" : "lazy"}
            decoding="async"
            alt={k === 0 ? alt : ""}
          />
        </div>
      ))}
      {n > 1 && (
        <>
          <button type="button" className="arrow prev" aria-label="Previous slide" onClick={() => setI((v) => (v - 1 + n) % n)}>
            {I.left}
          </button>
          <button type="button" className="arrow next" aria-label="Next slide" onClick={() => setI((v) => (v + 1) % n)}>
            {I.right}
          </button>
          <div className="dots">
            {shots.map((s, k) => (
              <button key={s.key} type="button" aria-current={k === i ? "true" : undefined} aria-label={`Slide ${k + 1} of ${n}`} onClick={() => setI(k)} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
function Badge({ item }) {
  const map = {
    launched: ["green", "Launched"],
    product: ["blue", "Own product"],
    forex: ["", "Forex system"],
    sample: ["grey", item.status],
  };
  const [cls, text] = map[item.kind] || ["grey", item.status];
  return <span className={`badge ${cls}`}>{text}</span>;
}
function GalleryCard({ item, eager = false }) {
  const tilt = useTilt(5);
  return (
    <article ref={tilt} className="glass tilt card">
      <Badge item={item} />
      <Slideshow shots={shotsFor(item.slug)} alt={`${item.name} — screenshot of the live site`} label={item.wordmark} eager={eager} sizes="(max-width: 760px) 92vw, 33vw" />
      <div className="card-body">
        <span className="sector">{item.sector}</span>
        <h3>{item.name}</h3>
        <p>{item.blurb}</p>
        <span className="proof-line">{item.proof}</span>
        <div className="stack">
          {item.stack.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
        <div className="card-links">
          <Link className="text-link" href={item.url}>
            Open live site
          </Link>
          {item.caseStudy && (
            <Link className="text-link" href={item.caseStudy}>
              Case study
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
function FilmCard({ film }) {
  const video = useRef(null);
  const tilt = useTilt(4);
  const [playing, setPlaying] = useState(false);
  const src = `/videos/${film.id}.mp4`;
  const start = () => {
    setPlaying(true);
    const v = video.current;
    if (!v) return;
    v.muted = false;
    v.controls = true;
    v.loop = false;
    v.play().catch(() => {});
  };
  const preview = (on) => {
    const v = video.current;
    if (!v || playing) return;
    if (on) {
      v.muted = true;
      v.play().catch(() => {});
    } else {
      v.pause();
      v.currentTime = 0;
    }
  };
  return (
    <article
      ref={tilt}
      className={`glass tilt film ${film.orientation}${playing ? " playing" : ""}`}
      onMouseEnter={() => preview(true)}
      onMouseLeave={() => preview(false)}
    >
      <div className="film-media">
        <video ref={video} src={src} poster={`/videos/${film.id}.webp`} preload="metadata" playsInline muted loop aria-label={film.title} />
        {!playing && (
          <button type="button" className="play" aria-label={`Play ${film.title}`} onClick={start}>
            <span>{I.play}</span>
          </button>
        )}
      </div>
      <div className="film-body">
        <h3>{film.title}</h3>
        <p>{film.kind}</p>
        <p className="made">Made with {film.made}</p>
      </div>
    </article>
  );
}
function PhoneFrame({ src, alt }) {
  if (!src) return null;
  return (
    <div className="device-phone" aria-hidden="true">
      <div className="screen">
        <img src={src} alt={alt} width="420" height="909" loading="lazy" decoding="async" />
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------- chrome */
function Header({ path }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggle = useRef(null);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const current = (p) => (path === p || (p === "/work" && path.startsWith("/work/")) ? "page" : undefined);
  return (
    <header
      className={scrolled ? "site-header scrolled" : "site-header"}
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <div className="header-inner">
        <a className="identity" href="/">
          <img className="mark" src="/brand/monogram.svg" alt="" width="46" height="46" />
          <span className="wordmark">
            <b>{brand.name}</b>
            <small>{brand.owner} · Software developer &amp; systems builder</small>
          </span>
        </a>
        <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}>
          {open ? "Close" : "Menu"} <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <nav
          id="site-nav"
          className={open ? "nav open" : "nav"}
          aria-label="Main navigation"
          onClick={(e) => {
            if (e.target.closest("a")) setOpen(false);
          }}
        >
          <a href="/work" aria-current={current("/work")}>
            Work
          </a>
          <a href="/engineering" aria-current={current("/engineering")}>
            Engineering
          </a>
          <a href="/work-with-me" aria-current={current("/work-with-me")}>
            Work with me
          </a>
          <a className="btn btn-gold" href="/work-with-me#start">
            Start a project {I.arrow}
          </a>
        </nav>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <a className="identity" href="/">
              <img className="mark" src="/brand/monogram.svg" alt="" width="46" height="46" />
              <span className="wordmark">
                <b>{brand.name}</b>
                <small>{brand.tagline}</small>
              </span>
            </a>
            <p className="blurb">
              {brand.owner}. Software developer and systems builder in Accra, building websites, stores and the systems behind them for clients locally and internationally.
            </p>
          </div>
          <div>
            <p className="footer-heading">Explore</p>
            <ul>
              <li><a href="/work">All work</a></li>
              <li><a href="/engineering">Engineering</a></li>
              <li><a href="/work-with-me">Work with me</a></li>
              <li><a href="/work-with-me#pricing">Pricing</a></li>
            </ul>
          </div>
          <div>
            <p className="footer-heading">Case studies</p>
            <ul>
              {projects.map((p) => (
                <li key={p.slug}>
                  <a href={`/work/${p.slug}`}>{p.name}</a>
                </li>
              ))}
              <li><a href="/notes/lease-based-push">Engineering note</a></li>
            </ul>
          </div>
          <div>
            <p className="footer-heading">Connect</p>
            <ul>
              <li><a href={`mailto:${brand.email}`}>{brand.email}</a></li>
              <li><a href={brand.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp {brand.phone}</a></li>
              <li><a href={brand.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href={brand.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 {brand.owner} · {brand.name}</span>
          <span>Built to be used. Based in Accra, building for people everywhere.</span>
        </div>
      </div>
    </footer>
  );
}
function ContactBand({ engineer = false }) {
  return (
    <section className="wrap section-tight" data-reveal>
      <div className="glass cta-band">
        <div className="glow" aria-hidden="true" />
        <p className="eyebrow" style={{ justifyContent: "center" }}>Let’s put it to work</p>
        <h2>{engineer ? "Have a hard problem worth solving?" : "What does your business need to do better?"}</h2>
        <p>
          {engineer
            ? "I build across the application: data models, APIs, payments, permissions and the interfaces people use. Let’s talk about the role."
            : "A few lines about your business, the problem, and your budget are enough to begin. I reply from Accra, and I work with teams anywhere."}
        </p>
        <div className="cta-row">
          <Link className="btn btn-gold" href={engineer ? `mailto:${brand.email}?subject=Engineering%20opportunity` : "/work-with-me#start"}>
            {engineer ? "Discuss a role" : "Tell me about your project"}
          </Link>
          <Link className="btn btn-glass" href={brand.whatsapp}>
            Chat on WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- home */
const heroSlugs = ["besia", "trendy-norms", "perkos", "meridian", "tcs", "cindys", "zira", "poli443"];
function Home() {
  const stage = useTilt(9);
  const heroShots = heroSlugs.flatMap((slug) => shotsFor(slug).slice(0, 1).map((s) => ({ ...s, key: slug })));
  const phone = mobileShotFor("trendy-norms") || mobileShotFor("besia") || mobileShotFor("perkos");
  const teaser = ["tcs", "cindys", "veloura", "zira", "meridian", "poli443"].map((s) => gallery.find((g) => g.slug === s)).filter(Boolean);
  const featuredFilms = ["zira-teaser", "tcs-launch", "perkos-hook", "forex-systems"].map((id) => films.find((f) => f.id === id)).filter(Boolean);
  const marquee = ["Business websites", "Online stores", "POS & stock systems", "Bookings & deposits", "Paystack", "Mobile Money", "AI chatbots", "Launch films", "Next.js", "React", "Supabase", "TypeScript", "Node.js", "Accra → Worldwide"];
  return (
    <>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">{brand.name} · {brand.owner} · Accra, worldwide</p>
          <h1>
            I build the software <em>businesses run on.</em>
          </h1>
          <p className="hero-description">
            The website people see, the system your team runs, and the payments in between — connected, built for real-world conditions, and handed over so you can run it yourself.
          </p>
          <div className="cta-row hero-actions">
            <Link className="btn btn-gold" href="/work-with-me">
              Work with me on a system
            </Link>
            <Link className="btn btn-glass" href="/engineering">
              Hire me as an engineer
            </Link>
          </div>
          <Availability />
        </div>
        <div ref={stage} className="stage" aria-label="Screens from live systems I built">
          <div className="stage-glow" aria-hidden="true" />
          <div className="stage-float">
            <div className="device-laptop">
              <div className="screen">
                <Slideshow shots={heroShots} alt="Screens from live systems built by Francis Annor" label={brand.name} eager interval={3800} sizes="(max-width: 1020px) 92vw, 46vw" />
              </div>
            </div>
            <PhoneFrame src={phone} alt="" />
            <span className="float-chip c1"><span className="dot" style={{ background: "var(--emerald)" }} />Paystack · live payments</span>
            <span className="float-chip c2"><span className="dot" style={{ background: "var(--gold)" }} />Works offline · replays on reconnect</span>
            <span className="float-chip c3"><span className="dot" style={{ background: "var(--indigo)" }} />Launched October 2026</span>
          </div>
        </div>
      </section>

      <section className="wrap" data-reveal>
        <div className="stats">
          {stats.map(([n, l], k) => (
            <div key={l} className="glass stat" style={{ "--d": `${k * 0.08}s` }}>
              <b>{n}</b>
              <span>{l}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="marquee section-tight" aria-hidden="true">
        <div className="marquee-track">
          {[...marquee, ...marquee].map((m, k) => (
            <span key={k}>{m}</span>
          ))}
        </div>
      </div>

      <section className="wrap section" id="systems">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">Launched systems / 2026</p>
            <h2>
              Built to do a job. <em>Built to keep doing it.</em>
            </h2>
          </div>
          <p>Live client systems taking real payments, and my own product. What I built, why I built it that way, and what still needs work.</p>
        </div>
        {projects.map((p, i) => {
          const g = gallery.find((x) => x.slug === p.slug);
          return (
            <FeatureRow key={p.slug} project={p} item={g} flip={i % 2 === 1} />
          );
        })}
      </section>

      <section className="wrap section" id="work">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">Twenty-plus live builds</p>
            <h2>
              Websites with real <em>back offices behind them.</em>
            </h2>
          </div>
          <div className="cta-row">
            <Link className="btn btn-glass" href="/work">
              See all work
            </Link>
          </div>
        </div>
        <div className="cards">
          {teaser.map((item) => (
            <GalleryCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

      <section className="wrap section" id="films-home">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">Films &amp; ads</p>
            <h2>
              Built from the real screens. <em>Not stock footage.</em>
            </h2>
          </div>
          <p>Launch films, teasers and ad cuts produced as code, so a price change means a re-render, not a re-shoot. Hover to preview; click to play with sound.</p>
        </div>
        <div className="films">
          {featuredFilms.map((f) => (
            <FilmCard key={f.id} film={f} />
          ))}
        </div>
        <p style={{ marginTop: 24 }}>
          <Link className="text-link" href="/work#films">
            All films
          </Link>
        </p>
      </section>

      <section className="wrap section" id="services">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">What I build</p>
            <h2>
              One builder. <em>The whole system.</em>
            </h2>
          </div>
          <p>From the first click to the last receipt — and the back office in between.</p>
        </div>
        <div className="services">
          {services.map((s, k) => (
            <ServiceCard key={s.title} service={s} delay={k * 0.07} />
          ))}
        </div>
      </section>

      <section className="wrap section" id="pricing-home">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">Published ranges / GHS</p>
            <h2>
              Real numbers, <em>up front.</em>
            </h2>
          </div>
          <p>My project ranges, not industry averages. Scope, dates and recurring costs are agreed in writing before work begins.</p>
        </div>
        <PriceCards />
        <p style={{ marginTop: 24 }}>
          <Link className="text-link" href="/work-with-me#pricing">
            All packages and add-ons
          </Link>
        </p>
      </section>

      <section className="wrap section" id="about">
        <About />
      </section>

      <ContactBand />
    </>
  );
}
function FeatureRow({ project, item, flip }) {
  const tilt = useTilt(4);
  return (
    <article ref={tilt} className={`glass tilt feature${flip ? " flip" : ""}`} data-reveal>
      <div className="feature-media">
        <Slideshow shots={shotsFor(project.slug)} alt={`${project.name} — screenshots`} label={project.wordmark} />
      </div>
      <div className="feature-copy">
        <p className="eyebrow">{project.kind}</p>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        {item && <span className="proof-line">{item.proof}</span>}
        <div className="badge-row">
          {project.stack.split(" · ").map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
          <span className="chip green">{project.role}</span>
        </div>
        <div className="cta-row">
          <Link className="btn btn-gold" href={`/work/${project.slug}`}>
            Read the case study
          </Link>
          <Link className="text-link" href={project.url}>
            Live site
          </Link>
        </div>
      </div>
    </article>
  );
}
function ServiceCard({ service, delay = 0 }) {
  const tilt = useTilt(5);
  return (
    <article ref={tilt} className="glass tilt service" data-reveal style={{ "--d": `${delay}s` }}>
      <div className="icon">{I[service.icon]}</div>
      <h3>{service.title}</h3>
      <p>{service.text}</p>
    </article>
  );
}
function PriceCards() {
  return (
    <div className="price-grid">
      {pricing.main.map((p, k) => (
        <PriceCard key={p.name} plan={p} delay={k * 0.08} />
      ))}
    </div>
  );
}
function PriceCard({ plan, delay = 0 }) {
  const tilt = useTilt(4);
  return (
    <article ref={tilt} className={`glass tilt price${plan.popular ? " popular" : ""}`} data-reveal style={{ "--d": `${delay}s` }}>
      {plan.popular && <span className="tag">Most popular</span>}
      <h3>{plan.name}</h3>
      <p className="amount">
        <small>GHS</small>
        <b>{plan.from}</b>
        <i>– {plan.to}</i>
      </p>
      <p className="tagline">{plan.tagline}</p>
      <ul>
        {plan.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <p className="time">{plan.time}</p>
      <Link className={`btn ${plan.popular ? "btn-gold" : "btn-glass"}`} href="/work-with-me#start">
        Discuss this scope
      </Link>
    </article>
  );
}
function About() {
  const tilt = useTilt(6);
  const caps = ["React & Next.js", "TypeScript", "Node.js", "Supabase / Postgres", "Paystack & Mobile Money", "Offline-first PWAs", "AI agents & chatbots", "Remotion & HyperFrames"];
  return (
    <div className="about">
      <figure ref={tilt} className="glass tilt portrait" data-reveal>
        <picture>
          <source srcSet="/images/francis-640.webp" type="image/webp" />
          <img src="/images/my-image.jpg" alt="Francis Annor, software developer based in Accra" width="640" height="640" loading="lazy" decoding="async" />
        </picture>
        <figcaption className="ribbon">
          <span>
            <b>{brand.owner}</b>
            <span>Founder, {brand.name}</span>
          </span>
          <span>Accra · worldwide</span>
        </figcaption>
      </figure>
      <div className="about-copy" data-reveal style={{ "--d": "0.1s" }}>
        <p className="eyebrow">The person behind the work</p>
        <h2>
          I care about what happens <em>after launch.</em>
        </h2>
        <p>
          I’m Francis — a software developer and systems builder working with clients locally and internationally. I connect the customer-facing experience with the less visible work: stock, payments, bookings, permissions, and the handover that lets someone else run it.
        </p>
        <p>
          Most software assumes a good network, a card-only economy and a technical operator. Mine doesn’t. A till that keeps selling when the internet drops is a universal virtue; having shipped it for a live salon and a live shop in Accra is the proof it’s real.
        </p>
        <div className="caps">
          {caps.map((c) => (
            <span key={c} className="chip">{c}</span>
          ))}
        </div>
        <div className="cta-row">
          <Link className="btn btn-glass" href="/engineering">
            How I approach the engineering
          </Link>
          <Link className="text-link" href={brand.github}>
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------- work page */
function Work() {
  const [filter, setFilter] = useState("all");
  const shown = filter === "all" ? gallery : filter === "film" ? [] : gallery.filter((g) => g.kind === filter || (g.tags || []).includes(filter));
  const showFilms = filter === "all" || filter === "film";
  return (
    <>
      <header className="page-intro wrap">
        <p className="eyebrow">All work</p>
        <h1>
          Twenty-plus live builds. <em>Open any of them.</em>
        </h1>
        <p className="lede">
          Launched client systems, my own products, sample websites with real back offices, forex systems, and the films that launched them. Every card opens the live build.
        </p>
      </header>
      <section className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">Browse</p>
            <h2>
              Every build, <em>filtered your way.</em>
            </h2>
          </div>
          <p>Launched systems take real payments. Own products are mine. Sample builds are complete front-ends with working back offices, built to show what a business would get.</p>
        </div>
        <div className="filters" role="group" aria-label="Filter work">
          {categories.map(([key, label]) => (
            <button key={key} type="button" aria-pressed={filter === key} onClick={() => setFilter(key)}>
              {label}
            </button>
          ))}
        </div>
        {shown.length > 0 && (
          <div className="cards">
            {shown.map((item, k) => (
              <GalleryCard key={`${filter}-${item.slug}`} item={item} eager={k < 3} />
            ))}
          </div>
        )}
      </section>
      {showFilms && (
        <section className="wrap section" id="films">
          <div className="section-head">
            <div>
              <p className="eyebrow">Films &amp; ads</p>
              <h2>
                Produced as code, <em>from the real product.</em>
              </h2>
            </div>
            <p>Hover to preview, click to play with sound. Excerpts are cut from the full films; narration is AI-voiced where noted.</p>
          </div>
          <div className="films">
            {films.map((f) => (
              <FilmCard key={f.id} film={f} />
            ))}
          </div>
        </section>
      )}
      <ContactBand />
    </>
  );
}

/* --------------------------------------------------------- work with me */
function ProjectBrief() {
  const [status, setStatus] = useState("");
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Hello Francis,\n\nI'm ${data.get("name")}.\n\nWhat I need:\n${data.get("message")}\n\nBudget range: ${data.get("budget")}\n\nPreferred reply address: ${data.get("email")}`;
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent("A system for my business")}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app should open with the brief filled in. Nothing is sent until you send it. If it did not open, use the direct email or WhatsApp link.");
  }
  return (
    <section id="start" className="brief-section wrap section">
      <div data-reveal>
        <p className="eyebrow">Start a conversation</p>
        <h2>
          Tell me what <em>isn’t working yet.</em>
        </h2>
        <p className="lede">A few lines about your business, the problem, and your budget are enough to begin.</p>
        <div className="contact-direct">
          <a className="glass" href={`mailto:${brand.email}`}>
            {I.mail} {brand.email}
          </a>
          <a className="glass" href={brand.whatsapp} target="_blank" rel="noopener noreferrer">
            {I.chat} Chat on WhatsApp · {brand.phone}
          </a>
        </div>
      </div>
      <form className="glass" onSubmit={submit} data-reveal style={{ "--d": "0.1s" }}>
        <div className="form-row">
          <label>
            Your name
            <input name="name" autoComplete="name" required maxLength="100" />
          </label>
          <label>
            Your email
            <input name="email" autoComplete="email" type="email" required maxLength="200" />
          </label>
        </div>
        <label>
          What should the system help you do?
          <textarea name="message" rows="5" maxLength="2500" required placeholder="We currently manage… and we need a better way to…" />
        </label>
        <label>
          Budget range
          <select name="budget" defaultValue="Let’s scope it together">
            <option>Let’s scope it together</option>
            <option>GHS 2,000–3,500</option>
            <option>GHS 5,000–8,000</option>
            <option>GHS 10,000–15,000</option>
            <option>GHS 15,000+</option>
          </select>
        </label>
        <button className="btn btn-gold" type="submit">
          Prepare email brief {I.arrow}
        </button>
        <p className="small muted" style={{ margin: 0 }}>
          Opens your email app. This form does not upload or store your information.
        </p>
        <p role="status" className="form-status">
          {status}
        </p>
      </form>
    </section>
  );
}
function WorkWithMe() {
  const offers = [
    ["01", "A public front", "Fast, clear websites and online stores that help people understand your business, book, buy, or get in touch."],
    ["02", "The working back office", "Stock, tills, calendars, customer records, staff permissions and reporting designed around the way your team works."],
    ["03", "The connections", "Card and Mobile Money payments, notifications, existing calendars, and a practical handover for the people using it."],
  ];
  const process = [
    ["Understand", "We map the problem, the people using the system, and the tools you already rely on."],
    ["Build & prove", "We agree the scope, then review working software against real tasks and edge cases."],
    ["Launch & hand over", "Payments, access, recovery and owner training are part of the handover. Ongoing care is agreed separately."],
  ];
  return (
    <>
      <header className="page-intro wrap">
        <p className="eyebrow">For business owners &amp; teams</p>
        <h1>
          A better way to run <em>your day-to-day.</em>
        </h1>
        <p className="lede">
          I build websites, stores and the systems behind them. Start with the bottleneck: the booking that gets missed, the stock that doesn’t add up, or the tools that don’t talk to each other.
        </p>
        <div className="cta-row">
          <Link className="btn btn-gold" href="#start">
            Discuss your project
          </Link>
          <Link className="btn btn-glass" href="#pricing">
            See the ranges
          </Link>
        </div>
        <div style={{ marginTop: 22 }}>
          <Availability />
        </div>
      </header>
      <section className="wrap section-tight">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">What you get</p>
            <h2>
              One connected system. <em>A scope that fits.</em>
            </h2>
          </div>
          <p>Your customers need a good experience. Your team needs a reliable way to deliver it. I build both halves and the connections between them.</p>
        </div>
        <div className="offer-grid">
          {offers.map(([n, t, p], k) => (
            <OfferCard key={n} num={n} title={t} text={p} delay={k * 0.08} />
          ))}
        </div>
      </section>
      <section className="wrap section-tight">
        <p className="eyebrow">See it in practice</p>
        <div className="proof-links">
          {projects.map((p) => (
            <a key={p.slug} className="glass lift" href={`/work/${p.slug}`}>
              <b>{p.name}</b>
              <span>{p.summary}</span>
            </a>
          ))}
        </div>
      </section>
      <section id="pricing" className="wrap section">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">Published project ranges / GHS</p>
            <h2>
              A useful <em>starting point.</em>
            </h2>
          </div>
          <p>These are my project ranges, not industry averages. The final scope, delivery dates, integrations and recurring costs are agreed in writing before work begins.</p>
        </div>
        <PriceCards />
        <div className="addons">
          {pricing.addons.map(([name, amt, desc], k) => (
            <div key={name} className="glass lift addon" data-reveal style={{ "--d": `${k * 0.05}s` }}>
              <b>{name}</b>
              <span className="amt">
                <small>GHS</small>
                {amt}
              </span>
              <p>{desc}</p>
            </div>
          ))}
        </div>
        <div className="glass systems-note" data-reveal>
          <b>Business systems.</b> {pricing.systems.replace("Business systems — ", "")} Hosting, payment-provider fees and paid tools are quoted separately.
        </div>
      </section>
      <section className="wrap section-tight">
        <p className="eyebrow">How we work together</p>
        <div className="offer-grid">
          {process.map(([t, p], k) => (
            <OfferCard key={t} num={`0${k + 1}`} title={t} text={p} delay={k * 0.08} />
          ))}
        </div>
      </section>
      <ProjectBrief />
    </>
  );
}
function OfferCard({ num, title, text, delay = 0 }) {
  const tilt = useTilt(4);
  return (
    <article ref={tilt} className="glass tilt offer" data-reveal style={{ "--d": `${delay}s` }}>
      <span className="num">{num}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

/* ------------------------------------------------------------ engineering */
function Engineering() {
  const wider = ["letteropedia", "meridian", "poli443", "builders-book"].map((s) => gallery.find((g) => g.slug === s)).filter(Boolean);
  const entries = [
    {
      idx: "01 / Team project",
      title: "SAMTEC · Contract before implementation.",
      body: [
        "I own the API and database; Samuel owns the dashboard. An OpenAPI contract and generated-type drift checks let us develop the two halves against the same agreement.",
        "CI checks lint, contracts, types, tests and builds. Actions are pinned to commit SHAs with read-only default permissions. A dependency policy checks publishing age and trust changes before accepting new packages — and it has already stopped one suspicious package version.",
      ],
      tradeoff: "The trade-off: a contract needs maintaining. The benefit is catching a broken agreement before it reaches the other developer.",
      link: ["https://github.com/TEAM-DEVV/samtec-security-system", "Explore the public repository"],
    },
    {
      idx: "02 / In development",
      title: "Weave · A worker must know when it no longer owns the work.",
      body: [
        "My Flutter and Supabase app includes a push sender with lease-token batch claiming, renewal during processing, and a conditional finish. If another run takes over a row, the old worker cannot mark it complete.",
        "A fake-clock test runs two workers concurrently. Retryable provider errors and a bounded execution time are part of the design, rather than happy-path assumptions.",
      ],
      tradeoff: "The trade-off: retries can duplicate delivery. Lease ownership protects state; it does not create an exactly-once guarantee at an external provider.",
      link: ["/notes/lease-based-push", "Read the engineering note"],
    },
    {
      idx: "03 / Live learning product",
      title: "POLI 443 · Make the reasoning visible.",
      body: [
        "I built an interactive statistics course with worked examples, guided attempts, saved notes and practice scoring. Plain JavaScript modules keep the teaching experience independent of a UI framework.",
        "Personal-key access uses per-lesson AES-256-GCM keys derived with HMAC, signed tokens, timing-safe comparisons, and a Redis mutex around device slots. Rate limits account for campus Wi-Fi and carrier NAT, where many legitimate students share an IP.",
      ],
      tradeoff: "The trade-off: custom access control keeps dependencies low but increases review responsibility. Encryption alone does not prevent an authorized reader from copying content; device limits also need a humane recovery path.",
      link: ["https://poli443.perkos.app", "Explore the live course"],
    },
  ];
  return (
    <>
      <header className="page-intro wrap">
        <p className="eyebrow">For engineering teams</p>
        <h1>
          The interface is only <em>half the work.</em>
        </h1>
        <p className="lede">
          I build across the application: data models, APIs, payments, permissions, and the interfaces people use. My strongest work lives where a business rule has to survive real use.
        </p>
        <div className="cta-row">
          <Link className="btn btn-gold" href={`mailto:${brand.email}?subject=Engineering%20opportunity`}>
            Discuss an engineering role
          </Link>
          <Link className="btn btn-glass" href={brand.github}>
            GitHub
          </Link>
        </div>
        <div style={{ marginTop: 22 }}>
          <Availability />
        </div>
      </header>
      <section className="wrap section-tight">
        <p className="eyebrow">Selected engineering decisions</p>
        <div className="eng-list">
          {entries.map((e, k) => (
            <EngCard key={e.idx} entry={e} delay={k * 0.08} />
          ))}
        </div>
      </section>
      <section className="wrap section-tight">
        <p className="eyebrow">Production systems, with the decisions behind them</p>
        <div className="proof-links">
          {projects.map((p) => (
            <a key={p.slug} className="glass lift" href={`/work/${p.slug}`}>
              <b>{p.name}</b>
              <span>{p.stack}</span>
            </a>
          ))}
        </div>
      </section>
      <section className="wrap section">
        <div className="section-head" data-reveal>
          <div>
            <p className="eyebrow">A wider view</p>
            <h2>
              Different problems. <em>The same care.</em>
            </h2>
          </div>
          <div className="cta-row">
            <Link className="btn btn-glass" href="/work">
              All work
            </Link>
          </div>
        </div>
        <div className="cards">
          {wider.map((item) => (
            <GalleryCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
      <section className="wrap section-tight" data-reveal>
        <p className="eyebrow">Verified learning</p>
        <h2 style={{ marginBottom: 22 }}>
          A foundation in <em>systems &amp; support.</em>
        </h2>
        <div className="creds">
          {credentials.map(([name, url]) => (
            <a key={url} className="glass" href={url} target="_blank" rel="noopener noreferrer">
              {I.check} {name} {I.arrow}
            </a>
          ))}
        </div>
        <p className="small muted" style={{ marginTop: 14 }}>Every badge opens its official verification page.</p>
      </section>
      <ContactBand engineer />
    </>
  );
}
function EngCard({ entry, delay = 0 }) {
  const tilt = useTilt(3);
  return (
    <article ref={tilt} className="glass tilt eng" data-reveal style={{ "--d": `${delay}s` }}>
      <span className="idx">{entry.idx}</span>
      <div>
        <h2>{entry.title}</h2>
        {entry.body.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <p className="tradeoff">{entry.tradeoff}</p>
        <Link className="text-link" href={entry.link[0]}>
          {entry.link[1]}
        </Link>
      </div>
    </article>
  );
}

/* ------------------------------------------------------------ case study */
function CaseStudy({ project }) {
  const stage = useTilt(5);
  const item = gallery.find((g) => g.slug === project.slug);
  return (
    <article>
      <header className="page-intro wrap">
        <a className="back-link" href="/work">
          {I.left} All work
        </a>
        <p className="eyebrow">{project.kind} / Case study</p>
        <h1>{project.title}</h1>
        <p className="lede">{project.summary}</p>
        <dl className="facts">
          {[["Project", project.name], ["My role", project.role], ["Stack", project.stack], ["Status", project.status]].map(([t, d]) => (
            <div key={t} className="glass">
              <dt>{t}</dt>
              <dd>{d}</dd>
            </div>
          ))}
        </dl>
        <div className="cta-row">
          <Link className="btn btn-gold" href={project.url}>
            Visit the live site
          </Link>
        </div>
      </header>
      <div className="wrap">
        <div ref={stage} className="glass tilt case-stage" data-reveal>
          <Slideshow shots={shotsFor(project.slug)} alt={`${project.name} — screenshots of the live system`} label={project.wordmark} eager sizes="(max-width: 860px) 92vw, 70vw" />
          <PhoneFrame src={mobileShotFor(project.slug)} alt="" />
        </div>
      </div>
      <div className="article-layout wrap">
        <aside className="glass">
          <p className="eyebrow">In this case study</p>
          <a href="#context">01 Context</a>
          <a href="#constraints">02 Constraints</a>
          <a href="#decisions">03 Decisions &amp; trade-offs</a>
          <a href="#outcome">04 Outcome &amp; limits</a>
        </aside>
        <div className="article-body">
          <section id="context" data-reveal>
            <p className="eyebrow">01 / Context</p>
            <h2>{project.contextTitle}</h2>
            {project.context.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
          <section id="constraints" data-reveal>
            <p className="eyebrow">02 / Constraints</p>
            <h2>The conditions shaped the system.</h2>
            <ul>
              {project.constraints.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>
          <section id="decisions">
            <p className="eyebrow">03 / Decisions &amp; trade-offs</p>
            <h2>What I chose, and what it costs.</h2>
            {project.decisions.map((d, i) => (
              <div className="glass decision" key={d.title} data-reveal style={{ "--d": `${i * 0.08}s` }}>
                <span className="num">0{i + 1}</span>
                <h3>{d.title}</h3>
                <p>{d.choice}</p>
                <dl>
                  <div>
                    <dt>Alternative</dt>
                    <dd>{d.alternative}</dd>
                  </div>
                  <div>
                    <dt>Trade-off</dt>
                    <dd>{d.tradeoff}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </section>
          <section id="outcome" data-reveal>
            <p className="eyebrow">04 / Outcome</p>
            <h2>{project.outcomeTitle}</h2>
            <p>{project.outcome}</p>
            {item && <span className="proof-line">{item.proof}</span>}
            <div className="glass limitation">
              <h3>What I’d improve next</h3>
              <p>{project.limitation}</p>
            </div>
            <p className="small muted">Project snapshot: 2 November 2026. Outcomes describe shipped capability, not an inferred revenue uplift.</p>
          </section>
        </div>
      </div>
      <section className="wrap section-tight">
        <p className="eyebrow">Continue exploring</p>
        <div className="related">
          {projects
            .filter((p) => p.slug !== project.slug)
            .map((p) => (
              <Link key={p.slug} className="glass lift" href={`/work/${p.slug}`}>
                {p.name}
              </Link>
            ))}
          <Link className="glass lift" href="/work">
            All work
          </Link>
        </div>
      </section>
      <ContactBand />
    </article>
  );
}

/* ------------------------------------------------------------------ note */
function Note() {
  return (
    <article>
      <header className="page-intro wrap">
        <a className="back-link" href="/engineering">
          {I.left} Engineering
        </a>
        <p className="eyebrow">Engineering notes / 2 November 2026</p>
        <h1>
          When two workers <em>reach for one job.</em>
        </h1>
        <p className="lede">A design note from Weave’s push sender: lease ownership, retries, and the difference between protecting state and guaranteeing delivery.</p>
      </header>
      <div className="wrap">
        <div className="article-body" style={{ maxWidth: "76ch" }}>
          <section data-reveal>
            <p>Weave is still in development. This note describes the push-worker design, not a claim of production scale.</p>
            <h2>The race</h2>
            <p>A worker claims a notification and sends it to a provider. Before it records success, the request times out. Another run can eventually pick up that notification. Did the provider deliver the first attempt? The database cannot know just from a lost response.</p>
            <p>I separate two questions: who may update the job, and whether a user has already received the message. Solving the first does not automatically solve the second.</p>
          </section>
          <section data-reveal>
            <h2>A lease is temporary ownership</h2>
            <ol className="note-steps">
              <li className="glass"><strong>Claim.</strong> A batch is associated with a lease token and an expiry.</li>
              <li className="glass"><strong>Renew.</strong> While processing, keep ownership alive within the run’s time budget.</li>
              <li className="glass"><strong>Check.</strong> Skip work if its lease is no longer ours.</li>
              <li className="glass"><strong>Finish conditionally.</strong> Update the row only if the current lease token still matches.</li>
            </ol>
            <p>The conditional finish is the important boundary. A slow worker cannot overwrite the result of the worker that took over. A final update without that ownership condition would reintroduce the race.</p>
            <div className="glass limitation">
              <h3>Ownership is not exactly-once delivery</h3>
              <p>A provider can accept a message before its response is lost. Retrying may deliver it again. A collapse identifier can help coalesce pending notifications under provider-specific rules, but it is not a universal deduplication guarantee. The receiving application still needs to tolerate repeat events.</p>
            </div>
          </section>
          <section data-reveal>
            <h2>Test the overlap, not just each worker</h2>
            <p>The useful test runs two workers on a fake clock. Advance time beyond a lease boundary, let another run take ownership, then allow the first run to finish. Its final write must leave the second worker’s state untouched.</p>
            <p>I also classify 429 and server errors as temporary and stop starting new rows when the execution budget is spent. These choices make retries and interrupted runs explicit parts of the lifecycle.</p>
            <h2>The cost of this design</h2>
            <p>Lease renewal adds database work. Short leases make recovery faster but increase the chance of overlapping runs; long leases delay recovery after a crash. The right duration depends on measured provider latency and runtime limits, so I would tune it with telemetry rather than treat a constant as a guarantee.</p>
            <p>This is the standard I want in my systems: the failure path should have an explanation as clear as the successful one.</p>
            <Link className="text-link" href="/engineering">
              More engineering work
            </Link>
          </section>
        </div>
      </div>
      <ContactBand engineer />
    </article>
  );
}

/* ------------------------------------------------------------------- app */
export default function App({ path = "/" }) {
  const normalized = path.replace(/\/$/, "") || "/";
  const project = projects.find((p) => normalized === `/work/${p.slug}`);
  useReveal();
  let content;
  if (normalized === "/") content = <Home />;
  else if (normalized === "/work") content = <Work />;
  else if (normalized === "/work-with-me") content = <WorkWithMe />;
  else if (normalized === "/engineering") content = <Engineering />;
  else if (normalized === "/notes/lease-based-push") content = <Note />;
  else if (project) content = <CaseStudy project={project} />;
  else
    content = (
      <section className="page-intro wrap">
        <p className="eyebrow">404 / Page not found</p>
        <h1>
          Let’s get you <em>back on track.</em>
        </h1>
        <p className="lede">That page isn’t here. The work, the engineering notes and the ways to get in touch all are.</p>
        <div className="cta-row">
          <Link className="btn btn-gold" href="/">
            Return home
          </Link>
          <Link className="btn btn-glass" href="/work">
            See all work
          </Link>
        </div>
      </section>
    );
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <Backdrop />
      <Header path={normalized} />
      <main id="main" tabIndex={-1}>
        {content}
      </main>
      <Footer />
    </>
  );
}
export { pages };

/* -------------------------------------------------------------- propTypes */
const shotType = PropTypes.shape({ key: PropTypes.string, small: PropTypes.string, large: PropTypes.string });
const itemType = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  status: PropTypes.string,
  sector: PropTypes.string,
  url: PropTypes.string.isRequired,
  caseStudy: PropTypes.string,
  stack: PropTypes.arrayOf(PropTypes.string).isRequired,
  blurb: PropTypes.string,
  proof: PropTypes.string,
  wordmark: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
});
const projectType = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  stack: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  wordmark: PropTypes.string.isRequired,
  contextTitle: PropTypes.string.isRequired,
  context: PropTypes.arrayOf(PropTypes.string).isRequired,
  constraints: PropTypes.arrayOf(PropTypes.string).isRequired,
  decisions: PropTypes.arrayOf(
    PropTypes.shape({ title: PropTypes.string, choice: PropTypes.string, alternative: PropTypes.string, tradeoff: PropTypes.string }),
  ).isRequired,
  outcomeTitle: PropTypes.string.isRequired,
  outcome: PropTypes.string.isRequired,
  limitation: PropTypes.string.isRequired,
});
Link.propTypes = { href: PropTypes.string.isRequired, children: PropTypes.node.isRequired, className: PropTypes.string, arrow: PropTypes.bool };
Slideshow.propTypes = { shots: PropTypes.arrayOf(shotType).isRequired, alt: PropTypes.string.isRequired, label: PropTypes.string, interval: PropTypes.number, eager: PropTypes.bool, sizes: PropTypes.string };
Badge.propTypes = { item: itemType.isRequired };
GalleryCard.propTypes = { item: itemType.isRequired, eager: PropTypes.bool };
FilmCard.propTypes = { film: PropTypes.shape({ id: PropTypes.string.isRequired, title: PropTypes.string.isRequired, kind: PropTypes.string, made: PropTypes.string, orientation: PropTypes.string }).isRequired };
PhoneFrame.propTypes = { src: PropTypes.string, alt: PropTypes.string };
Header.propTypes = { path: PropTypes.string.isRequired };
ContactBand.propTypes = { engineer: PropTypes.bool };
FeatureRow.propTypes = { project: projectType.isRequired, item: itemType, flip: PropTypes.bool };
ServiceCard.propTypes = { service: PropTypes.shape({ title: PropTypes.string, text: PropTypes.string, icon: PropTypes.string }).isRequired, delay: PropTypes.number };
PriceCard.propTypes = { plan: PropTypes.shape({ name: PropTypes.string, from: PropTypes.string, to: PropTypes.string, tagline: PropTypes.string, features: PropTypes.arrayOf(PropTypes.string), time: PropTypes.string, popular: PropTypes.bool }).isRequired, delay: PropTypes.number };
OfferCard.propTypes = { num: PropTypes.string.isRequired, title: PropTypes.string.isRequired, text: PropTypes.string.isRequired, delay: PropTypes.number };
EngCard.propTypes = { entry: PropTypes.shape({ idx: PropTypes.string, title: PropTypes.string, body: PropTypes.arrayOf(PropTypes.string), tradeoff: PropTypes.string, link: PropTypes.arrayOf(PropTypes.string) }).isRequired, delay: PropTypes.number };
CaseStudy.propTypes = { project: projectType.isRequired };
App.propTypes = { path: PropTypes.string };
