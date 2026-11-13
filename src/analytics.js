import { inject, track } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";

// Cookie-free visit counts and real-user speed. Enquiry events record only the channel, the page and the
// chosen service: never names, email addresses or anything a visitor types.
inject();
injectSpeedInsights();
document.addEventListener("click", (event) => {
  const link = event.target.closest?.("a[href]");
  if (!link) return;
  const href = link.getAttribute("href");
  const channel = href.startsWith("https://wa.me/")
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
