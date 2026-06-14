import { motion } from 'framer-motion'
import { Code, PenTool, FileText, Video, Cpu, TrendingUp, Tool, ShoppingBag, BookOpen } from 'react-feather'

export default function Services() {
  const groups = [
    {
      key: 'project',
      label: 'A · Project work',
      tagline: 'One-off builds that win clients & grow your brand',
      services: [
        {
          icon: Code,
          title: 'Web Design & Development',
          tag: 'Flagship',
          description: 'Premium, fast, mobile-ready websites, web apps and e-commerce built with React, Next.js and Node.',
          features: ['Business Websites', 'Web Apps & E-commerce', 'Landing Pages', 'SEO-Optimised'],
        },
        {
          icon: PenTool,
          title: 'Creative Design & Branding',
          tag: 'Flagship',
          description: 'Flyers, brand identity kits, social graphics, business cards and ad creatives that make you look premium.',
          features: ['Flyers & Posters', 'Brand Identity Kits', 'Social Graphics', 'Business Cards'],
        },
        {
          icon: FileText,
          title: 'Academic & Professional Writing',
          description: 'Thesis, research papers, SOPs, personal statements and ATS-ready CVs — backed by a Philosophy & Political Science degree.',
          features: ['Thesis & Research', 'SOP / Statements', 'CV + Cover Letter', 'Admissions Support'],
        },
        {
          icon: Video,
          title: 'Video & Motion Design',
          description: 'Birthday, anniversary, wedding and business promo videos — emotional, shareable, and beautifully edited.',
          features: ['Celebration Videos', 'Wedding & Anniversary', 'Promo Clips', 'Social Reels'],
        },
      ],
    },
    {
      key: 'recurring',
      label: 'B · Recurring partnerships',
      tagline: 'Monthly services that keep clients (and income) coming back',
      services: [
        {
          icon: Cpu,
          title: 'AI Automation & Chatbots',
          tag: 'New · In demand',
          description: 'Custom AI assistants, WhatsApp & website chatbots and workflow automation that save businesses hours every week. Backed by AI Automation & Claude certifications.',
          features: ['AI Assistants', 'WhatsApp Chatbots', 'Workflow Automation', 'AI Content Systems'],
          featured: true,
        },
        {
          icon: TrendingUp,
          title: 'Social Media Management & Marketing',
          tag: 'New',
          description: 'Done-for-you content, branded posts, scheduling and Meta/Instagram ad campaigns — managed monthly so you stay visible.',
          features: ['Content & Posting', 'Branded Templates', 'Meta / IG Ads', 'Community Management'],
        },
        {
          icon: Tool,
          title: 'Tech & IT Support',
          description: 'Windows installs, laptop & desktop maintenance, networking, remote support and small-business IT retainers.',
          features: ['Windows & Setup', 'Repairs & Upgrades', 'Remote Support', 'IT Retainers'],
        },
      ],
    },
    {
      key: 'passive',
      label: 'C · Passive & scalable',
      tagline: 'Build once, sell forever',
      services: [
        {
          icon: ShoppingBag,
          title: 'Digital Products & Templates',
          tag: 'New',
          description: 'CV & SOP templates, Notion study/business planners and design packs — sold on repeat to buyers worldwide.',
          features: ['CV / SOP Templates', 'Notion Planners', 'Design Packs', 'Sells on Repeat'],
        },
        {
          icon: BookOpen,
          title: 'Tutoring & Education',
          description: 'University tutoring, exam prep and research-methodology coaching in Philosophy, Political Science, Sociology and Psychology.',
          features: ['1-on-1 Tutoring', 'Exam Prep', 'Research Coaching', 'Online Sessions'],
        },
      ],
    },
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
    <section id="services" className="relative py-20 md:py-32 bg-dark overflow-hidden">
      <div
        className="absolute inset-0 opacity-20"
        style={{ backgroundImage: "url('/images/bc8.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/92 to-dark" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow">Nine streams · one standard</span>
          <h2 className="section-title">
            Everything Your Business Needs, <span className="gradient-text">Under One Roof</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            A full creative &amp; digital department in one place — grouped by how each one works for you.
          </p>
        </motion.div>

        <div className="space-y-16">
          {groups.map((group) => (
            <div key={group.key}>
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <div className="text-primary font-semibold text-xs uppercase tracking-[0.28em]">{group.label}</div>
                  <div className="text-text-secondary text-sm mt-1">{group.tagline}</div>
                </div>
                <div className="flex-grow h-px bg-gradient-to-r from-primary/40 to-transparent" />
              </motion.div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
              >
                {group.services.map((service, idx) => {
                  const Icon = service.icon
                  return (
                    <motion.div
                      key={idx}
                      className={`relative rounded-xl p-6 border transition-all duration-300 group bg-dark-card/80 backdrop-blur-sm ${
                        service.featured
                          ? 'border-primary/60 shadow-[0_10px_40px_rgba(201,162,75,0.18)]'
                          : 'border-border-dark hover:border-primary/50'
                      }`}
                      variants={itemVariants}
                      whileHover={{ y: -8 }}
                      aria-label={`${service.title} service`}
                    >
                      {service.tag && (
                        <span className="absolute top-5 right-5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gold-gradient text-dark">
                          {service.tag}
                        </span>
                      )}
                      <motion.div
                        className="inline-flex items-center justify-center w-14 h-14 rounded-lg mb-5 bg-gold-gradient shadow-md"
                        whileHover={{ scale: 1.12, rotate: 6 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Icon size={24} className="text-dark" />
                      </motion.div>

                      <h3 className="text-xl font-bold mb-3 pr-16 text-text-primary" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                        {service.title}
                      </h3>
                      <p className="text-text-secondary mb-5 leading-relaxed text-sm">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, fidx) => (
                          <li key={fidx} className="flex items-center gap-2 text-sm text-text-secondary">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <p className="text-text-secondary mb-6">Not sure which you need? Tell me your goal and I&apos;ll point you to the right one.</p>
          <a href="https://wa.me/233538713916" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
            Book a free consultation
          </a>
        </motion.div>
      </div>
    </section>
  )
}
