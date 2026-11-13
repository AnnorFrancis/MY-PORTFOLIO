import { services } from "./services";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  projects,
  pages,
  credentials,
  heroSlugs,
  moreSystems,
  moreSites,
  films,
  shotsFor,
} from "./content";
import {
  PageHero,
  Band,
  Heading,
  DirectContact,
  ServiceTiles,
  ProjectCard,
  CountUp,
  CtaBand,
  Faq,
  SiteFooter,
  servicePhoto,
  whatsappDisplay,
} from "./ui";

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
      <span>Creatives Tech</span>
    </span>
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
function Shot({ base, alt, sizes = "(max-width: 760px) 92vw, 50vw", width = 1200, height = 750, eager = false }) {
  return (
    <img
      src={`${base}-1200.webp`}
      srcSet={`${base}-640.webp 640w, ${base}-1200.webp 1200w`}
      sizes={sizes}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      fetchpriority={eager ? "high" : undefined}
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
              fetchpriority={eager && k === 0 ? "high" : undefined}
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
  ["/services", "Services"],
  ["/work", "Work"],
  ["/about", "Team"],
  ["/work-with-me", "Prices"],
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
  const rest = () => place(nav.current?.querySelector('.nav-link[aria-current]'));
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
  const current = (href) =>
    path === href ? "page" : path.startsWith(href + "/") ? "location" : undefined;
  return (
    <header
      className={`site-header${scrolled ? " scrolled" : " at-top"}${open ? " open" : ""}`}
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
          {navItems.map(([href, label]) =>
            href === "/services" ? (
              <div className="nav-item has-menu" key={href}>
                <a
                  className="nav-link"
                  href={href}
                  aria-current={current(href)}
                  onMouseEnter={(e) => place(e.currentTarget)}
                >
                  {label}
                  <span className="nav-caret" aria-hidden="true" />
                </a>
                <div className="nav-menu">
                  <ul className="nav-menu-inner" aria-label="Our services">
                    {services.map((s, i) => (
                      <li key={s.slug}>
                        <a href={"/services/" + s.slug} aria-current={current("/services/" + s.slug)}>
                          <span className="nav-menu-num" aria-hidden="true">0{i + 1}</span>
                          <span>
                            <strong>{s.name}</strong>
                            <small>{s.short}</small>
                          </span>
                        </a>
                      </li>
                    ))}
                    <li>
                      <a className="nav-menu-all" href="/services">
                        All services <Arrow />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <a
                key={href}
                className="nav-link"
                href={href}
                aria-current={current(href)}
                onMouseEnter={(e) => place(e.currentTarget)}
              >
                {label}
              </a>
            ),
          )}
          <a className="button button-primary nav-cta" href="/contact">
            <span>Contact us</span> <Arrow />
          </a>
        </nav>
      </div>
    </header>
  );
}
function Footer() {
  return <SiteFooter Wordmark={Wordmark} />;
}
function ContactBand({ topic }) {
  return <CtaBand topic={topic} />;
}
ContactBand.propTypes = { topic: PropTypes.string };

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

// Sharpest available screenshot of a project for its card.
const shotBase = (slug) => {
  const s = shotsFor(slug)[0];
  return s ? s.small.replace(/-640.webp$/, "") : `/images/projects/${slug}`;
};
const processSteps = [
  ["Understand", "We map the problem, the people using the system, and the tools you already rely on."],
  ["Build and test", "We agree the scope in writing. You then test the working system on your real daily tasks before launch."],
  ["Launch and hand over", "We set up payments, staff access and backups, then train your team. Ongoing care is agreed separately."],
];
const fromPrice = (service) => "From GHS " + service.price[0].toLocaleString("en-GB");
const faqs = [
  ["How much does a website cost?", "Starter websites range from GHS 2,000 to 3,500, and business websites from GHS 5,000 to 8,000. Custom applications range from GHS 10,000 to 15,000. The final price is agreed in writing before work begins."],
  ["How long does a project take?", "A starter website is usually ready in 1 to 2 weeks, a business website in 3 to 4 weeks, and a custom application in 6 to 10 weeks."],
  ["Can customers pay with Mobile Money?", "Yes. We connect Paystack, which accepts card payments and Mobile Money, and test a real payment and refund before launch."],
  ["Will I be able to update the website myself?", "Yes. Business websites include content management, so you can change text, photos and products without a developer."],
  ["Do you work with clients outside Ghana?", "Yes. We are based in Accra and work with clients in Ghana and abroad. Most of the work happens over WhatsApp, email and video calls."],
  ["What happens after launch?", "Each plan includes support: 1 month for starter websites, 3 months for business websites and 6 months for custom applications. Website care after that ranges from GHS 300 to 1,200 per month."],
];
function ServicePage({ service }) {
  const project = projects.find((item) => item.slug === service.projectSlug);
  const film = films.find((item) => item.id === service.film);
  const others = services.filter((s) => s.slug !== service.slug);
  return (
    <>
      <PageHero
        image={servicePhoto[service.slug]}
        back={["/services", "All services"]}
        eyebrow={"Services · " + service.name}
        title={service.title}
        lead={service.summary}
        aside={
          <div className="hero-price glass">
            <span>Published price</span>
            <strong>{fromPrice(service)}</strong>
            <p>{service.budget}</p>
          </div>
        }
      >
        <DirectContact topic={service.name} light />
      </PageHero>
      <Band tone="light">
        <div className="split-v2">
          <div data-reveal>
            <p className="kicker">The question we start with</p>
            <h2>{service.heading}</h2>
            <p className="big-text">{service.example}</p>
          </div>
          <div className="tick-card" data-reveal>
            <h3>What you receive</h3>
            <ul className="ticks">
              {service.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <a className="button button-primary" href={"/contact?service=" + encodeURIComponent(service.name) + "#start"}>
              Write a project brief <Arrow />
            </a>
          </div>
        </div>
      </Band>
      <Band tone="mist">
        <Heading
          eyebrow="Proof"
          title={project ? "Built for a real business." : "Made for real launches."}
          lead={service.prepare}
        />
        <div className="proof-v2">
          {project && (
            <ProjectCard
              featured
              caseStudy
              project={{ ...project, tag: project.visualLabel, image: shotBase(project.slug) }}
            />
          )}
          {!project && film && (
            <div className="film-feature" data-reveal>
              <FilmCard film={film} index={0} />
              <div>
                <p className="kicker">{film.kind}</p>
                <h3>{film.title}</h3>
                <p>{service.example}</p>
                <Link className="button button-primary" href={service.proof}>
                  {service.proofLabel}
                </Link>
              </div>
            </div>
          )}
        </div>
      </Band>
      <Band tone="dark">
        <Heading eyebrow="More services" title="Other ways we can help." />
        <div className="mini-tiles">
          {others.map((s) => (
            <a key={s.slug} className="mini-tile" href={"/services/" + s.slug} data-reveal>
              <img src={`/images/photos/${servicePhoto[s.slug]}-640.webp`} alt="" width="640" height="427" loading="lazy" decoding="async" />
              <span>
                <strong>{s.name}</strong>
                <small>{s.short}</small>
              </span>
              <Arrow />
            </a>
          ))}
        </div>
      </Band>
      <ContactBand topic={service.name} />
    </>
  );
}
ServicePage.propTypes = {
  service: PropTypes.shape({
    slug: PropTypes.string,
    projectSlug: PropTypes.string,
    film: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
    name: PropTypes.string,
    heading: PropTypes.string,
    example: PropTypes.string,
    deliverables: PropTypes.arrayOf(PropTypes.string),
    proof: PropTypes.string,
    proofLabel: PropTypes.string,
    budget: PropTypes.string,
    prepare: PropTypes.string,
    price: PropTypes.arrayOf(PropTypes.number),
  }).isRequired,
};
function Steps({ light = false }) {
  return (
    <ol className={light ? "steps-v2 on-dark" : "steps-v2"}>
      {processSteps.map(([t, p], i) => (
        <li key={t} style={{ "--i": i }} data-reveal>
          <span className="steps-num">0{i + 1}</span>
          <h3>{t}</h3>
          <p>{p}</p>
        </li>
      ))}
    </ol>
  );
}
Steps.propTypes = { light: PropTypes.bool };
function Services() {
  return (
    <>
      <PageHero
        image="hero-services"
        eyebrow="Services"
        title={<>Software built around <em>your workflow.</em></>}
        lead="Bring us the task that slows your team down. We work through who uses it, what tools it touches and what a successful first release should do."
      >
        <DirectContact light />
        <a className="hero-link" href="/work-with-me#pricing">See prices in GHS</a>
      </PageHero>
      <Band tone="light" className="svc-rows-band">
        <Heading
          eyebrow="Five services"
          title="What we build, and what it costs."
          lead="Each service has a published starting price. The final scope and price are agreed in writing before work begins."
        />
        <div className="svc-rows">
          {services.map((s, i) => (
            <article key={s.slug} id={"service-" + i} className={i % 2 ? "svc-row flip" : "svc-row"} data-reveal>
              <a className="svc-row-media" href={"/services/" + s.slug} tabIndex={-1} aria-hidden="true">
                <img
                  src={`/images/photos/${servicePhoto[s.slug]}-1000.webp`}
                  srcSet={`/images/photos/${servicePhoto[s.slug]}-640.webp 640w, /images/photos/${servicePhoto[s.slug]}-1000.webp 1000w, /images/photos/${servicePhoto[s.slug]}-1600.webp 1600w`}
                  sizes="(max-width: 900px) 92vw, 50vw"
                  alt=""
                  width="1000"
                  height="667"
                  loading="lazy"
                  decoding="async"
                />
                <span className="svc-row-price">{fromPrice(s)}</span>
              </a>
              <div className="svc-row-copy">
                <p className="kicker">0{i + 1} · {s.name}</p>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <ul className="ticks">
                  {s.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <div className="svc-row-actions">
                  <a className="button button-primary" href={"/services/" + s.slug}>
                    {s.name} details <Arrow />
                  </a>
                  <a className="text-link" href={s.proof}>
                    <span>{s.proofLabel}</span> <Arrow />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Band>
      <Band tone="dark">
        <Heading
          eyebrow="How we work"
          title={<>From discovery <em>to handover.</em></>}
          lead="You review the scope, price and delivery stages before development begins. Then we test each workflow against your real daily tasks."
        />
        <Steps light />
      </Band>
      <Band tone="mist">
        <Heading eyebrow="Questions" title="Answers before you ask." center />
        <Faq items={faqs} />
      </Band>
      <ContactBand />
    </>
  );
}
const team = [
  ["Francis Annor", "CEO & Full-stack Developer", "FA", "Leads technical delivery and connects the customer experience to the software behind it.", "/images/portrait-360.webp"],
  ["Yaw Sarkodie Mensah", "AI Engineer", "YSM", "Designs AI integrations and evaluates how they perform on the tasks they are built to handle.", "/images/team/yaw-sarkodie-mensah.webp"],
  ["Ivy Mensah", "Backend Developer", "IM", "Builds the APIs, data models and business rules that support everyday operations.", "/images/team/ivy-mensah.webp"],
  ["Megaleovis", "UI/UX & Front-end Developer", "M", "Designs user journeys and turns them into responsive interfaces.", "/images/team/megaleovis.webp"],
  ["Lizel", "Marketing Officer", "L", "Shapes how the company communicates its services and brings products to market.", "/images/team/lizel.webp"],
];
function TeamCard({ member, index }) {
  const [name, role, initials, focus, image] = member;
  return (
    <article className={index === 0 ? "team-card lead" : "team-card"} style={{ "--i": index }} data-reveal>
      <div className="team-card-photo">
        {image ? (
          <img src={image} alt={name} width="360" height="463" loading="lazy" decoding="async" />
        ) : (
          <span className="team-initials" aria-hidden="true">{initials}</span>
        )}
      </div>
      <div className="team-card-body">
        <h3>{name}</h3>
        <p className="team-role">{role}</p>
        <p>{focus}</p>
      </div>
    </article>
  );
}
TeamCard.propTypes = { member: PropTypes.array.isRequired, index: PropTypes.number };
function About() {
  return (
    <>
      <PageHero
        image="hero-about"
        eyebrow="About Perkins_Creatives Tech"
        title={<>The team behind <em>your system.</em></>}
        lead="We are an AI and software development company based in Accra, working with businesses and brands locally and internationally. Design, engineering and marketing sit in the same project conversation."
      >
        <DirectContact light />
      </PageHero>
      <Band tone="light">
        <Heading
          eyebrow="Our team"
          title="Five people across design, engineering and marketing."
          lead="Design, engineering and marketing in one team, based in Accra."
        />
        <div className="team-grid">
          {team.map((m, i) => (
            <TeamCard key={m[0]} member={m} index={i} />
          ))}
        </div>
      </Band>
      <Band tone="dark">
        <div className="split-v2">
          <div data-reveal>
            <p className="kicker kicker-light">Where our approach comes from</p>
            <h2>Built from real shop floors and salon calendars.</h2>
            <p className="big-text">
              Our founder’s work in retail and salon operations shaped how we deliver. Booking deposits, stock
              corrections and owner-managed content are part of the work from the first design conversation.
            </p>
            <Link className="button button-outline-light" href="/engineering">
              Read Francis’s engineering notes
            </Link>
          </div>
          <ul className="stat-grid">
            {[
              [20, "+", "Live builds shipped"],
              [3, "", "Systems taking live payments"],
              [5, "", "Service lines"],
              [30, "+", "Product films produced"],
            ].map(([v, s, l]) => (
              <li key={l}>
                <strong><CountUp value={v} suffix={s} /></strong>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>
      </Band>
      <Band tone="mist">
        <Heading eyebrow="What we do" title="Five services, one team." />
        <ServiceTiles />
      </Band>
      <ContactBand />
    </>
  );
}
function Contact() {
  return (
    <>
      <PageHero
        image="hero-contact"
        eyebrow="Project enquiries"
        title={<>Let’s scope <em>your project.</em></>}
        lead="Send us a message about what you want to build. A sentence is enough to start."
        aside={
          <ul className="contact-card glass">
            <li>
              <span>WhatsApp</span>
              <a href={whatsapp}>{whatsappDisplay}</a>
            </li>
            <li>
              <span>Email</span>
              <a href={`mailto:${email}`}>{email}</a>
            </li>
            <li>
              <span>Office</span>
              <strong>Accra, Ghana</strong>
            </li>
            <li>
              <span>Clients</span>
              <strong>Ghana and abroad</strong>
            </li>
          </ul>
        }
      >
        <DirectContact light />
      </PageHero>
      <ProjectBrief />
      <Band tone="dark">
        <Heading eyebrow="What happens next" title="Three steps, no surprises." />
        <Steps light />
      </Band>
      <Band tone="mist">
        <Heading eyebrow="Questions" title="Before you message us." center />
        <Faq items={faqs} />
      </Band>
    </>
  );
}
function Home() {
  const heroShots = heroSlugs.flatMap((slug) =>
    shotsFor(slug).slice(0, 1).map((s) => ({ ...s, key: slug })),
  );
  const [trendy, besia, perkos] = projects;
  return (
    <>
      <PageHero
        size="home"
        image="hero-home"
        video={[
          ["/videos/hero-team.webm", "video/webm"],
          ["/videos/hero-team.mp4", "video/mp4"],
        ]}
        eyebrow="Software, websites and AI · Accra, Ghana"
        title={<>Custom software for <em>business operations.</em></>}
        lead="We build websites, online stores, AI workflows and the systems behind them: bookings, payments and stock, all connected."
        aside={
          <figure className="hero-showcase glass">
            <Slideshow
              shots={heroShots}
              alt="Live systems built by Perkins_Creatives Tech"
              eager
              interval={3800}
              sizes="(max-width: 900px) 86vw, 40vw"
            />
            <figcaption>
              <span><i className="dot" /> Paystack integrations</span>
              <span><i className="dot" /> Bēsia · booking deposits</span>
              <span><i className="dot" /> PerkOS · offline sales</span>
            </figcaption>
          </figure>
        }
      >
        <DirectContact light />
      </PageHero>

      <Band tone="light" className="trust-band" label="Clients">
        <div className="trust-v2" data-reveal>
          <p>Live systems we have built for</p>
          <ul>
            <li>Trendy Norms Hub</li>
            <li>Bēsia Beauty Studio</li>
            <li>Letteropedia</li>
            <li>PerkOS</li>
          </ul>
        </div>
        <ul className="stat-row">
          {[
            [20, "+", "Live builds shipped"],
            [3, "", "Systems taking live payments"],
            [5, "", "Specialists on the team"],
            [30, "+", "Product films produced"],
          ].map(([v, s, l]) => (
            <li key={l}>
              <strong><CountUp value={v} suffix={s} /></strong>
              <span>{l}</span>
            </li>
          ))}
        </ul>
      </Band>

      <Band tone="mist" id="services">
        <Heading
          eyebrow="Capabilities"
          title={<>What we can <em>build for you.</em></>}
          lead="Five services, each with a published starting price in Ghana cedis."
          action={
            <a className="text-link" href="/services">
              <span>All services and prices</span> <Arrow />
            </a>
          }
        />
        <ServiceTiles />
      </Band>

      <Band tone="dark" id="work">
        <Heading
          eyebrow="Selected work"
          title={<>Four projects. <em>All live today.</em></>}
          lead="Built by our founder, Francis Annor. Open the live products and read the decisions behind each one."
          action={
            <a className="button button-outline-light" href="/work">
              View all work <Arrow />
            </a>
          }
        />
        <div className="project-grid">
          <ProjectCard featured caseStudy index={0} project={{ ...trendy, tag: trendy.visualLabel, image: shotBase(trendy.slug) }} />
          <ProjectCard caseStudy index={1} project={{ ...besia, tag: besia.visualLabel, image: shotBase(besia.slug) }} />
          <ProjectCard caseStudy index={2} project={{ ...perkos, tag: perkos.visualLabel, image: shotBase(perkos.slug) }} />
          <ProjectCard index={3} project={{ ...letteropedia, tag: "Education / Client website", image: shotBase(letteropedia.slug) }} />
        </div>
      </Band>

      <Band tone="light">
        <div className="split-v2 media-left">
          <figure className="split-media" data-reveal>
            <img
              src="/images/photos/planning-1000.webp"
              srcSet="/images/photos/planning-640.webp 640w, /images/photos/planning-1000.webp 1000w"
              sizes="(max-width: 900px) 92vw, 46vw"
              alt="A team planning a project around a table"
              width="1000"
              height="667"
              loading="lazy"
              decoding="async"
            />
          </figure>
          <div>
            <p className="kicker">How we work</p>
            <h2>
              From the first message <em>to handover.</em>
            </h2>
            <Steps />
            <a className="text-link" href="/work-with-me#pricing">
              <span>See prices and timelines</span> <Arrow />
            </a>
          </div>
        </div>
      </Band>

      <Band tone="sea">
        <div className="team-teaser" data-reveal>
          <div>
            <p className="kicker kicker-light">Our company</p>
            <h2>Five people across design, engineering and marketing.</h2>
            <a className="button button-light" href="/about">
              Meet the team <Arrow />
            </a>
          </div>
          <ul className="avatar-row" aria-label="Team members">
            {team.map(([name, role, initials, , image]) => (
              <li key={name} title={name + ", " + role}>
                {image ? <img src={image} alt={name} width="72" height="72" loading="lazy" /> : <span aria-hidden="true">{initials}</span>}
                <span className="sr-only">{name}, {role}</span>
              </li>
            ))}
          </ul>
        </div>
      </Band>
      <ContactBand />
    </>
  );
}

/* ------------------------------------------------------------------- work */
const buildCard = (item) => {
  const shot = shotsFor(item.slug)[0];
  return {
    slug: item.slug,
    name: item.name,
    kind: item.sector,
    summary: item.blurb,
    url: item.url,
    tag: item.status,
    image: shot ? shot.small.replace(/-640\.webp$/, "") : `/images/projects/${item.slug}`,
  };
};
function Work() {
  return (
    <>
      <PageHero
        image="hero-work"
        eyebrow="Our work"
        title={<>More builds, <em>chosen with care.</em></>}
        lead="Case studies, systems, websites and product films. Every card opens the real, working build."
      >
        <nav className="hero-chips" aria-label="On this page">
          <a href="#case-studies">Case studies</a>
          <a href="#systems">Systems</a>
          <a href="#websites">Websites & stores</a>
          <a href="#films">Films</a>
        </nav>
      </PageHero>
      <Band tone="dark" id="case-studies">
        <Heading
          eyebrow="Case studies"
          title={<>The full story, <em>decision by decision.</em></>}
          lead="Delivered systems and our founder’s own product, with the constraints, choices and trade-offs behind each."
        />
        <div className="project-grid three">
          {projects.map((p, k) => (
            <ProjectCard key={p.slug} caseStudy index={k} project={{ ...p, tag: p.visualLabel, image: shotBase(p.slug) }} />
          ))}
        </div>
      </Band>
      <Band tone="light" id="systems">
        <Heading
          eyebrow="Systems"
          title={<>Software a business <em>runs every day.</em></>}
          lead="Trading desks, course platforms, stock and sales, and back offices tied to the website."
        />
        <div className="project-grid two">
          {moreSystems.map((item, k) => (
            <ProjectCard key={item.slug} index={k} project={buildCard(item)} cta="Visit the build" />
          ))}
        </div>
      </Band>
      <Band tone="mist" id="websites">
        <Heading
          eyebrow="Websites & stores"
          title={<>First impressions, <em>built to sell.</em></>}
          lead="Storefronts and brand sites with the tools behind them."
        />
        <div className="project-grid two">
          {moreSites.map((item, k) => (
            <ProjectCard key={item.slug} index={k} project={buildCard(item)} cta="Visit the build" />
          ))}
        </div>
      </Band>
      <Band tone="dark" id="films">
        <Heading
          eyebrow="Films"
          title={<>Launch and teaser <em>films.</em></>}
          lead="Short films made to launch and explain the products. Press play to watch."
        />
        <div className="film-grid">
          {films.map((film, k) => (
            <FilmCard key={film.id} film={film} index={k} />
          ))}
        </div>
      </Band>
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
  const relatedService = services.find(service => service.projectSlug === project.slug);
  const active = useActiveSection(caseIds);
  const facts = [
    ["Project", project.name],
    ["Francis Annor’s role", project.role],
    ["Stack", project.stack],
    ["Status", project.status],
  ];
  return (
    <article>
      <PageHero
        imageSrc={`/images/projects/${project.slug}-1200.webp`}
        back={["/work#case-studies", "All case studies"]}
        eyebrow={project.kind + " · Case study"}
        title={project.title}
        lead={project.summary}
      >
        <a className="button button-primary" href={project.url}>
          Visit the live site <Arrow />
        </a>
        {relatedService && (
          <a className="button button-outline-light" href={"/services/" + relatedService.slug}>
            {relatedService.name} service <Arrow />
          </a>
        )}
      </PageHero>
      <Band tone="mist" className="facts-band">
        <dl className="project-facts">
          {facts.map(([k, v], i) => (
            <div key={k} className="fact" style={{ "--i": i }} data-reveal>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </Band>
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
      {relatedService && <div className="wrap related-service"><Link className="button button-glass" href={"/services/" + relatedService.slug}>Explore {relatedService.name.toLowerCase()} for your business</Link></div>}
      <ContactBand />
    </article>
  );
}

/* ----------------------------------------------------------- work with me */
function ProjectBrief() {
  const [status, setStatus] = useState("");
  const serviceField = useRef(null);
  useEffect(() => {
    const requested = new window.URLSearchParams(window.location.search).get(
      "service",
    );
    if (services.some(({name}) => name === requested))
      serviceField.current.value = requested;
  }, []);
  function submit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Hello Perkins_Creatives Tech,\n\n${data.get("message")}\n\nService: ${data.get("service")}\nBudget: ${data.get("budget")}`;
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
          Tell us what <em>isn’t working yet.</em>
        </h2>
        <p>
          For an email brief, describe one task you want to improve. Service and budget are optional.
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
        <label>
          Area of interest (optional)
          <select name="service" ref={serviceField}>
            <option>Help me scope it</option>
            {services.map(({name}) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
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
          Budget range (optional)
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
      <PageHero
        image="hero-pricing"
        eyebrow="Prices and process"
        title={<>A better way to run <em>your day-to-day.</em></>}
        lead="We build websites, stores, and the systems behind them. Start with the bottleneck: the booking that gets missed, the stock that doesn’t add up, or the tools that don’t talk to each other."
        aside={
          <div className="glance-v2 glass" aria-label="At a glance">
            <p className="hero-eyebrow">At a glance</p>
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
          </div>
        }
      >
        <a className="button button-primary" href="#start">
          Discuss your project <Arrow />
        </a>
        <a className="button button-outline-light" href="#pricing">
          See the prices <Arrow />
        </a>
      </PageHero>
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
        <div className="wrap">
          <div className="section-heading" data-reveal>
            <div>
              <p className="eyebrow">Project prices / GHS</p>
              <h2>
                Clear prices. <em>In Ghana cedis.</em>
              </h2>
            </div>
            <p>
              Use these ranges to plan your budget. The final scope,
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
            ["Launch and hand over", "We set up payments, staff access and backups, then train your team. Ongoing care is agreed separately."],
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
      <PageHero
        image="hero-engineering"
        eyebrow="Founder’s engineering notes · Francis Annor"
        title={<>The interface is only <em>half the work.</em></>}
        lead="I build across the application: data models, APIs, payments, permissions, and the interfaces people use. My strongest work is on rules that must not break, like payments, stock and staff permissions."
        aside={
          <div className="glance-v2 glass" aria-label="Stack I work in">
            <p className="hero-eyebrow">Where I work</p>
            <ul className="chips chips-light">
              {["Next.js", "React", "TypeScript", "Node.js", "Supabase", "Postgres", "Flutter", "Paystack", "Redis", "Vitest"].map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p className="glance-note">Data models · APIs · payments · permissions · interfaces</p>
          </div>
        }
      >
        <a className="button button-primary" href="/contact">
          Discuss a technical project <Arrow />
        </a>
      </PageHero>
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
      <ContactBand />
    </>
  );
}

/* ------------------------------------------------------------------- note */
function Note() {
  return (
    <article>
      <PageHero
        image="hero-note"
        back={["/engineering", "Engineering"]}
        eyebrow="Engineering notes / 2 November 2026"
        title={<>When two workers <em>reach for one job.</em></>}
        lead="A design note from Weave’s push sender: lease ownership, retries, and the difference between protecting state and guaranteeing delivery."
      />
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
      <ContactBand />
    </article>
  );
}

/* -------------------------------------------------------------------- app */
export default function App({ path = "/" }) {
  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", "#0d1820");
  }, []);
  useReveal();
  const normalized = path.replace(/\/$/, "") || "/";
  const project = projects.find((p) => normalized === `/work/${p.slug}`);
  const service = services.find(item => normalized === "/services/" + item.slug);
  let content;
  if (normalized === "/") content = <Home />;
  else if (normalized === "/about") content = <About />;
  else if (normalized === "/services") content = <Services />;
  else if (normalized === "/contact") content = <Contact />;
  else if (normalized === "/work") content = <Work />;
  else if (normalized === "/work-with-me") content = <WorkWithMe />;
  else if (normalized === "/engineering") content = <Engineering />;
  else if (normalized === "/notes/lease-based-push") content = <Note />;
  else if (service) content = <ServicePage service={service} />;
  else if (project) content = <CaseStudy project={project} />;
  else
    content = (
      <PageHero
        size="short"
        image="hero-work"
        eyebrow="404 / Page not found"
        title={<>Let’s get you <em>back on track.</em></>}
        lead="The page you opened does not exist. These links lead to our services, work and contact details."
      >
        <a className="button button-primary" href="/">
          Return home <Arrow />
        </a>
        <a className="button button-outline-light" href="/services">
          See our services <Arrow />
        </a>
      </PageHero>
    );
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
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
  eager: PropTypes.bool,
};
Slideshow.propTypes = {
  shots: PropTypes.arrayOf(shotType).isRequired,
  alt: PropTypes.string.isRequired,
  interval: PropTypes.number,
  eager: PropTypes.bool,
  sizes: PropTypes.string,
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

Diagram.propTypes = { project: projectType.isRequired };
CaseStudy.propTypes = { project: projectType.isRequired };
App.propTypes = { path: PropTypes.string };
