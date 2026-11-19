// The company flyers, one per service (plus two that cover everything).
// `cards` are the share previews built from each flyer by scripts/flyers.mjs.
export const flyers = [
  {
    key: "digital-solutions",
    source: "5.jpg",
    general: true,
    service: "websites-and-ecommerce",
    cards: ["home", "websites-and-ecommerce"],
    alt: "Flyer: Digital solutions that drive real growth. Websites, online stores, business systems and POS, AI chatbots, mobile apps, payroll and company systems, Meta ads and content, and systems for forex traders.",
  },
  {
    key: "executive-digital-solutions",
    source: "4.jpg",
    general: true,
    service: "custom-software-development",
    cards: ["services", "custom-software-development"],
    alt: "Flyer: Executive digital solutions. Built for growth, focused on results. Lists our services: websites and online stores, business systems and POS, AI chatbots, mobile apps, payroll and company systems, Meta and UGC ads, and systems for forex traders.",
  },
  {
    key: "business-systems",
    source: "6.jpg",
    service: "business-management-systems",
    cards: ["business-management-systems"],
    alt: "Flyer: One system for your whole business. POS at the counter, stock that updates itself, profit for any period, customers and bookings.",
  },
  {
    key: "ai-chatbots",
    source: "7.jpg",
    service: "ai-workflow-automation",
    cards: ["ai-workflow-automation"],
    alt: "Flyer: AI chatbots that answer your customers day and night on WhatsApp, Telegram and your website. Takes bookings and orders, answers questions, captures new leads.",
  },
  {
    key: "mobile-apps",
    source: "8.jpg",
    service: "mobile-apps",
    cards: ["mobile-apps"],
    alt: "Flyer: Mobile apps for your business, on iPhone and Android. Apps for your customers and your team, bookings and payments, push notifications.",
    photo: { key: "svc-mobile", left: 80, top: 450, width: 600, height: 400 },
  },
  {
    key: "payroll-staff-systems",
    source: "9.jpg",
    service: "payroll-and-staff-systems",
    cards: ["payroll-and-staff-systems"],
    alt: "Flyer: Payroll, staff and security systems for companies and institutions. Payroll and payslips, clock-in and attendance, staff records and reports, site security and a live board.",
    photo: { key: "svc-payroll", left: 560, top: 700, width: 950, height: 495 },
  },
  {
    key: "meta-ads-content",
    source: "10.jpg",
    service: "branding-social-media-and-video",
    cards: ["branding-social-media-and-video"],
    alt: "Flyer: Get seen. Meta ads, UGC video ads and content: ads that sell, flyers, posts and short videos, and social media management.",
  },
  {
    key: "forex-traders",
    source: "11.jpg",
    service: "systems-for-forex-traders",
    cards: ["systems-for-forex-traders"],
    alt: "Flyer: Systems and apps for forex traders. Your trading setup online day and night, alerts on your phone, journal and playbook tools, and apps for trading groups. We build software; we do not manage money or give trading advice.",
    photo: { key: "svc-forex", left: 180, top: 200, width: 1260, height: 560 },
  },
];

export const flyerFor = (serviceSlug) => flyers.find((f) => f.service === serviceSlug);
