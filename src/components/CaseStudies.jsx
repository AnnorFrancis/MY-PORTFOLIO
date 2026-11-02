import { motion } from 'framer-motion'
import { ExternalLink, GitHub, ArrowRight } from 'react-feather'

export default function CaseStudies() {
  const projects = [
    {
      id: 1,
      title: 'TORQ · Damian Autoparts',
      category: 'Business System',
      image: '/images/projects/torq-system.jpg',
      description:
        'Runs two auto-parts shops in Accra and Kumasi — till, stock, debtors and true import costs in one place.',
      metric: '15 working screens · Ghana GRA tax stack built in',
      stack: ['React', 'TypeScript', 'Offline-First'],
      url: 'https://annorfrancis.github.io/torq-system/',
      github: 'https://github.com/AnnorFrancis/torq-system',
      featured: true,
    },
    {
      id: 2,
      title: 'Letteropedia',
      category: 'Web App + CMS',
      image: '/images/projects/letteropedia.jpg',
      description:
        'A Ghanaian academic-writing service now takes and gets paid for orders online, and the owner edits every page himself.',
      metric: 'Live on its own domain · MoMo and Paystack · 30 priced services',
      stack: ['Next.js', 'Sanity CMS', 'Paystack'],
      url: 'https://letteropedia.online',
    },
    {
      id: 3,
      title: "Yvonne's Collections",
      category: 'E-Commerce + POS',
      image: '/images/projects/yvonnes-collections.jpg',
      description:
        'An Accra shop sells online and over the counter, and both land in one ledger she checks on her phone.',
      metric: 'MoMo and card · order tracking by phone number · POS till',
      stack: ['React', 'Recharts', 'MTN MoMo'],
      url: 'https://annorfrancis.github.io/yvonnes-collections/',
      github: 'https://github.com/AnnorFrancis/yvonnes-collections',
    },
    {
      id: 4,
      title: 'META Men',
      category: 'E-Commerce',
      image: '/images/projects/meta-men.jpg',
      description:
        'Menswear storefront for an Accra atelier, with a sized cart and Paystack checkout for card, bank and mobile money.',
      metric: 'Five categories · eight-section revenue dashboard',
      stack: ['React', 'Paystack', 'Recharts'],
      url: 'https://annorfrancis.github.io/meta-men/',
      github: 'https://github.com/AnnorFrancis/meta-men',
    },
    {
      id: 5,
      title: 'Karil Hair & Beauty Lounge',
      category: 'Website + Admin',
      image: '/images/projects/karil-beauty-lounge.jpg',
      description:
        'Clients see the price before they book; staff run walk-ins, payments and reports from the same screen.',
      metric: "7 admin screens · shot with the salon's own photography",
      stack: ['JavaScript', 'GSAP', 'Admin Suite'],
      url: 'https://annorfrancis.github.io/karil-beauty-lounge/',
      github: 'https://github.com/AnnorFrancis/karil-beauty-lounge',
    },
    {
      id: 6,
      title: 'Georat Architectural & Construction',
      category: 'Website + Admin',
      image: '/images/projects/georat-construction.jpg',
      description:
        'Design-and-build firm with a quote estimator and a back office for projects, materials and revenue.',
      metric: '5 admin screens · year-over-year revenue analytics',
      stack: ['JavaScript', 'GSAP', 'Admin Suite'],
      url: 'https://annorfrancis.github.io/georat-construction/',
      github: 'https://github.com/AnnorFrancis/georat-construction',
    },
  ]

  const perkosPoints = [
    '44,000 lines · 186 migrations · 442 passing tests',
    'Keeps selling when the internet drops',
    'Retail · Salon · Restaurant · Field service',
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="work" className="relative py-14 sm:py-20 md:py-24 bg-dark overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow">Shipped &amp; live</span>
          <h2 className="section-title">
            Real Businesses, <span className="gradient-text">Really Running</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Every project below is live right now and serving a real business. Click any one to open it.
          </p>
        </motion.div>

        {/* Flagship product spotlight */}
        <motion.a
          href="https://perkos.app"
          target="_blank"
          rel="noopener noreferrer"
          className="group grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center rounded-2xl border border-primary/40 bg-dark-card/80 p-5 sm:p-7 lg:p-9 mb-10 sm:mb-14 hover:border-primary/70 transition-colors"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="order-2 lg:order-1">
            <span className="eyebrow !mb-2">My own software product</span>
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-text-primary"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              PerkOS — <span className="gradient-text">the operating system for African businesses</span>
            </h3>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-5">
              A subscription SaaS I designed, built and sell. One login runs a whole business — POS till, stock,
              credit ledger, invoices, staff permissions and a public storefront — and the till keeps working when
              the network doesn&apos;t.
            </p>
            <ul className="space-y-2 mb-6">
              {perkosPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <span className="btn-primary inline-flex items-center gap-2">
                Visit perkos.app
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['Next.js', 'Supabase', 'Paystack', 'PWA'].map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary-light"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative rounded-xl overflow-hidden border border-border-dark">
            <img
              src="/images/projects/perkos.jpg"
              alt="Screenshot of the PerkOS business management platform"
              loading="lazy"
              decoding="async"
              width="800"
              height="500"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
          </div>
        </motion.a>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className={`group relative rounded-xl overflow-hidden border bg-dark-card transition-all duration-300 cursor-pointer ${
                project.featured
                  ? 'border-primary/50 shadow-lg shadow-primary/10'
                  : 'border-border-dark hover:border-primary/60'
              }`}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}
            >
              {project.featured && (
                <div className="absolute top-0 right-0 z-20 bg-gold-gradient text-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                  Flagship build
                </div>
              )}

              <div className="relative h-44 overflow-hidden bg-graphite">
                <img
                  src={project.image}
                  alt={`Screenshot of the ${project.title} website`}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="500"
                  className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark-card to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-dark/80 backdrop-blur-sm border border-primary/40 text-primary">
                  {project.category}
                </span>
                <div className="absolute top-3 right-3 flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 rounded-lg bg-dark/80 backdrop-blur-sm border border-border-dark flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/60 transition-colors"
                      aria-label={`View source code for ${project.title} on GitHub`}
                    >
                      <GitHub size={14} />
                    </a>
                  )}
                  <div className="w-8 h-8 rounded-lg bg-dark/80 backdrop-blur-sm border border-border-dark flex items-center justify-center text-text-secondary group-hover:text-primary group-hover:border-primary/60 transition-colors">
                    <ExternalLink size={14} />
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <h3
                  className="text-base sm:text-lg font-bold mb-1.5 text-text-primary group-hover:text-primary transition-colors"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {project.title}
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-2 line-clamp-3">
                  {project.description}
                </p>
                <p className="text-[11px] sm:text-xs text-primary-light/90 font-medium mb-3">{project.metric}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary-light"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/AnnorFrancis"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <GitHub size={18} /> See more work on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
