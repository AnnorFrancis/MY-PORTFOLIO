import { inject, track } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";

// Cookie-free visit counts and real-user speed. Enquiry events record only the channel, the page and the
// chosen service: never names, email addresses or anything a visitor types.
inject();
// Real-user speed is a separate paid Vercel product, enabled only on request.
if (import.meta.env.VITE_SPEED_INSIGHTS === "on") injectSpeedInsights();
document.addEventListener("click", (event) => {
  const link = event.target.closest?.("a[href]");
  if (!link) return;
  const href = link.getAttribute("href");
  const channel = /^https:\/\/wa\.me\/\d/.test(href)
    ? "WhatsApp"
    : href.startsWith("mailto:")
      ? "Email"
      : null;
  if (channel) track("Contact click", { channel, page: window.location.pathname });
});
document.addEventListener("submit", (event) => {
  const form = event.target;
  if (!form.matches?.(".brief-form")) return;
  track("Brief drafted", {
    service: form.elements.service?.value || "Not chosen",
    page: window.location.pathname,
  });
});
