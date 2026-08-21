import { motion, useReducedMotion } from 'framer-motion'
import { Award, Clock, RefreshCw, DollarSign } from 'react-feather'

export default function Proof() {
  const reduce = useReducedMotion()

  const capabilities = [
    { group: 'Front-end', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
    { group: 'Back-end & data', items: ['Node.js', 'Supabase / Postgres', 'Python', 'REST APIs'] },
    { group: 'Payments', items: ['Paystack', 'MTN Mobile Money', 'Card checkout'] },
    { group: 'AI & automation', items: ['LLM agents & tool-calling', 'WhatsApp / web chatbots', 'Workflow automation'] },
    { group: 'Shipping', items: ['Git & GitHub', 'Vercel', 'Offline-first PWAs', 'Automated testing'] },
    { group: 'Business systems', items: ['POS & inventory', 'CRM & bookings', 'Reporting & dashboards'] },
  ]

  const certifications = [
    'Google IT Support Professional',
    'Google IT Security',
    'Meta React Developer',
    'Google Project Management',
    'AWS Cloud Practitioner',
    'AI Automation (Coursera)',
    'Claude & Claude Code',
    'Customer Service Excellence',
  ]

  const guarantees = [
    { icon: DollarSign, title: 'Fixed pricing', text: 'You know the cost before we start.' },
    { icon: Clock, title: 'On-time delivery', text: 'Agreed timelines, honoured.' },
    { icon: RefreshCw, title: 'Revisions included', text: 'We refine until it is right.' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: reduce ? 0 : 0.06 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 16 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.45 } },
  }

  return (
    <section id="about" className="relative py-14 sm:py-20 md:py-24 bg-dark overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-24 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 -right-24 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] gap-8 lg:gap-12 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.7 }}
          viewport={{ once: true }}
        >
          <div className="relative h-[300px] sm:h-[380px] lg:h-[440px] rounded-2xl overflow-hidden border border-border-dark order-2 lg:order-1">
            <img
              src="/images/my-image8.jpg"
              alt="Francis Annor, web developer and founder of Perkins Creative"
              loading="lazy"
              decoding="async"
              width="500"
              height="500"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />
          </div>

          <div className="order-1 lg:order-2">
            <span className="eyebrow">The person behind the work</span>
            <h2 className="section-title !mb-5">
              Francis Annor, <span className="gradient-text">Accra</span>
            </h2>
            <div className="space-y-4 text-text-secondary text-base sm:text-lg leading-relaxed !mb-6">
              <p>
                I build the website <em className="text-text-primary not-italic font-semibold">and the system behind it</em> —
                tills that take Mobile Money, stock that counts itself, bookings that price themselves. Everything in
                the section above is live and serving a real business today.
              </p>
              <p>
                I also ship my own subscription product, <span className="text-primary font-semibold">PerkOS</span>, and
                work as the second developer on <span className="text-primary font-semibold">Scholaris</span>, a live
                multi-tenant school platform — where my job is release QA and proving tenant isolation on a database
                holding children&apos;s records and fee ledgers.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {guarantees.map((g, idx) => {
                const Icon = g.icon
                return (
                  <div key={idx} className="flex items-center gap-2.5">
                    <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex-shrink-0">
                      <Icon size={16} className="text-primary" />
                    </span>
                    <span className="text-sm">
                      <span className="block font-semibold text-text-primary leading-tight">{g.title}</span>
                      <span className="block text-text-secondary text-xs leading-tight">{g.text}</span>
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Capabilities */}
        <motion.div
          className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {capabilities.map((cap) => (
            <motion.div
              key={cap.group}
              className="rounded-xl border border-border-dark bg-dark-card/70 p-4 sm:p-5"
              variants={itemVariants}
            >
              <div className="text-primary font-semibold text-[11px] uppercase tracking-[0.18em] mb-3">{cap.group}</div>
              <div className="flex flex-wrap gap-1.5">
                {cap.items.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] px-2 py-1 rounded-md bg-primary/5 border border-primary/20 text-text-secondary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          className="mt-10 rounded-2xl border border-border-dark bg-dark-card/50 p-6 sm:p-8"
          initial={{ opacity: 0, y: reduce ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2.5 mb-5 justify-center">
            <Award size={18} className="text-primary" />
            <h3
              className="text-lg sm:text-xl font-bold text-text-primary"
              style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
            >
              Certifications
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="px-3 py-1.5 rounded-full bg-primary/5 border border-primary/25 text-xs sm:text-sm text-primary-light"
              >
                {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
