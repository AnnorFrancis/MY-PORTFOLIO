// Shared building blocks for the company site: photo heroes, toned
// sections, image tiles, project cards, the photo call-to-action and the
// footer. Pages compose these so every section has its own look.
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { services } from "./services";

export const email = "annorfrancis23@outlook.com";
export const whatsapp = "https://wa.me/233538713916";
export const whatsappDisplay = "+233 53 871 3916";

const ArrowIcon = () => (
  <span className="arrow-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  </span>
);
export { ArrowIcon };

// Responsive WebP photo set from public/images/photos.
const HERO_WIDTHS = [800, 1280, 1920];
const CARD_WIDTHS = [640, 1000, 1600];
export function photo(key, widths = HERO_WIDTHS) {
  return {
    src: `/images/photos/${key}-${widths[Math.min(1, widths.length - 1)]}.webp`,
    srcSet: widths.map((w) => `/images/photos/${key}-${w}.webp ${w}w`).join(", "),
  };
}
export const servicePhoto = {
  "ai-workflow-automation": "svc-ai",
  "business-management-systems": "svc-business",
  "websites-and-ecommerce": "svc-web",
  "custom-software-development": "svc-custom",
  "branding-social-media-and-video": "svc-brand",
};

// Plays a muted background loop on larger screens only, after the page has
// loaded, and never when the visitor prefers reduced motion or saves data.
function HeroVideo({ sources, poster }) {
  const [show, setShow] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const big = window.matchMedia("(min-width: 768px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saving = window.navigator.connection?.saveData;
    if (!big || calm || saving) return undefined;
    let timer;
    const go = () => {
      timer = window.setTimeout(() => setShow(true), 400);
    };
    if (document.readyState === "complete") go();
    else window.addEventListener("load", go, { once: true });
    return () => {
      window.removeEventListener("load", go);
      window.clearTimeout(timer);
    };
  }, []);
  if (!show) return null;
  return (
    <video
      className={ready ? "hero-video is-ready" : "hero-video"}
      autoPlay
      muted
      loop
      playsInline
      poster={poster}
      onCanPlay={() => setReady(true)}
    >
      {sources.map(([src, type]) => (
        <source key={src} src={src} type={type} />
      ))}
    </video>
  );
}
HeroVideo.propTypes = {
  sources: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  poster: PropTypes.string,
};

export function PageHero({
  image,
  imageSrc,
  video,
  eyebrow,
  title,
  lead,
  children,
  size = "page",
  back,
  aside,
}) {
  const media = imageSrc
    ? { src: imageSrc, srcSet: undefined }
    : photo(image, image.startsWith("svc-") ? CARD_WIDTHS : HERO_WIDTHS);
  return (
    <header className={`hero-v2 hero-${size}`}>
      <div className="hero-media" aria-hidden="true">
        <img
          src={media.src}
          srcSet={media.srcSet}
          sizes="100vw"
          alt=""
          width="1920"
          height="1080"
          loading="eager"
          fetchpriority="high"
          decoding="async"
        />
        {video && <HeroVideo sources={video} poster={media.src} />}
      </div>
      <div className="hero-scrim" aria-hidden="true" />
      <div className={aside ? "hero-content wrap has-aside" : "hero-content wrap"}>
        <div className="hero-copy-v2">
          {back && (
            <a className="hero-back" href={back[0]}>
              <span aria-hidden="true">←</span> {back[1]}
            </a>
          )}
          {eyebrow && (
            <p className="hero-eyebrow rise" style={{ "--i": 0 }}>
              {eyebrow}
            </p>
          )}
          <h1 className="rise" style={{ "--i": 1 }}>
            {title}
          </h1>
          {lead && (
            <p className="hero-lead rise" style={{ "--i": 2 }}>
              {lead}
            </p>
          )}
          {children && (
            <div className="hero-actions-v2 rise" style={{ "--i": 3 }}>
              {children}
            </div>
          )}
        </div>
        {aside && (
          <div className="hero-aside rise" style={{ "--i": 4 }}>
            {aside}
          </div>
        )}
      </div>
    </header>
  );
}
PageHero.propTypes = {
  image: PropTypes.string,
  imageSrc: PropTypes.string,
  video: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  eyebrow: PropTypes.node,
  title: PropTypes.node.isRequired,
  lead: PropTypes.node,
  children: PropTypes.node,
  size: PropTypes.oneOf(["home", "page", "short"]),
  back: PropTypes.arrayOf(PropTypes.string),
  aside: PropTypes.node,
};

// A full-width section with its own background tone.
export function Band({ tone = "light", id, className = "", children, label }) {
  return (
    <section id={id} className={`band-v2 tone-${tone} ${className}`.trim()} aria-label={label}>
      <div className="wrap">{children}</div>
    </section>
  );
}
Band.propTypes = {
  tone: PropTypes.oneOf(["light", "mist", "dark", "sea", "photo"]),
  id: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  label: PropTypes.string,
};

export function Heading({ eyebrow, title, lead, center = false, action }) {
  return (
    <div className={center ? "heading-v2 center" : "heading-v2"} data-reveal>
      <div>
        {eyebrow && <p className="kicker">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {(lead || action) && (
        <div className="heading-side">
          {lead && <p>{lead}</p>}
          {action}
        </div>
      )}
    </div>
  );
}
Heading.propTypes = {
  eyebrow: PropTypes.node,
  title: PropTypes.node.isRequired,
  lead: PropTypes.node,
  center: PropTypes.bool,
  action: PropTypes.node,
};

export function DirectContact({ topic, light = false }) {
  const intro = topic
    ? "Hello Perkins_Creatives Tech, I’d like to discuss " + topic + "."
    : "Hello Perkins_Creatives Tech, I’d like to discuss a project.";
  return (
    <div className={light ? "direct-contact on-dark" : "direct-contact"}>
      <a className="button button-primary" href={whatsapp + "?text=" + encodeURIComponent(intro)}>
        Chat on WhatsApp <ArrowIcon />
      </a>
      <a
        className={light ? "button button-outline-light" : "direct-email"}
        href={"mailto:" + email + "?subject=" + encodeURIComponent(topic || "Project enquiry")}
      >
        Email our team <ArrowIcon />
      </a>
    </div>
  );
}
DirectContact.propTypes = { topic: PropTypes.string, light: PropTypes.bool };

// Photo tiles for the five services.
export function ServiceTiles() {
  return (
    <div className="svc-tiles">
      {services.map((s, i) => {
        const ph = photo(servicePhoto[s.slug], CARD_WIDTHS);
        return (
          <a key={s.slug} className="svc-tile" href={"/services/" + s.slug} style={{ "--i": i }} data-reveal>
            <img
              src={ph.src}
              srcSet={ph.srcSet}
              sizes={i < 2 ? "(max-width: 760px) 92vw, 50vw" : "(max-width: 760px) 92vw, 33vw"}
              alt=""
              width="1000"
              height="667"
              loading="lazy"
              decoding="async"
            />
            <span className="svc-tile-shade" aria-hidden="true" />
            <span className="svc-tile-body">
              <span className="svc-tile-num">0{i + 1}</span>
              <span className="svc-tile-title">{s.name}</span>
              <span className="svc-tile-text">{s.summary}</span>
              <span className="svc-tile-more">
                Explore {s.name.toLowerCase()} <ArrowIcon />
              </span>
            </span>
          </a>
        );
      })}
    </div>
  );
}

// One project in one card: picture, label, title, summary, tags, actions.
export function ProjectCard({ project, featured = false, caseStudy = false, index = 0, cta }) {
  const image = project.image || `/images/projects/${project.slug}`;
  const primary = caseStudy ? `/work/${project.slug}` : project.url;
  return (
    <article className={featured ? "project-card featured" : "project-card"} style={{ "--i": index }} data-reveal>
      <a className="project-card-media" href={primary} tabIndex={-1} aria-hidden="true">
        <img
          src={`${image}-1200.webp`}
          srcSet={`${image}-640.webp 640w, ${image}-1200.webp 1200w`}
          sizes={featured ? "(max-width: 900px) 92vw, 60vw" : "(max-width: 900px) 92vw, 33vw"}
          alt=""
          width="1200"
          height="750"
          loading="lazy"
          decoding="async"
        />
        {project.tag && <span className="project-card-tag">{project.tag}</span>}
      </a>
      <div className="project-card-body">
        <p className="project-card-kind">{project.kind}</p>
        <h3>
          <a href={primary}>{project.name}</a>
        </h3>
        <p className="project-card-text">{project.summary}</p>
        {project.stack && (
          <ul className="project-card-chips" aria-label={`${project.name} stack`}>
            {project.stack.split(" · ").map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
        <div className="project-card-actions">
          {caseStudy ? (
            <>
              <a className="button button-primary button-small" href={`/work/${project.slug}`}>
                Read the case study <ArrowIcon />
              </a>
              <a className="text-link" href={project.url}>
                <span>Live site</span> <ArrowIcon />
              </a>
            </>
          ) : (
            <a className="button button-primary button-small" href={project.url}>
              {cta || "Visit the live website"} <ArrowIcon />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
ProjectCard.propTypes = {
  project: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    kind: PropTypes.string,
    summary: PropTypes.string,
    url: PropTypes.string.isRequired,
    stack: PropTypes.string,
    tag: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  featured: PropTypes.bool,
  caseStudy: PropTypes.bool,
  index: PropTypes.number,
  cta: PropTypes.string,
};

// Counts up once when it scrolls into view; the final number is in the HTML.
export function CountUp({ value, suffix = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const io = new window.IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = window.performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / 1400);
        el.textContent = Math.round(value * (1 - Math.pow(1 - p, 3))) + suffix;
        if (p < 1) window.requestAnimationFrame(tick);
      };
      window.requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, suffix]);
  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
CountUp.propTypes = { value: PropTypes.number.isRequired, suffix: PropTypes.string };

// Full-width photo call-to-action that closes most pages.
export function CtaBand({ title = "Which part of your business needs better software?", topic, image = "accra-city" }) {
  const ph = photo(image);
  return (
    <section className="cta-v2" aria-label="Start a project">
      <img className="cta-v2-media" src={ph.src} srcSet={ph.srcSet} sizes="100vw" alt="" width="1920" height="1280" loading="lazy" decoding="async" />
      <div className="cta-v2-scrim" aria-hidden="true" />
      <div className="cta-v2-inner wrap" data-reveal>
        <p className="kicker kicker-light">Start a project</p>
        <h2>{title}</h2>
        <p>Send one message on WhatsApp or email. We reply personally and agree the scope and price with you before any work starts.</p>
        <DirectContact topic={topic} light />
      </div>
    </section>
  );
}
CtaBand.propTypes = { title: PropTypes.string, topic: PropTypes.string, image: PropTypes.string };

export function Faq({ items }) {
  return (
    <div className="faq-v2">
      {items.map(([q, a]) => (
        <details key={q} data-reveal>
          <summary>
            <span>{q}</span>
            <span className="faq-plus" aria-hidden="true" />
          </summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}
Faq.propTypes = { items: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired };

export function SiteFooter({ Wordmark }) {
  return (
    <footer className="footer-v2">
      <div className="wrap footer-v2-top">
        <div className="footer-v2-brand">
          <a className="footer-v2-logo" href="/">
            <Wordmark />
          </a>
          <p>
            Software, website and AI company in Accra, Ghana. We build websites, online stores, business systems,
            custom software and AI automation for businesses in Ghana and abroad.
          </p>
          <DirectContact light />
        </div>
        <nav className="footer-v2-col" aria-label="Services">
          <h2>Services</h2>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <a href={"/services/" + s.slug}>{s.name}</a>
              </li>
            ))}
            <li>
              <a href="/services">All services</a>
            </li>
          </ul>
        </nav>
        <nav className="footer-v2-col" aria-label="Company">
          <h2>Company</h2>
          <ul>
            <li><a href="/about">About and team</a></li>
            <li><a href="/work">Our work</a></li>
            <li><a href="/work-with-me">Prices in GHS</a></li>
            <li><a href="/engineering">Engineering</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
        <div className="footer-v2-col">
          <h2>Contact</h2>
          <ul>
            <li><a href={whatsapp}>WhatsApp {whatsappDisplay}</a></li>
            <li><a href={"mailto:" + email}>{email}</a></li>
            <li>Accra, Ghana</li>
            <li>Working with clients in Ghana and abroad</li>
          </ul>
          <h2 className="footer-v2-sub">Follow</h2>
          <ul className="footer-v2-social">
            <li><a href="https://linkedin.com/in/francis-annor-649a0a26a">LinkedIn</a></li>
            <li><a href="https://github.com/AnnorFrancis">GitHub</a></li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-v2-bottom">
        <span>© 2026 Perkins_Creatives Tech. All rights reserved.</span>
        <a href="#main">Back to top ↑</a>
      </div>
    </footer>
  );
}
SiteFooter.propTypes = { Wordmark: PropTypes.elementType.isRequired };
