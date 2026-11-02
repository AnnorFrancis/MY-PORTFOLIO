export const projects = [
  {
    slug: "trendy-norms",
    name: "Trendy Norms Hub",
    kind: "Launched client system",
    role: "Full-stack developer",
    url: "https://trendynormshub.com",
    stack: "Next.js · TypeScript · Supabase · Paystack",
    status: "Live retail system",
    title: "A storefront is the beginning. Operations are the real test.",
    summary:
      "An online storefront and retail back office, connecting sales, stock, payments, and the people running the shop.",
    visualLabel: "Retail / Connected commerce",
    wordmark: "Trendy Norms",
    visualSubtitle: "From storefront to stockroom.",
    flow: ["Browse & buy", "Record the sale", "Keep stock aligned"],
    contextTitle: "The work continues after checkout.",
    context: [
      "A duplicate cash sale was recorded against the wrong credit account. I used the return workflow to reverse it while correcting stock and the cash drawer. That recovery path is as important as the original checkout. I have left out transaction identifiers and customer details.",
      "I built a retail system with a public storefront and a staff back office in one application. The customer journey matters, but so does what happens when staff need to correct a sale or reconcile the day.",
      "The engineering problem is consistency: a sale touches money, stock, and customer records. Those cannot become separate versions of the truth.",
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
    title: "A salon website. And the working studio behind it.",
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
      "The system launched in October 2026 with live payments, the public experience, and Studio Manager. The owner can change website content herself. Subsequent updates came from actual studio needs, not speculative features.",
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
    title: "A till should not stop at the first dropped connection.",
    summary:
      "My own business software product, exploring offline sale queues, stock controls, and the rules that keep a till trustworthy.",
    visualLabel: "Own product / Business software",
    wordmark: "PerkOS",
    visualSubtitle: "Keep the work moving.",
    flow: ["Capture the sale", "Queue offline", "Replay on reconnect"],
    contextTitle: "An unreliable network is a product requirement.",
    context: [
      "I built PerkOS as my own software product for business operations. A till cannot assume an uninterrupted connection just because its database lives in the cloud.",
      "The offline sale queue lets work be captured when the connection drops. Reconnecting introduces the harder problem: local intent must be reconciled with the authoritative records.",
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
export const pages = [
  {
    path: "/",
    title: "Francis Annor — Software Developer & Systems Builder",
    description:
      "I build the software businesses run on: websites, back-office systems, and payment integrations. Based in Accra, working locally and internationally.",
    image: "home",
  },
  {
    path: "/work-with-me",
    title: "Work with me — Francis Annor",
    description:
      "Websites, online stores, and connected business systems. See project ranges in GHS, the process, and how to discuss your project.",
    image: "home",
  },
  {
    path: "/engineering",
    title: "Engineering — Francis Annor",
    description:
      "API contracts, data rules, payment workflows, and concurrency: engineering decisions from my client systems, team projects, and independent products.",
    image: "engineering",
  },
  ...projects.map((p) => ({
    path: `/work/${p.slug}`,
    title: `${p.name} — A case study by Francis Annor`,
    description: p.summary,
    image: p.slug,
  })),
  {
    path: "/notes/lease-based-push",
    title: "When two workers reach for one job — Francis Annor",
    description:
      "A design note on lease ownership, retries, and why protecting database state does not guarantee exactly-once notification delivery.",
    image: "engineering",
  },
  {
    path: "/404",
    title: "Page not found — Francis Annor",
    description:
      "Find your way back to the work of Francis Annor, software developer and systems builder.",
    image: "home",
  },
];
