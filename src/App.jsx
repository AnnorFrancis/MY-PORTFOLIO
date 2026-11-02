import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  projects,
  pages,
  credentials,
  stats,
  marquee,
  heroSlugs,
  moreSystems,
  moreSites,
  films,
  shotsFor,
  mobileShotFor,
} from "./content";

const email = "annorfrancis23@outlook.com";
const whatsapp = "https://wa.me/233538713916";
// Address shown in the glass browser bar: the host, plus the project folder
// for builds hosted on GitHub Pages.
const domainOf = (url) => {
  const [host, folder] = url.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/");
  return host.endsWith("github.io") && folder ? `${host}/${folder}` : host;
};

const icon = (d, extra) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
    {extra}
  </svg>
);
const I = {
  arrow: icon("M7 17 17 7M8 7h9v9"),
  right: icon("m9 6 6 6-6 6"),
  left: icon("m15 6-6 6 6 6"),
  web: icon("M3 9h18M8 13h5", <rect x="3" y="4" width="18" height="16" rx="3" />),
  office: icon(
    "M17.5 14v7M14 17.5h7",
    <>
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="7" rx="2" />
      <rect x="3" y="14" width="7" height="7" rx="2" />
    </>,
  ),
  link: icon("M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"),
  check: icon("m5 12 4 4L19 6"),
  play: (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  ),
};
const Arrow = () => <span className="arrow-icon">{I.arrow}</span>;

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
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((e) => io.observe(e));
    // Safety net: nothing may stay hidden if the observer never fires.
    // The same net covers the load-in animations, for browsers that pause them.
    const t = window.setTimeout(() => {
      els.forEach((e) => e.classList.add("in"));
      document.documentElement.classList.add("settled");
    }, 3500);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);
}
// Pointer-driven tilt and spotlight. Sets --rx/--ry for the 3D tilt and
// --mx/--my for the light that follows the cursor across the glass.
function useTilt(max = 5) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
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
// One frame-throttled pointer listener shared by all decorative glass sets.
function useGlassParallax() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    let raf = 0;
    const root = document.documentElement;
    const reset = () => {
      window.cancelAnimationFrame(raf);
      raf = 0;
      root.style.removeProperty("--px");
      root.style.removeProperty("--py");
    };
    const move = (event) => {
      if (motion.matches || !fine.matches || raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        root.style.setProperty("--px", String(Math.max(-1, Math.min(1, event.clientX / window.innerWidth * 2 - 1))));
        root.style.setProperty("--py", String(Math.max(-1, Math.min(1, event.clientY / window.innerHeight * 2 - 1))));
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    motion.addEventListener("change", reset);
    return () => {
      reset();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
      motion.removeEventListener("change", reset);
    };
  }, []);
}
function GlassObjects({ set = "intro" }) {
  const count = set === "hero" ? 4 : ["selected", "pricing"].includes(set) ? 2 : 3;
  return (
    <span className={`glass-objects objects-${set}`} aria-hidden="true">
      {["sphere", "ring", "pill", "cube"].slice(0, count).map((shape) => (
        <span key={shape} className={`glass-object object-${shape}`} aria-hidden="true" />
      ))}
    </span>
  );
}
GlassObjects.propTypes = { set: PropTypes.string };

function Link({ href, children, className = "" }) {
  return (
    <a className={className} href={href}>
      <span>{children}</span> <Arrow />
    </a>
  );
}
function Glass({ as: Tag = "div", className = "", max = 5, children, ...rest }) {
  const ref = useTilt(max);
  return (
    <Tag ref={ref} className={`glass tilt ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
function Wordmark() {
  return (
    <span className="wordmark">
      <b>Perkins</b>
      <span className="us">
        <span className="sr-only">_</span>
      </span>
      <span>Creatives</span>
    </span>
  );
}
function Availability() {
  return (
    <p className="availability">
      <span className="pulse" aria-hidden="true" />
      Available for projects & engineering roles{" "}
      <span className="availability-date">· Updated November 2026</span>
    </p>
  );
}
function BrowserFrame({ url, children }) {
  return (
    <div className="browser">
      <div className="browser-bar" aria-hidden="true">
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <span className="address">{domainOf(url)}</span>
      </div>
      <div className="browser-view">{children}</div>
    </div>
  );
}
function Shot({ base, alt, sizes = "(max-width: 760px) 92vw, 50vw", width = 1200, height = 750 }) {
  return (
    <img
      src={`${base}-1200.webp`}
      srcSet={`${base}-640.webp 640w, ${base}-1200.webp 1200w`}
      sizes={sizes}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt}
    />
  );
}
function Slideshow({ shots, alt, interval = 4200, eager = false, sizes = "(max-width: 760px) 92vw, 50vw" }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  // Only the first slide downloads with the page; the rest wait until the page
  // has loaded, so they never compete with the fonts and headline.
  const [ready, setReady] = useState(false);
  const startX = useRef(null);
  const n = shots.length;
  useEffect(() => {
    let timer;
    const go = () => {
      timer = window.setTimeout(() => setReady(true), 300);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      window.clearTimeout(timer);
    };
  }, []);
  useEffect(() => {
    if (n < 2 || paused || !ready) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    const t = window.setInterval(() => setI((v) => (v + 1) % n), interval);
    return () => window.clearInterval(t);
  }, [n, paused, interval, ready]);
  if (!n) return null;
  return (
    <div
      className="slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
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
        <div
          key={s.key}
          className={k === i ? "slide active" : "slide"}
          aria-hidden={k !== i}
        >
          {(k === 0 || ready) && (
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
          )}
        </div>
      ))}
      {n > 1 && (
        <>
          <button
            type="button"
            className="slide-arrow prev"
            aria-label="Previous slide"
            onClick={() => setI((v) => (v - 1 + n) % n)}
          >
            {I.left}
          </button>
          <button
            type="button"
            className="slide-arrow next"
            aria-label="Next slide"
            onClick={() => setI((v) => (v + 1) % n)}
          >
            {I.right}
          </button>
          <div className="slide-dots">
            {shots.map((s, k) => (
              <button
                key={s.key}
                type="button"
                aria-current={k === i ? "true" : undefined}
                aria-label={`Slide ${k + 1} of ${n}`}
                onClick={() => setI(k)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
function PhoneFrame({ src }) {
  if (!src) return null;
  return (
    <div className="device-phone" aria-hidden="true">
      <div className="phone-screen">
        <img src={src} alt="" width="420" height="909" loading="lazy" decoding="async" />
      </div>
    </div>
  );
}
function Stat({ value, suffix, label, index }) {
  const num = useRef(null);
  // The real number is rendered on the server; the count-up only rewrites the
  // text once the card scrolls into view.
  useEffect(() => {
    const el = num.current;
    if (!el || !("IntersectionObserver" in window)) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return undefined;
    el.textContent = "0";
    let raf = 0;
    const io = new window.IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      io.disconnect();
      const start = window.performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / 1400);
        el.textContent = String(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) raf = window.requestAnimationFrame(tick);
      };
      raf = window.requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.cancelAnimationFrame(raf);
      el.textContent = String(value);
    };
  }, [value]);
  return (
    <Glass className="dark stat" style={{ "--i": index }} data-reveal>
      <b>
        <span ref={num}>{value}</span>
        {suffix}
      </b>
      <span>{label}</span>
    </Glass>
  );
}
function FilmCard({ film, index }) {
  const video = useRef(null);
  const [playing, setPlaying] = useState(false);
  const start = () => {
    setPlaying(true);
    const v = video.current;
    if (!v) return;
    v.controls = true;
    v.play().catch(() => {});
  };
  return (
    <Glass
      as="article"
      className={`film${film.portrait ? " portrait" : ""}`}
      style={{ "--i": index }}
      data-reveal
    >
      <div className="film-media">
        <video
          ref={video}
          src={`/videos/${film.id}.mp4`}
          poster={`/videos/${film.id}.webp`}
          preload="none"
          playsInline
          aria-label={film.title}
        />
        {!playing && (
          <button
            type="button"
            className="play"
            aria-label={`Play ${film.title}`}
            onClick={start}
          >
            <span>{I.play}</span>
          </button>
        )}
      </div>
      <h3>{film.title}</h3>
      <p>{film.kind}</p>
    </Glass>
  );
}

/* ----------------------------------------------------------------- chrome */
function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <span className="cloud c1" />
      <span className="cloud c2" />
      <span className="cloud c3" />
      <span className="cloud c4" />
      <span className="cloud c5" aria-hidden="true" />
      <span className="cloud c6" aria-hidden="true" />
      <span className="grid" />
    </div>
  );
}
function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.current?.style.setProperty(
        "transform",
        `scaleX(${max > 0 ? window.scrollY / max : 0})`,
      );
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <div ref={bar} className="progress" aria-hidden="true" />;
}
const navItems = [
  ["/work", "Work"],
  ["/engineering", "Engineering"],
  ["/work-with-me", "Work with me"],
];
function Header({ path }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pill, setPill] = useState(null);
  const toggle = useRef(null);
  const nav = useRef(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // The glass pill rests on the current page and glides to whichever item
  // the pointer is over.
  const place = (el) => {
    if (!el || !nav.current) return setPill(null);
    const a = el.getBoundingClientRect();
    const b = nav.current.getBoundingClientRect();
    setPill({ left: a.left - b.left, width: a.width });
  };
  const rest = () => place(nav.current?.querySelector('[aria-current="page"]'));
  useEffect(() => {
    rest();
    document.fonts?.ready.then(rest);
    window.addEventListener("resize", rest);
    return () => window.removeEventListener("resize", rest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);
  function closeOnEscape(event) {
    if (event.key === "Escape" && open) {
      setOpen(false);
      toggle.current?.focus();
    }
  }
  return (
    <header
      className={`site-header${scrolled ? " scrolled" : ""}${open ? " open" : ""}`}
      onKeyDown={closeOnEscape}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <div className="header-inner glass">
        <a className="identity" href="/">
          <Wordmark />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen(!open)}
        >
          <span>{open ? "Close" : "Menu"}</span>
          <span className={open ? "burger x" : "burger"} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
        <nav
          id="site-nav"
          ref={nav}
          className={open ? "nav open" : "nav"}
          aria-label="Main navigation"
          onMouseLeave={rest}
          onClick={(event) => {
            if (event.target.closest("a")) setOpen(false);
          }}
        >
          {pill && (
            <span
              className="nav-pill"
              aria-hidden="true"
              style={{ transform: `translateX(${pill.left}px)`, width: pill.width }}
            />
          )}
          {navItems.map(([href, label]) => (
            <a
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
              onMouseEnter={(e) => place(e.currentTarget)}
            >
              {label}
            </a>
          ))}
          <a className="button button-primary nav-cta" href="/work-with-me#start">
            <span>Start a project</span> <Arrow />
          </a>
        </nav>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner glass wrap">
        <div>
          <a className="footer-brand" href="/">
            <Wordmark />
          </a>
          <p>Based in Accra, Ghana. Working with clients in Ghana and abroad.</p>
        </div>
        <div className="footer-links">
          <Link href={`mailto:${email}`}>Email</Link>
          <Link href={whatsapp}>WhatsApp</Link>
          <Link href="https://github.com/AnnorFrancis">GitHub</Link>
          <Link href="https://linkedin.com/in/francis-annor-649a0a26a">
            LinkedIn
          </Link>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Perkins_Creatives</span>
          <span>Websites, online stores and business systems.</span>
        </div>
      </div>
    </footer>
  );
}
function ContactBand({ engineer = false }) {
  return (
    <section className="contact-band wrap" data-reveal>
      <div className="contact-inner">
        <GlassObjects set="contact" />
        <div>
          <p className="eyebrow">Let’s put it to work</p>
          <h2>
            {engineer
              ? "Have a hard problem worth solving?"
              : "What does your business need to do better?"}
          </h2>
        </div>
        <Link
          className="button button-light"
          href={
            engineer
              ? `mailto:${email}?subject=Engineering%20opportunity`
              : "/work-with-me#start"
          }
        >
          {engineer ? "Discuss a role" : "Tell me about your project"}
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- home */
const letteropedia = {
  slug: "letteropedia",
  name: "Letteropedia",
  kind: "Delivered client work",
  summary:
    "A quote-request website the owner updates without a developer, with backup contact options if a connected service goes down.",
  role: "Solo developer",
  url: "https://letteropedia.online",
};
function Feature({ project, index, layout }) {
  const frame = useTilt(4);
  const caseStudy = projects.some((p) => p.slug === project.slug);
  return (
    <article
      className={`feature ${layout}`}
      style={{ "--i": index }}
      data-reveal
    >
      <a ref={frame} className="feature-media glass tilt" href={project.url}>
        <BrowserFrame url={project.url}>
          <Shot
            base={`/images/projects/${project.slug}`}
            alt={`${project.name} public website`}
            sizes={layout === "half" ? "(max-width: 860px) 92vw, 44vw" : "(max-width: 860px) 92vw, 56vw"}
          />
        </BrowserFrame>
        <span className="media-tag">
          <span>{project.visualLabel || project.kind}</span> <Arrow />
        </span>
      </a>
      <div className="feature-copy glass">
        <p className="eyebrow">
          0{index + 1} / {project.kind}
        </p>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        {project.stack && (
          <ul className="chips" aria-label={`${project.name} stack`}>
            {project.stack.split(" · ").map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
        <p className="project-role">My role: {project.role}</p>
        <div className="project-links">
          {caseStudy ? (
            <>
              <Link className="button button-primary" href={`/work/${project.slug}`}>
                Read the case study
              </Link>
              <Link className="text-link" href={project.url}>
                Live site
              </Link>
            </>
          ) : (
            <Link className="button button-primary" href={project.url}>
              Visit the live website
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
function Home() {
  const stage = useTilt(7);
  const idCard = useTilt(6);
  const portrait = useTilt(6);
  const heroShots = heroSlugs.flatMap((slug) =>
    shotsFor(slug).slice(0, 1).map((s) => ({ ...s, key: slug })),
  );
  const [trendy, besia, perkos] = projects;
  return (
    <>
      <section className="hero wrap">
        <GlassObjects set="hero" />
        <div className="hero-copy">
          <p className="eyebrow rise" style={{ "--i": 0 }}>
            Independent developer · Accra, Ghana
          </p>
          <h1>
            <span className="line">
              <span style={{ "--i": 1 }}>I build the software</span>
            </span>{" "}
            <span className="line">
              <span style={{ "--i": 2 }}>
                businesses <em>run on.</em>
              </span>
            </span>
          </h1>
          <p className="hero-description rise" style={{ "--i": 3 }}>
            The website your customers use and the system your staff run
            behind it: bookings, payments, stock and records, all connected.
          </p>
          <div className="hero-actions rise" style={{ "--i": 4 }}>
            <Link className="button button-primary" href="/work-with-me">
              Work with me on a system
            </Link>
            <Link className="button button-glass" href="/engineering">
              Hire me as an engineer
            </Link>
          </div>
          <div ref={idCard} className="id-card glass tilt rise" style={{ "--i": 5 }}>
            <img
              src="/images/portrait-360.webp"
              alt="Francis Annor, founder of Perkins_Creatives"
              width="360"
              height="463"
              fetchpriority="high"
            />
            <div>
              <Wordmark />
              <p className="id-role">Software developer & systems builder</p>
              <Availability />
            </div>
          </div>
        </div>
        <div
          ref={stage}
          className="stage tilt"
          role="img"
          aria-label="Screens from live systems built by Perkins_Creatives"
        >
          <div className="stage-float">
            <div className="device-laptop">
              <div className="laptop-screen">
                <Slideshow
                  shots={heroShots}
                  alt="Screens from live systems built by Perkins_Creatives"
                  eager
                  interval={3800}
                  sizes="(max-width: 1020px) 92vw, 46vw"
                />
              </div>
              <div className="laptop-base" />
            </div>
            <PhoneFrame src={mobileShotFor("trendy-norms")} />
            <span className="float-chip glass c1">
              <span className="dot" /> Paystack · live payments
            </span>
            <span className="float-chip glass c2">
              <span className="dot" /> Works offline · replays on reconnect
            </span>
            <span className="float-chip glass c3">
              <span className="dot" /> Launched October 2026
            </span>
          </div>
        </div>
      </section>

      <section className="band wrap" aria-label="What I build">
        <div className="band-inner">
          <div className="principle" data-reveal>
            <span>I build what customers see and what staff use.</span>
            <ul>
              <li>Web experiences</li>
              <li>Business operations</li>
              <li>Payments & integrations</li>
            </ul>
          </div>
          <div className="stats">
            {stats.map(([value, suffix, label], k) => (
              <Stat key={label} value={value} suffix={suffix} label={label} index={k} />
            ))}
          </div>
          <div className="marquee" aria-hidden="true">
            <div className="marquee-track">
              {[...marquee, ...marquee].map((m, k) => (
                <span key={k}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="work" className="selected aura wrap">
        <GlassObjects set="selected" />
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Selected work / 2026</p>
            <h2>
              Four projects. <em>All live today.</em>
            </h2>
          </div>
          <p>
            Live client systems and an independent product. Here’s what I built,
            why I built it that way, and what still needs work.
          </p>
        </div>
        <div className="features">
          <Feature project={trendy} index={0} layout="wide" />
          <Feature project={besia} index={1} layout="half" />
          <Feature project={perkos} index={2} layout="half" />
          <Feature project={letteropedia} index={3} layout="wide flip" />
        </div>
        <div className="more-row" data-reveal>
          <Link className="button button-glass button-large" href="/work">
            View more projects
          </Link>
        </div>
      </section>

      <section className="about aura wrap">
        <div ref={portrait} className="about-portrait glass tilt" data-reveal>
          <img
            src="/images/portrait-720.webp"
            alt="Portrait of Francis Annor"
            width="720"
            height="925"
            loading="lazy"
            decoding="async"
          />
          <span className="about-tag glass">
            <span className="pulse" aria-hidden="true" /> Francis Annor · Founder
          </span>
        </div>
        <div className="about-copy" data-reveal>
          <p className="eyebrow">The person behind the work</p>
          <h2>
            I care about what happens <em>after launch.</em>
          </h2>
          <p>
            I’m Francis, a software developer and systems builder working
            locally and internationally. I connect customer-facing experiences
            with the less visible work: stock, payments, bookings, permissions,
            and the handover that lets someone else run it.
          </p>
          <p>
            A good system should make sense to the person using it, even when
            the network drops or a transaction needs correcting.
          </p>
          <Link className="button button-glass" href="/engineering">
            How I approach the engineering
          </Link>
        </div>
      </section>
      <ContactBand />
    </>
  );
}

/* ------------------------------------------------------------------- work */
function BuildCard({ item, index }) {
  const shot = shotsFor(item.slug)[0];
  return (
    <Glass as="article" className="build" style={{ "--i": index }} data-reveal>
      <a className="build-media" href={item.url} tabIndex={-1} aria-hidden="true">
        <BrowserFrame url={item.url}>
          {shot && (
            <img
              src={shot.large}
              srcSet={`${shot.small} 640w, ${shot.large} 1200w`}
              sizes="(max-width: 860px) 92vw, 44vw"
              width="1200"
              height="750"
              loading="lazy"
              decoding="async"
              alt=""
            />
          )}
        </BrowserFrame>
      </a>
      <div className="build-body">
        <div className="build-meta">
          <span className="eyebrow">{item.sector}</span>
          <span className={`badge${item.status.startsWith("Live") ? " live" : ""}`}>
            {item.status}
          </span>
        </div>
        <h3>{item.name}</h3>
        <p>{item.blurb}</p>
        <Link className="text-link" href={item.url}>
          Visit the build
        </Link>
      </div>
    </Glass>
  );
}
function Work() {
  return (
    <>
      <header className="page-intro wrap">
        <GlassObjects set="intro" />
        <p className="eyebrow rise" style={{ "--i": 0 }}>More work</p>
        <h1>
          <span className="line">
            <span style={{ "--i": 1 }}>More builds,</span>
          </span>{" "}
          <span className="line">
            <span style={{ "--i": 2 }}>
              <em>chosen with care.</em>
            </span>
          </span>
        </h1>
        <p className="lede rise" style={{ "--i": 3 }}>
          Systems, websites and product films beyond the four on the home page.
          Every card opens the real, working build.
        </p>
        <nav className="jump rise" style={{ "--i": 4 }} aria-label="On this page">
          <a href="#systems">Systems</a>
          <a href="#websites">Websites & stores</a>
          <a href="#films">Films</a>
        </nav>
      </header>
      <section id="systems" className="work-group aura wrap">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Systems</p>
            <h2>
              Software a business <em>runs every day.</em>
            </h2>
          </div>
          <p>Trading desks, course platforms, stock and sales, and back offices tied to the website.</p>
        </div>
        <div className="build-grid">
          {moreSystems.map((item, k) => (
            <BuildCard key={item.slug} item={item} index={k} />
          ))}
        </div>
      </section>
      <section id="websites" className="work-group wrap">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Websites & stores</p>
            <h2>
              First impressions, <em>built to sell.</em>
            </h2>
          </div>
          <p>Storefronts and brand sites with the tools behind them.</p>
        </div>
        <div className="build-grid">
          {moreSites.map((item, k) => (
            <BuildCard key={item.slug} item={item} index={k} />
          ))}
        </div>
      </section>
      <section id="films" className="work-group aura wrap">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Films</p>
            <h2>
              Launch and teaser <em>films.</em>
            </h2>
          </div>
          <p>Short films made to launch and explain the products. Press play to watch.</p>
        </div>
        <div className="film-grid">
          {films.map((film, k) => (
            <FilmCard key={film.id} film={film} index={k} />
          ))}
        </div>
      </section>
      <section className="case-strip wrap">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Case studies</p>
            <h2>
              The full story, <em>decision by decision.</em>
            </h2>
          </div>
        </div>
        <div className="case-cards">
          {projects.map((p, k) => (
            <Glass as="article" key={p.slug} className="case-card" style={{ "--i": k }} data-reveal>
              <img
                src={`/images/projects/${p.slug}-640.webp`}
                width="640"
                height="400"
                loading="lazy"
                decoding="async"
                alt=""
              />
              <p className="eyebrow">{p.kind}</p>
              <h3>{p.name}</h3>
              <Link className="text-link" href={`/work/${p.slug}`}>
                Read the case study
              </Link>
            </Glass>
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}

/* -------------------------------------------------------------- case study */
function Diagram({ project }) {
  return (
    <div className={`system-visual ${project.slug}`}>
      <div className="diagram-top">
        <span>{project.visualLabel}</span>
        <span>System map</span>
      </div>
      <div className="diagram-brand">
        {project.wordmark}
        <span>{project.visualSubtitle}</span>
      </div>
      <ol className="system-flow">
        {project.flow.map((step, i) => (
          <li key={step} style={{ "--i": i }}>
            <span className="flow-number">0{i + 1}</span>
            <strong>{step}</strong>
          </li>
        ))}
      </ol>
      <p className="diagram-bottom">Public experience ↔ Business operations</p>
    </div>
  );
}
const caseSections = [
  ["context", "01 Context"],
  ["constraints", "02 Constraints"],
  ["decisions", "03 Decisions & trade-offs"],
  ["outcome", "04 Outcome & limits"],
];
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined;
    const io = new window.IntersectionObserver(
      (entries) => {
        for (const en of entries) if (en.isIntersecting) setActive(en.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}
const caseIds = caseSections.map(([id]) => id);
function CaseStudy({ project }) {
  const active = useActiveSection(caseIds);
  const facts = [
    ["Project", project.name],
    ["My role", project.role],
    ["Stack", project.stack],
    ["Status", project.status],
  ];
  return (
    <article>
      <header className="page-intro wrap">
        <GlassObjects set="intro" />
        <a className="back-link" href="/#work">
          ← Selected work
        </a>
        <p className="eyebrow rise" style={{ "--i": 0 }}>
          {project.kind} / Case study
        </p>
        <h1 className="rise" style={{ "--i": 1 }}>
          {project.title}
        </h1>
        <p className="lede rise" style={{ "--i": 2 }}>
          {project.summary}
        </p>
        <dl className="project-facts">
          {facts.map(([k, v], i) => (
            <Glass key={k} className="fact" style={{ "--i": i }} data-reveal>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </Glass>
          ))}
        </dl>
        <Link className="button button-primary" href={project.url}>
          Visit the live site
        </Link>
      </header>
      <div className="case-visual wrap" data-reveal>
        <div className="case-visual-inner glass">
          <Diagram project={project} />
          <BrowserFrame url={project.url}>
            <Slideshow
              shots={shotsFor(project.slug)}
              alt={`Screens from ${project.name}`}
              sizes="(max-width: 960px) 92vw, 52vw"
            />
          </BrowserFrame>
        </div>
      </div>
      <div className="article-layout wrap">
        <aside>
          <nav className="toc glass" aria-label="In this case study">
            <p className="eyebrow">In this case study</p>
            {caseSections.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={active === id ? "active" : undefined}
                aria-current={active === id ? "location" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>
        <div className="article-body aura">
          <section id="context" data-reveal>
            <p className="eyebrow">01 / Context</p>
            <h2>{project.contextTitle}</h2>
            {project.context.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
          <section id="constraints" data-reveal>
            <p className="eyebrow">02 / Constraints</p>
            <h2>What the system had to handle.</h2>
            <ul className="check-list">
              {project.constraints.map((p) => (
                <li key={p}>
                  <span className="check" aria-hidden="true">{I.check}</span>
                  {p}
                </li>
              ))}
            </ul>
          </section>
          <section id="decisions">
            <p className="eyebrow">03 / Decisions & trade-offs</p>
            <h2>Key decisions and their trade-offs.</h2>
            {project.decisions.map((d, i) => (
              <Glass className="decision" key={d.title} max={3} style={{ "--i": i }} data-reveal>
                <span className="decision-number">0{i + 1}</span>
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
              </Glass>
            ))}
          </section>
          <section id="outcome" data-reveal>
            <p className="eyebrow">04 / Outcome</p>
            <h2>{project.outcomeTitle}</h2>
            <p>{project.outcome}</p>
            <div className="limitation glass">
              <h3>What I’d improve next</h3>
              <p>{project.limitation}</p>
            </div>
            <p className="small muted">
              Project snapshot: 2 November 2026. Outcomes describe what was
              built and launched, not a measured rise in revenue.
            </p>
          </section>
        </div>
      </div>
      <section className="more-work wrap">
        <p className="eyebrow">Continue exploring</p>
        <div className="more-cards">
          {projects
            .filter((p) => p.slug !== project.slug)
            .map((p, k) => (
              <Glass as="a" key={p.slug} href={`/work/${p.slug}`} className="more-card" style={{ "--i": k }} data-reveal>
                <img
                  src={`/images/projects/${p.slug}-640.webp`}
                  width="640"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  alt=""
                />
                <span>
                  <span className="eyebrow">{p.kind}</span>
                  <strong>{p.name}</strong>
                </span>
                <Arrow />
              </Glass>
            ))}
        </div>
      </section>
      <ContactBand />
    </article>
  );
}

/* ----------------------------------------------------------- work with me */
function ProjectBrief() {
  const [status, setStatus] = useState("");
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Hello Francis,\n\nI'm ${data.get("name")}.\n\nWhat I need:\n${data.get("message")}\n\nBudget range: ${data.get("budget")}\n\nPreferred reply address: ${data.get("email")}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent("A system for my business")}&body=${encodeURIComponent(body)}`;
    setStatus(
      "Your email app should open with the brief filled in. Nothing is sent until you send it. If it did not open, use the direct email or WhatsApp link in this section.",
    );
  }
  return (
    <section id="start" className="brief-section wrap">
      <div className="brief-copy" data-reveal>
        <p className="eyebrow">Start a conversation</p>
        <h2>
          Tell me what <em>isn’t working yet.</em>
        </h2>
        <p>
          A few lines about your business, the problem, and your budget are
          enough to begin.
        </p>
        <div className="contact-chips">
          <Link className="button button-glass" href={`mailto:${email}`}>
            {email}
          </Link>
          <Link className="button button-glass" href={whatsapp}>
            Chat on WhatsApp
          </Link>
        </div>
      </div>
      <form className="glass brief-form" onSubmit={submit} data-reveal>
        <div className="form-row">
          <label>
            Your name
            <input name="name" autoComplete="name" required maxLength="100" />
          </label>
          <label>
            Your email
            <input
              name="email"
              autoComplete="email"
              type="email"
              required
              maxLength="200"
            />
          </label>
        </div>
        <label>
          What should the system help you do?
          <textarea
            name="message"
            rows="5"
            maxLength="2500"
            required
            placeholder="We currently manage… and we need a better way to…"
          />
        </label>
        <label>
          Budget range
          <select name="budget" defaultValue="Let’s scope it together">
            <option>Let’s scope it together</option>
            <option>GHS 2,000 to 3,500</option>
            <option>GHS 5,000 to 8,000</option>
            <option>GHS 10,000 to 15,000</option>
            <option>GHS 15,000+</option>
          </select>
        </label>
        <button className="button button-primary" type="submit">
          <span>Prepare email brief</span> <Arrow />
        </button>
        <p className="small muted">
          Opens your email app. This form does not upload or store your
          information.
        </p>
        <p role="status" className="form-status">
          {status}
        </p>
      </form>
    </section>
  );
}
const plans = [
  ["Starter website", "2,000 to 3,500", "A simple website that explains your business and brings in enquiries.", ["Up to 4 pages", "Responsive design", "Basic search setup", "1 month support"], "Usually ready in 1 to 2 weeks"],
  ["Business website", "5,000 to 8,000", "A bigger website you can update yourself, with forms and visitor stats.", ["Up to 10 pages", "Content management", "Forms & analytics", "3 months support"], "Usually ready in 3 to 4 weeks"],
  ["Custom web application", "10,000 to 15,000", "A custom system for your orders, stock, bookings or payments.", ["Web app or e-commerce", "Reporting", "Agreed integrations", "6 months support"], "Usually ready in 6 to 10 weeks"],
];
const addons = [
  ["Landing page", "GHS 1,500 to 4,000", "One focused page for a launch, offer or campaign."],
  ["Website care", "GHS 300 to 1,200 per month", "Updates, checks and small changes after launch."],
  ["AI chatbot & automation", "GHS 1,500 to 6,000", "The price depends on which tools it connects to."],
  ["Social media management", "GHS 600 to 2,500 per month", "Planned, designed and published for you."],
  ["Brand & flyer design", "GHS 80 to 600", "Flyers, posts and simple brand pieces."],
  ["CV / SOP writing", "GHS 150 to 400", "Clear, tailored documents for applications."],
  ["IT support", "Scoped on request", "Setup and troubleshooting, quoted per job."],
];
function WorkWithMe() {
  return (
    <>
      <header className="page-intro split wrap">
        <GlassObjects set="intro" />
        <div>
          <p className="eyebrow rise" style={{ "--i": 0 }}>For business owners & teams</p>
          <h1>
            <span className="line">
              <span style={{ "--i": 1 }}>A better way to run</span>
            </span>{" "}
            <span className="line">
              <span style={{ "--i": 2 }}>
                <em>your day-to-day.</em>
              </span>
            </span>
          </h1>
          <p className="lede rise" style={{ "--i": 3 }}>
            I build websites, stores, and the systems behind them. Start with the
            bottleneck: the booking that gets missed, the stock that doesn’t add
            up, or the tools that don’t talk to each other.
          </p>
          <div className="hero-actions rise" style={{ "--i": 4 }}>
            <Link className="button button-primary" href="#start">
              Discuss your project
            </Link>
            <Link className="button button-glass" href="#pricing">
              See the prices
            </Link>
          </div>
          <Availability />
        </div>
        <Glass as="aside" className="glance rise" style={{ "--i": 3 }} aria-label="At a glance">
          <p className="eyebrow">At a glance</p>
          <ul>
            {[
              ["Projects from", "GHS 2,000"],
              ["Typical build", "1 to 10 weeks"],
              ["Payments", "Card and Mobile Money"],
              ["Scope", "Agreed in writing before work begins"],
            ].map(([k, v]) => (
              <li key={k}>
                <span className="check" aria-hidden="true">{I.check}</span>
                <span>
                  <small>{k}</small>
                  {v}
                </span>
              </li>
            ))}
          </ul>
        </Glass>
      </header>
      <section className="offer-section aura wrap">
        <div className="section-heading" data-reveal>
          <h2>
            Three parts. <em>One connected system.</em>
          </h2>
          <p>
            Your customers need a good experience. Your team needs a reliable
            way to deliver it.
          </p>
        </div>
        <div className="offer-grid">
          {[
            [I.web, "A public front", "Fast, clear websites and online stores that help people understand your business, book, buy, or get in touch."],
            [I.office, "The working back office", "Stock, tills, calendars, customer records, staff permissions, and reporting designed around the way your team works."],
            [I.link, "The connections", "Card and Mobile Money payments, notifications, existing calendars, and training for the people who will use it."],
          ].map(([ic, t, p], k) => (
            <Glass key={t} className="offer" style={{ "--i": k }} data-reveal>
              <span className="offer-icon">{ic}</span>
              <span className="eyebrow">0{k + 1}</span>
              <h3>{t}</h3>
              <p>{p}</p>
            </Glass>
          ))}
        </div>
      </section>
      <section className="proof-links wrap">
        <p className="eyebrow">See it in practice</p>
        {projects.slice(0, 2).map((p, k) => (
          <Glass as="a" key={p.slug} href={`/work/${p.slug}`} className="proof-row" max={2} style={{ "--i": k }} data-reveal>
            <img src={`/images/projects/${p.slug}-640.webp`} width="640" height="400" loading="lazy" decoding="async" alt="" />
            <span className="proof-name">{p.name}</span>
            <span className="proof-description">{p.summary}</span>
            <Arrow />
          </Glass>
        ))}
      </section>
      <section id="pricing" className="pricing-section aura">
        <GlassObjects set="pricing" />
        <div className="wrap">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">Project prices / GHS</p>
              <h2>
                Clear prices. <em>In Ghana cedis.</em>
              </h2>
            </div>
            <p>
              These are my project ranges, not industry averages. The final scope,
              delivery dates, integrations, and recurring costs are agreed in
              writing before work begins.
            </p>
          </div>
          <div className="price-grid">
            {plans.map(([name, price, desc, features, time], k) => (
              <Glass
                as="article"
                key={name}
                className={k === 1 ? "price-card popular" : "price-card"}
                style={{ "--i": k }}
                data-reveal
              >
                {k === 1 && <span className="popular-tag">Recommended</span>}
                <h3>{name}</h3>
                <p className="price">
                  <small>GHS</small>
                  {price}
                </p>
                <p className="price-desc">{desc}</p>
                <ul className="price-features">
                  {features.map((f) => (
                    <li key={f}>
                      <span className="check" aria-hidden="true">{I.check}</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="price-time">{time}</p>
                <a className={k === 1 ? "button button-light" : "button button-primary"} href="#start">
                  <span>Discuss this scope</span> <Arrow />
                </a>
              </Glass>
            ))}
          </div>
          <h3 className="addons-title" data-reveal>Other services and prices</h3>
          <div className="addon-grid">
            {addons.map(([name, price, note], k) => (
              <Glass key={name} className="addon" style={{ "--i": k }} data-reveal>
                <h4>{name}</h4>
                <p className="addon-price">{price}</p>
                <p>{note}</p>
              </Glass>
            ))}
          </div>
          <div className="systems-note glass" data-reveal>
            <p>
              <strong>Large systems are scoped individually.</strong> Hosting,
              payment-provider fees, paid tools, and ongoing care are quoted
              separately.
            </p>
          </div>
        </div>
      </section>
      <section className="process wrap">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">How we work together</p>
            <h2>
              Three steps, <em>no surprises.</em>
            </h2>
          </div>
        </div>
        <div className="process-grid" data-reveal>
          {[
            ["Understand", "We map the problem, the people using the system, and the tools you already rely on."],
            ["Build and test", "We agree the scope in writing. You then test the working system on your real daily tasks before launch."],
            ["Launch and hand over", "I set up payments, staff access and backups, then train your team. Ongoing care is agreed separately."],
          ].map(([t, p], i) => (
            <Glass key={t} className="step" style={{ "--i": i }}>
              <span className="step-number">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{p}</p>
            </Glass>
          ))}
        </div>
      </section>
      <ProjectBrief />
    </>
  );
}

/* ------------------------------------------------------------ engineering */
const engineering = [
  {
    index: "01 / Team project",
    title: "SAMTEC · Contract before implementation.",
    body: [
      "I own the API and database; Samuel owns the dashboard. An OpenAPI contract and generated-type drift checks let us develop the two halves against the same agreement.",
      "CI checks lint, contracts, types, tests, and builds. Actions are pinned to commit SHAs with read-only default permissions. A dependency policy checks publishing age and trust changes before accepting new packages.",
    ],
    tradeoff:
      "The trade-off: a contract needs maintaining. The benefit is catching a broken agreement before it reaches the other developer.",
    link: ["https://github.com/TEAM-DEVV/samtec-security-system", "Explore the public repository"],
  },
  {
    index: "02 / In development",
    title: "Weave · A worker must know when it no longer owns the work.",
    body: [
      "My Flutter and Supabase app includes a push sender with lease-token batch claiming, renewal during processing, and a conditional finish. If another run takes over a row, the old worker cannot mark it complete.",
      "A fake-clock test runs two workers concurrently. Retryable provider errors and a bounded execution time are part of the design, rather than happy-path assumptions.",
    ],
    tradeoff:
      "The trade-off: retries can duplicate delivery. Lease ownership protects state; it does not create an exactly-once guarantee at an external provider.",
    link: ["/notes/lease-based-push", "Read the engineering note"],
  },
  {
    index: "03 / Live learning product",
    title: "POLI 443 · A course that shows every step of the working.",
    body: [
      "I built an interactive statistics course with worked examples, guided attempts, saved notes, and practice scoring. Plain JavaScript modules keep the teaching experience independent of a UI framework.",
      "Personal-key access uses per-lesson AES-256-GCM keys derived with HMAC, signed tokens, timing-safe comparisons, and a Redis mutex around device slots. Rate limits account for campus Wi-Fi and carrier NAT, where many legitimate students share an IP.",
    ],
    tradeoff:
      "The trade-off: custom access control keeps dependencies low but increases review responsibility. Encryption alone does not prevent an authorized reader from copying content; device limits also need a humane recovery path.",
    link: ["https://poli443.perkos.app", "Explore the live course"],
  },
];
const wider = [
  {
    url: "https://letteropedia.online",
    base: "/images/projects/letteropedia",
    alt: "Letteropedia public website",
    eyebrow: "Delivered client work · Solo developer",
    name: "Letteropedia",
    text: "A quote-request website the owner updates without a developer, with backup contact options if a connected service goes down.",
    cta: "Visit the live website",
  },
  {
    url: "https://meridian-trading-desk.vercel.app",
    base: "/images/projects/meridian",
    alt: "MERIDIAN trading journal interface with demonstration data",
    eyebrow: "Independent product · Solo developer",
    name: "MERIDIAN",
    text: "A browser-local trading journal and analytics tool. Market prices and calendar entries are demo data; live feeds and account sync are not built.",
    cta: "Explore the product",
  },
];
function Engineering() {
  return (
    <>
      <header className="page-intro split wrap">
        <GlassObjects set="intro" />
        <div>
          <p className="eyebrow rise" style={{ "--i": 0 }}>For engineering teams</p>
          <h1>
            <span className="line">
              <span style={{ "--i": 1 }}>The interface is only</span>
            </span>{" "}
            <span className="line">
              <span style={{ "--i": 2 }}>
                <em>half the work.</em>
              </span>
            </span>
          </h1>
          <p className="lede rise" style={{ "--i": 3 }}>
            I build across the application: data models, APIs, payments,
            permissions, and the interfaces people use. My strongest work is on
            rules that must not break, like payments, stock and staff permissions.
          </p>
          <div className="hero-actions rise" style={{ "--i": 4 }}>
            <Link
              className="button button-primary"
              href={`mailto:${email}?subject=Engineering%20opportunity`}
            >
              Discuss an engineering role
            </Link>
          </div>
          <Availability />
        </div>
        <Glass as="aside" className="glance rise" style={{ "--i": 3 }} aria-label="Stack I work in">
          <p className="eyebrow">Where I work</p>
          <ul className="chips">
            {["Next.js", "React", "TypeScript", "Node.js", "Supabase", "Postgres", "Flutter", "Paystack", "Redis", "Vitest"].map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <p className="glance-note">Data models · APIs · payments · permissions · interfaces</p>
        </Glass>
      </header>
      <section className="engineering-list aura wrap">
        <p className="eyebrow">Selected engineering decisions</p>
        <div className="eng-grid">
          {engineering.map((e, k) => (
            <Glass as="article" key={e.title} className="eng" max={3} style={{ "--i": k }} data-reveal>
              <div className="eng-head">
                <span className="engineering-index">{e.index}</span>
                <h2>{e.title}</h2>
              </div>
              <div className="eng-body">
                {e.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                <p className="engineering-tradeoff">{e.tradeoff}</p>
                <Link className="text-link" href={e.link[0]}>
                  {e.link[1]}
                </Link>
              </div>
            </Glass>
          ))}
        </div>
      </section>
      <section className="proof-links wrap">
        <p className="eyebrow">Production systems, with the decisions behind them</p>
        {projects.map((p, k) => (
          <Glass as="a" key={p.slug} href={`/work/${p.slug}`} className="proof-row" max={2} style={{ "--i": k }} data-reveal>
            <img src={`/images/projects/${p.slug}-640.webp`} width="640" height="400" loading="lazy" decoding="async" alt="" />
            <span className="proof-name">{p.name}</span>
            <span className="proof-description">{p.stack}</span>
            <Arrow />
          </Glass>
        ))}
      </section>
      <section className="other-work wrap">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">A wider view</p>
            <h2>
              Different problems. <em>The same care.</em>
            </h2>
          </div>
          <Link className="button button-glass" href="/work">
            View more projects
          </Link>
        </div>
        <div className="secondary-projects">
          {wider.map((w, k) => (
            <Glass as="article" key={w.name} className="secondary" style={{ "--i": k }} data-reveal>
              <a href={w.url} tabIndex={-1} aria-hidden="true">
                <BrowserFrame url={w.url}>
                  <Shot base={w.base} alt="" sizes="(max-width: 860px) 92vw, 45vw" />
                </BrowserFrame>
              </a>
              <p className="eyebrow">{w.eyebrow}</p>
              <h3>{w.name}</h3>
              <p>{w.text}</p>
              <Link className="text-link" href={w.url}>
                {w.cta}
              </Link>
            </Glass>
          ))}
        </div>
      </section>
      <section className="credentials wrap">
        <div className="section-heading" data-reveal>
          <div>
            <p className="eyebrow">Verified learning</p>
            <h2>
              A foundation in <em>systems & support.</em>
            </h2>
          </div>
        </div>
        <div className="cred-grid">
          {credentials.map(([name, url], k) => (
            <Glass as="a" key={url} href={url} className="cred" max={3} style={{ "--i": k }} data-reveal>
              <span className="check" aria-hidden="true">{I.check}</span>
              <span>{name}</span>
              <Arrow />
            </Glass>
          ))}
        </div>
      </section>
      <ContactBand engineer />
    </>
  );
}

/* ------------------------------------------------------------------- note */
function Note() {
  return (
    <article>
      <header className="page-intro wrap">
        <GlassObjects set="intro" />
        <a className="back-link" href="/engineering">
          ← Engineering
        </a>
        <p className="eyebrow rise" style={{ "--i": 0 }}>Engineering notes / 2 November 2026</p>
        <h1>
          <span className="line">
            <span style={{ "--i": 1 }}>When two workers</span>
          </span>{" "}
          <span className="line">
            <span style={{ "--i": 2 }}>
              <em>reach for one job.</em>
            </span>
          </span>
        </h1>
        <p className="lede rise" style={{ "--i": 3 }}>
          A design note from Weave’s push sender: lease ownership, retries, and
          the difference between protecting state and guaranteeing delivery.
        </p>
      </header>
      <div className="note-body article-body glass aura wrap" data-reveal>
        <p>
          Weave is still in development. This note describes the push-worker
          design, not a claim of production scale.
        </p>
        <h2>The race</h2>
        <p>
          A worker claims a notification and sends it to a provider. Before it
          records success, the request times out. Another run can eventually
          pick up that notification. Did the provider deliver the first attempt?
          The database cannot know just from a lost response.
        </p>
        <p>
          I separate two questions: who may update the job, and whether a user
          has already received the message. Solving the first does not
          automatically solve the second.
        </p>
        <h2>A lease is temporary ownership</h2>
        <ol className="note-steps">
          <li>
            <strong>Claim.</strong> A batch is associated with a lease token and
            an expiry.
          </li>
          <li>
            <strong>Renew.</strong> While processing, keep ownership alive
            within the run’s time budget.
          </li>
          <li>
            <strong>Check.</strong> Skip work if its lease is no longer ours.
          </li>
          <li>
            <strong>Finish conditionally.</strong> Update the row only if the
            current lease token still matches.
          </li>
        </ol>
        <p>
          The conditional finish is the important boundary. A slow worker cannot
          overwrite the result of the worker that took over. A final update
          without that ownership condition would reintroduce the race.
        </p>
        <div className="limitation">
          <h3>Ownership is not exactly-once delivery</h3>
          <p>
            A provider can accept a message before its response is lost.
            Retrying may deliver it again. A collapse identifier can help
            coalesce pending notifications under provider-specific rules, but it
            is not a universal deduplication guarantee. The receiving
            application still needs to tolerate repeat events.
          </p>
        </div>
        <h2>Test the overlap, not just each worker</h2>
        <p>
          The useful test runs two workers on a fake clock. Advance time beyond
          a lease boundary, let another run take ownership, then allow the first
          run to finish. Its final write must leave the second worker’s state
          untouched.
        </p>
        <p>
          I also classify 429 and server errors as temporary and stop starting
          new rows when the execution budget is spent. These choices make
          retries and interrupted runs explicit parts of the lifecycle.
        </p>
        <h2>The cost of this design</h2>
        <p>
          Lease renewal adds database work. Short leases make recovery faster
          but increase the chance of overlapping runs; long leases delay
          recovery after a crash. The right duration depends on measured
          provider latency and runtime limits, so I would tune it with telemetry
          rather than treat a constant as a guarantee.
        </p>
        <p>
          This is the standard I want in my systems: the failure path should
          have an explanation as clear as the successful one.
        </p>
        <Link className="button button-glass" href="/engineering">
          More engineering work
        </Link>
      </div>
      <ContactBand engineer />
    </article>
  );
}

/* -------------------------------------------------------------------- app */
export default function App({ path = "/" }) {
  useGlassParallax();
  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#f5f8fb");
  }, []);
  useReveal();
  const normalized = path.replace(/\/$/, "") || "/";
  const project = projects.find((p) => normalized === `/work/${p.slug}`);
  let content;
  if (normalized === "/") content = <Home />;
  else if (normalized === "/work") content = <Work />;
  else if (normalized === "/work-with-me") content = <WorkWithMe />;
  else if (normalized === "/engineering") content = <Engineering />;
  else if (normalized === "/notes/lease-based-push") content = <Note />;
  else if (project) content = <CaseStudy project={project} />;
  else
    content = (
      <section className="page-intro not-found wrap">
        <p className="eyebrow">404 / Page not found</p>
        <h1>
          <span className="line">
            <span style={{ "--i": 1 }}>Let’s get you</span>
          </span>{" "}
          <span className="line">
            <span style={{ "--i": 2 }}>
              <em>back on track.</em>
            </span>
          </span>
        </h1>
        <div className="hero-actions">
          <Link className="button button-primary" href="/">
            Return home
          </Link>
          <Link className="button button-glass" href="/work">
            See the work
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
      <ScrollProgress />
      <Header path={normalized} />
      <main id="main" tabIndex={-1}>
        {content}
      </main>
      <Footer />
    </>
  );
}
export { pages };

const projectType = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  stack: PropTypes.string,
  status: PropTypes.string,
  title: PropTypes.string,
  summary: PropTypes.string.isRequired,
  visualLabel: PropTypes.string,
  wordmark: PropTypes.string,
  visualSubtitle: PropTypes.string,
  flow: PropTypes.arrayOf(PropTypes.string),
  contextTitle: PropTypes.string,
  context: PropTypes.arrayOf(PropTypes.string),
  constraints: PropTypes.arrayOf(PropTypes.string),
  decisions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      choice: PropTypes.string,
      alternative: PropTypes.string,
      tradeoff: PropTypes.string,
    }),
  ),
  outcomeTitle: PropTypes.string,
  outcome: PropTypes.string,
  limitation: PropTypes.string,
});
const shotType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  small: PropTypes.string.isRequired,
  large: PropTypes.string.isRequired,
});
const buildType = PropTypes.shape({
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  sector: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  blurb: PropTypes.string.isRequired,
});
Link.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};
Glass.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  max: PropTypes.number,
  children: PropTypes.node,
};
BrowserFrame.propTypes = {
  url: PropTypes.string.isRequired,
  children: PropTypes.node,
};
Shot.propTypes = {
  base: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  sizes: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
Slideshow.propTypes = {
  shots: PropTypes.arrayOf(shotType).isRequired,
  alt: PropTypes.string.isRequired,
  interval: PropTypes.number,
  eager: PropTypes.bool,
  sizes: PropTypes.string,
};
PhoneFrame.propTypes = { src: PropTypes.string };
Stat.propTypes = {
  value: PropTypes.number.isRequired,
  suffix: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
FilmCard.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    portrait: PropTypes.bool,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
Header.propTypes = { path: PropTypes.string.isRequired };
ContactBand.propTypes = { engineer: PropTypes.bool };
Feature.propTypes = {
  project: projectType.isRequired,
  index: PropTypes.number.isRequired,
  layout: PropTypes.string.isRequired,
};
BuildCard.propTypes = { item: buildType.isRequired, index: PropTypes.number.isRequired };
Diagram.propTypes = { project: projectType.isRequired };
CaseStudy.propTypes = { project: projectType.isRequired };
App.propTypes = { path: PropTypes.string };
