import { motion, useReducedMotion } from 'framer-motion'
import { Code, Grid, ShoppingBag, Cpu, Video } from 'react-feather'

export default function Services() {
  const reduce = useReducedMotion()

  const services = [
    {
      icon: Code,
      title: 'Business Websites',
      description:
        'A site that works on a cheap Android phone, loads on slow data, and shows up when someone Googles your trade.',
      features: ['Mobile-first & fast', 'SEO and Google visibility', 'An admin panel you control'],
    },
    {
      icon: Grid,
      title: 'Business Systems',
      tag: 'Flagship',
      description:
        'Till, stock, debtors, bookings and staff logins on one screen — the software that actually runs the shop.',
      features: ['POS & inventory', 'Credit and debtors ledger', 'Keeps working offline'],
      featured: true,
    },
    {
      icon: ShoppingBag,
      title: 'Online Stores',
      description:
        'Sell online with Mobile Money and card checkout, order tracking by phone number, and one ledger for web and counter sales.',
      features: ['MoMo & Paystack checkout', 'Customer order tracking', 'Web and counter in one ledger'],
    },
    {
      icon: Cpu,
      title: 'AI Automation & Chatbots',
      tag: 'In demand',
      description:
        'WhatsApp and website assistants that answer customers, take bookings, and hand over to you the moment it matters.',
      features: ['WhatsApp & web chatbots', 'Booking and lead capture', 'Workflow automation'],
      link: {
        href: '/ai-front-desk.html',
        text: 'See the interactive concept (simulated conversation, not a live bot)',
      },
    },
    {
      icon: Video,
      title: 'Launch Videos & Ads',
      description:
        'Product films built from your real screens, not stock footage — and re-rendered in minutes when your prices change.',
      features: ['Product demo films', 'Social & Meta ad cuts', 'Voiceover included'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reduce ? 0 : 0.07 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.45 } },
  }

  return (
    <section id="services" className="relative py-14 sm:py-20 md:py-24 bg-dark overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-10 sm:mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.7 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow">What I build</span>
          <h2 className="section-title">
            Websites, and the <span className="gradient-text">Systems That Run Them</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            Five things. Each one is on this page as a working example you can open.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map((service) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                className={`relative rounded-xl p-5 sm:p-6 border transition-all duration-300 bg-dark-card/80 ${
                  service.featured
                    ? 'border-primary/60 shadow-[0_10px_40px_rgba(201,162,75,0.15)]'
                    : 'border-border-dark hover:border-primary/50'
                }`}
                variants={itemVariants}
                whileHover={reduce ? undefined : { y: -6 }}
              >
                {service.tag && (
                  <span className="absolute top-5 right-5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold-gradient text-dark">
                    {service.tag}
                  </span>
                )}

                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4 bg-gold-gradient shadow-md">
                  <Icon size={22} className="text-dark" />
                </div>

                <h3
                  className="text-lg sm:text-xl font-bold mb-2.5 pr-20 text-text-primary"
                  style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
                >
                  {service.title}
                </h3>
                <p className="text-text-secondary mb-4 leading-relaxed text-sm">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-text-secondary">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {service.link && (
                  <a
                    href={service.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-primary text-xs underline underline-offset-4 hover:text-primary-light transition-colors"
                  >
                    {service.link.text}
                  </a>
                )}
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="text-center mt-10 sm:mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: reduce ? 0 : 0.15 }}
          viewport={{ once: true }}
        >
          <p className="text-text-secondary text-sm mb-5 max-w-2xl mx-auto">
            Also available: brand and flyer design, CV and SOP writing, social media management, and IT support.
          </p>
          <a
            href="https://wa.me/233538713916"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            Ask on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
