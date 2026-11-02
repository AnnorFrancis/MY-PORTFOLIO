import manifest from "./gallery-manifest.json";

// Screenshots for each build live in public/images/gallery; the manifest lists
// only files that exist, so a card never points at a missing image.
const entry = (slug) => manifest[slug] || { shots: [], mobile: false };
export const shotsFor = (slug) =>
  entry(slug).shots.map((k) => ({
    key: k,
    small: `/images/gallery/${slug}-${k}-640.webp`,
    large: `/images/gallery/${slug}-${k}-1200.webp`,
  }));
export const mobileShotFor = (slug) =>
  entry(slug).mobile ? `/images/gallery/${slug}-m.webp` : null;

export const projects = [
  {
    slug: "trendy-norms",
    name: "Trendy Norms Hub",
    kind: "Launched client system",
    role: "Full-stack developer",
    url: "https://trendynormshub.com",
    stack: "Next.js · TypeScript · Supabase · Paystack",
    status: "Live retail system",
    title: "An online store connected to the shop’s stock, payments and staff.",
    summary:
      "An online storefront and retail back office, connecting sales, stock, payments, and the people running the shop.",
    visualLabel: "Retail / Connected commerce",
    wordmark: "Trendy Norms",
    visualSubtitle: "From storefront to stockroom.",
    flow: ["Browse & buy", "Record the sale", "Keep stock aligned"],
    contextTitle: "Fixing a mistake after a sale is part of the job.",
    context: [
      "A duplicate cash sale was recorded against the wrong credit account. I used the return workflow to reverse it while correcting stock and the cash drawer. That recovery path is as important as the original checkout. I have left out transaction identifiers and customer details.",
      "I built a retail system with a public storefront and a staff back office in one application. The customer journey matters, but so does what happens when staff need to correct a sale or reconcile the day.",
      "The main challenge: one sale changes money, stock, and customer records. All three must always agree.",
    ],
    constraints: [
      "The shop needs customer-facing commerce and staff operations on the same domain.",
      "Payments must support the paths customers already use, including Mobile Money.",
      "Operational mistakes need a recovery path; editing a screen is not enough if the underlying records disagree.",
    ],
    decisions: [
      {
        title: "One application for the front and back office",
        choice:
          "I used Next.js and Supabase for the storefront and staff workflows, with payment processing on the server.",
        alternative:
          "Separate storefront and back-office products joined by periodic data transfers.",
        tradeoff:
          "A shared application reduces integration boundaries, but makes authorization between public and staff areas especially important.",
      },
      {
        title: "Treat money rules as release gates",
        choice:
          "I included dedicated money, payment-signature, and role tests, alongside checks for the database and application boundaries.",
        alternative: "Rely on manual checkout testing before each release.",
        tradeoff:
          "Automated checks take maintenance. They provide repeatable evidence for critical rules, but still need real payment-path testing.",
      },
      {
        title: "Make operations part of the delivery",
        choice:
          "I added a health heartbeat and runbooks for outages, backup restoration, key rotation, and handover.",
        alternative:
          "Deliver the application with deployment instructions alone.",
        tradeoff:
          "Runbooks and monitors need ongoing upkeep. In return, recovery has a starting point instead of depending on memory.",
      },
    ],
    outcomeTitle: "A launched system, with an operational backbone.",
    outcome:
      "I shipped the production storefront and business-management application with live payments. The system includes tested financial workflows, health monitoring, and documented recovery procedures. The live link opens the production site, rather than the earlier pitch demo.",
    limitation:
      "I would keep extending correction-path tests around the mistakes staff actually encounter. I do not have a measured before-and-after revenue or time-saving study to attribute to this build.",
  },
  {
    slug: "besia",
    name: "Bēsia Beauty Studio",
    kind: "Launched client system",
    role: "Full-stack developer",
    url: "https://www.besiabeauty.com",
    stack: "JavaScript · Node.js · Supabase · Paystack",
    status: "Launched October 2026",
    title: "A salon website with the booking and studio system behind it.",
    summary:
      "Bookings, deposits, commerce, and a studio manager, with an editor that puts everyday website changes in the owner’s hands.",
    visualLabel: "Beauty / Studio operations",
    wordmark: "Bēsia",
    visualSubtitle: "One studio. Both sides of the business.",
    flow: ["Discover & book", "Pay a deposit", "Run the studio"],
    contextTitle: "The owner needs to run it without a developer beside her.",
    context: [
      "I built the public website and Studio Manager around one database. Customers can explore services, book with a deposit, and shop; staff work with calendars, stock, clients, and payments behind the scenes.",
      "The handover needed to cover ordinary changes too. A new photo or a revised description should not require a development task.",
    ],
    constraints: [
      "The studio already used Fresha; a new system needed to work with that calendar.",
      "The owner needed control over live website copy and photographs.",
      "Payments, bookings, and staff workflows needed to work as a connected system.",
    ],
    decisions: [
      {
        title: "Give the owner a website editor",
        choice:
          "I built editing tools into Studio Manager so the owner can update public copy and photographs.",
        alternative: "Ask the owner to send every content change back to me.",
        tradeoff:
          "An editor adds permissions and validation to maintain. It gives the owner independence for everyday changes.",
      },
      {
        title: "Integrate the existing calendar",
        choice:
          "I connected the system to Fresha with two-way calendar synchronization.",
        alternative: "Replace the existing booking workflow entirely.",
        tradeoff:
          "Synchronization adds an external dependency and failure cases. It avoids making the team abandon a tool they already use.",
      },
      {
        title: "Prove the handover, not just the interface",
        choice:
          "The launch included a live payment and refund exercise, a restore drill, and owner training with a handover pack.",
        alternative: "Treat a successful deployment as the end of the job.",
        tradeoff:
          "Operational exercises take time before launch. They make the delivery more useful to the person responsible for running it.",
      },
    ],
    outcomeTitle: "A connected studio, launched and handed over.",
    outcome:
      "The system launched in October 2026 with live payments, the public experience, and Studio Manager. The owner can change website content herself. Later updates came from real requests by the studio, not guesses.",
    limitation:
      "The calendar integration depends on an external service, so monitoring and recovery remain part of the work. I would measure owner task completion before claiming a quantified improvement in efficiency.",
  },
  {
    slug: "perkos",
    name: "PerkOS",
    kind: "Independent product",
    role: "Product designer & full-stack developer",
    url: "https://perkos.app",
    stack: "Next.js · TypeScript · Supabase · Vitest",
    status: "Live · commercially unproven",
    title: "A till that keeps selling when the internet drops.",
    summary:
      "My own business software product, exploring offline sale queues, stock controls, and the rules that keep a till trustworthy.",
    visualLabel: "Own product / Business software",
    wordmark: "PerkOS",
    visualSubtitle: "Sales keep going offline.",
    flow: ["Capture the sale", "Queue offline", "Replay on reconnect"],
    contextTitle: "The internet will drop, so the till must keep working.",
    context: [
      "I built PerkOS as my own software product for business operations. A till cannot assume an uninterrupted connection just because its database lives in the cloud.",
      "The offline sale queue lets work be captured when the connection drops. The harder part comes when the connection returns: the sales saved on the device must be matched to the main records without duplicates.",
    ],
    constraints: [
      "A connection can disappear during a sale, rather than conveniently before it.",
      "Stock changes and staff permissions need explicit rules at the data layer.",
      "A deployed product is not evidence of product-market fit or paying customers.",
    ],
    decisions: [
      {
        title: "Capture locally, then replay",
        choice:
          "I built an offline sale queue with replay on reconnect, rather than making every till action wait for the network.",
        alternative:
          "Require a successful online request before accepting any work.",
        tradeoff:
          "Queued work is not the same as a server-confirmed sale. Replays, interruptions, and reconciliation need attention; offline support does not mean every feature works without a connection.",
      },
      {
        title: "Express business rules in the database",
        choice:
          "I made stock movement go through a ledger and defined staff constraints such as preventing workers from increasing their own discount ceiling.",
        alternative: "Enforce these rules only in interface controls.",
        tradeoff:
          "Database-enforced rules require careful migrations, but a different client cannot simply bypass a disabled button.",
      },
      {
        title: "Put tests in front of the build",
        choice:
          "The build runs the Vitest suite before the application build. A failing test stops that delivery path.",
        alternative: "Run tests as an optional developer step.",
        tradeoff:
          "The suite adds build time and maintenance. Its value depends on meaningful cases, not just a green count.",
      },
    ],
    outcomeTitle: "A live product, with adoption still to prove.",
    outcome:
      "I built and deployed PerkOS with offline queueing, stock rules, and automated tests. It is an independent product, not a client commission. I do not claim paying customers or commercial traction for it.",
    limitation:
      "Commercial validation is the next major test. I would pair a small operator pilot with improvements to money-screen accessibility and large exports before making broader reliability or adoption claims.",
  },
];
export const credentials = [
  [
    "Google IT Support Professional Certificate",
    "https://coursera.org/verify/professional-cert/FXMG07PLCDO8",
  ],
  [
    "IT Security: Defense Against the Digital Dark Arts",
    "https://coursera.org/verify/KMS6IPUVUY8O",
  ],
  [
    "System Administration & IT Infrastructure Services",
    "https://coursera.org/verify/MBQ0OUWN6VAG",
  ],
  [
    "The Bits and Bytes of Computer Networking",
    "https://coursera.org/verify/MDUFSCZPF722",
  ],
  ["Operating Systems and You", "https://coursera.org/verify/UJPYIS00FPAP"],
  [
    "Technical Support Fundamentals",
    "https://coursera.org/verify/LJ04O7F4EOIF",
  ],
];

export const stats = [
  [20, "+", "Live builds shipped"],
  [3, "", "Systems taking live payments"],
  [480, "+", "Database migrations shipped"],
  [30, "+", "Product films produced"],
];
export const marquee = [
  "Business websites",
  "Online stores",
  "POS & stock systems",
  "Bookings & deposits",
  "Paystack",
  "Mobile Money",
  "AI chatbots",
  "Launch films",
  "Next.js",
  "React",
  "Supabase",
  "TypeScript",
];
export const heroSlugs = ["besia", "trendy-norms", "perkos", "meridian", "tcs", "cindys", "zira", "poli443"];
const build = (slug, name, sector, url, status, blurb) => ({ slug, name, sector, url, status, blurb });
export const moreSystems = [
  build("meridian", "MERIDIAN Trading Desk", "Forex · Trading desk OS", "https://meridian-trading-desk.vercel.app", "Live product · demo data",
    "A desk for traders, mentors and signal providers: journal, analytics, playbook, risk suite, signals desk and calendar, with equity curves from a hand-built charting engine."),
  build("poli443", "POLI 443", "Education · Paid course platform", "https://poli443.perkos.app", "Live product",
    "An interactive statistics course for University of Ghana students, sold per seat. Encrypted lessons, signed tokens, a device-licence model and rate limits tuned for campus Wi-Fi."),
  build("torq", "TORQ · Damian Autoparts", "Auto parts · Offline-first stock & sales", "https://annorfrancis.github.io/torq-system/", "Sample build",
    "A 15-screen system for an importer with shops in Accra and Kumasi: till, sales book, stock, debtors, containers and landed cost, with credit limits enforced at the sale."),
  build("xclusive-bms", "Xclusivehairdeals · Business Manager", "Beauty · Site + integrated back office", "https://annorfrancis.github.io/xclusivehairdeals-bms/", "Sample build",
    "The website and a PIN-protected Business Manager on one database: a booking on the site appears on the dashboard instantly, and a shop order takes stock down."),
];
export const moreSites = [
  build("cindys", "Cindy's Cake House", "Food · Pâtisserie with owner studio", "https://annorfrancis.github.io/cindys-cake-house/", "Sample build",
    "134 priced creations and a Cake Atelier that redraws and reprices a custom cake as you configure it, against a calendar gated by real kitchen capacity."),
  build("veloura", "Veloura Luxe Hub", "Fashion · Boutique storefront + back office", "https://annorfrancis.github.io/veloura-luxe-hub/", "Sample build",
    "A 307-product boutique with a lookbook and journal, plus a 13-part back office that stays in sync with the shop."),
  build("kira", "Kira Forex", "Forex · Academy + HQ", "https://annorfrancis.github.io/kiraforex/", "Sample build",
    "A 3D hero that renders real gold sessions as glass candles, session clocks, a globe of bootcamp cities, a student portal and the Kira HQ dashboard."),
  build("king-ofori", "King Ofori Real Estate", "Real estate · Diaspora buyers", "https://annorfrancis.github.io/king-ofori-real-estate/", "Sample build",
    "A premium property platform for Ghana's luxury market, with verified-title signals, build-progress visuals and a portal for buyers returning from abroad."),
];
export const films = [
  { id: "perkos-hook", title: "PerkOS social ad", kind: "8-second hook for YouTube and social", portrait: false },
  { id: "tcs-launch", title: "The Classic Sculpt launch film", kind: "A clip from the full 3:40 film", portrait: false },
  { id: "zira-teaser", title: "Zira Forex teaser", kind: "Vertical teaser for phones, 1:01", portrait: true },
];
export const pages = [
  {
    path: "/",
    title: "Perkins_Creatives | Websites and business systems by Francis Annor",
    description:
      "I build the software businesses run on: websites, back-office systems, and payment integrations. Based in Accra, working locally and internationally.",
    image: "home",
  },
  {
    path: "/work",
    title: "More work | Perkins_Creatives",
    description:
      "More systems, websites and product films by Perkins_Creatives. Every card opens the working build.",
    image: "home",
  },
  {
    path: "/work-with-me",
    title: "Work with me | Perkins_Creatives",
    description:
      "Websites, online stores, and connected business systems. See project ranges in GHS, the process, and how to discuss your project.",
    image: "home",
  },
  {
    path: "/engineering",
    title: "Engineering | Perkins_Creatives",
    description:
      "API contracts, data rules, payment workflows, and concurrency: engineering decisions from my client systems, team projects, and independent products.",
    image: "engineering",
  },
  ...projects.map((p) => ({
    path: `/work/${p.slug}`,
    title: `${p.name} case study | Perkins_Creatives`,
    description: p.summary,
    image: p.slug,
  })),
  {
    path: "/notes/lease-based-push",
    title: "When two workers reach for one job | Perkins_Creatives",
    description:
      "A design note on lease ownership, retries, and why protecting database state does not guarantee exactly-once notification delivery.",
    image: "engineering",
  },
  {
    path: "/404",
    title: "Page not found | Perkins_Creatives",
    description:
      "Find your way back to the work of Francis Annor, software developer and systems builder.",
    image: "home",
  },
];
