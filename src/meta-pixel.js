// Meta Pixel for the company website. It is loaded only after a visitor chooses "Allow" on the
// cookie choice bar (see CookieChoice in ui.jsx), so nothing reaches Meta before consent.
// It records page views, taps on the WhatsApp and email buttons ("Contact") and drafted briefs
// ("Lead"). It never sends names, phone numbers, email addresses or anything a visitor types.
// The pixel is shared with the Selar store; filter by URL (perkinscreatives.perkos.app) in
// Events Manager to see the website's results on their own.
export const PIXEL_ID = "2337964750035566";

let started = false;

function contactChannel(href) {
  if (href.startsWith("https://wa.me/")) return "WhatsApp";
  if (href.startsWith("mailto:")) return "Email";
  if (href.startsWith("tel:")) return "Phone";
  return null;
}

function onClick(event) {
  const link = event.target.closest?.("a[href]");
  if (!link) return;
  const channel = contactChannel(link.getAttribute("href") || "");
  if (channel)
    window.fbq("track", "Contact", { content_name: channel, content_category: window.location.pathname });
}

function onSubmit(event) {
  const form = event.target;
  if (!form.matches?.(".brief-form")) return;
  const service = form.elements.service?.value || "Not chosen";
  window.fbq("track", "Lead", { content_name: service, content_category: window.location.pathname });
}

export function startPixel() {
  if (started || typeof window === "undefined") return;
  started = true;
  if (!window.fbq) {
    // Meta's standard loader: queue calls until fbevents.js arrives.
    const fbq = function (...args) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue.push(args);
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = fbq;
    if (!window._fbq) window._fbq = fbq;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }
  window.fbq("init", PIXEL_ID);
  window.fbq("track", "PageView");
  // Capture phase, so the event is queued before a WhatsApp link or form opens another app.
  document.addEventListener("click", onClick, true);
  document.addEventListener("submit", onSubmit, true);
}
