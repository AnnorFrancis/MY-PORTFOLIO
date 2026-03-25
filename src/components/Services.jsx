import { motion } from 'framer-motion'
import { Code, PenTool, Zap, Target, Gift, Headphones } from 'react-feather'

export default function Services() {
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Modern, fast, scalable websites built with React, Next.js, and Node.js. Full-stack solutions for any project.',
      features: ['React & Next.js', 'Node.js Backend', 'Responsive Design', 'Database Integration'],
    },
    {
      icon: PenTool,
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces designed with users in mind. From wireframes to polished, production-ready designs.',
      features: ['User Research', 'Wireframing', 'Visual Design', 'Prototyping'],
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Lightning-fast websites that rank higher and convert better. Optimized for core web vitals and SEO.',
      features: ['Core Web Vitals', 'Code Splitting', 'Image Optimization', 'Caching'],
    },
    {
      icon: Target,
      title: 'SEO & Marketing Sites',
      description: 'Conversion-focused websites built to rank on Google and turn visitors into customers.',
      features: ['Keyword Research', 'On-Page SEO', 'Schema Markup', 'Conversion Optimization'],
    },
    {
      icon: Gift,
      title: 'E-commerce Solutions',
      description: 'Complete e-commerce platforms with payment integration, inventory management, and analytics.',
      features: ['Product Catalog', 'Payment Integration', 'Cart & Checkout', 'Analytics'],
    },
    {
      icon: Headphones,
      title: 'Support & Maintenance',
      description: 'Ongoing support, updates, and improvements to keep your site running smoothly and secure.',
      features: ['Bug Fixes', 'Security Updates', 'Feature Additions', 'Performance Monitoring'],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="services" className="py-20 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            Services I <span className="gradient-text">Provide</span>
          </h2>
          <p className="section-subtitle">
            Comprehensive solutions for all your web design and development needs
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, idx) => {
            const Icon = service.icon
            return (
              <motion.div
                key={idx}
                className="card group hover:border-primary/50"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 border border-primary/30 rounded-lg mb-6"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Icon size={24} className="text-primary" />
                </motion.div>

                <h3 className="text-2xl font-bold font-syne mb-3">
                  {service.title}
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, fidx) => (
                    <motion.li
                      key={fidx}
                      className="flex items-center gap-2 text-sm text-text-secondary"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: fidx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Process Overview */}
        <motion.div
          className="mt-20 md:mt-32 p-8 md:p-12 rounded-2xl border border-border-dark bg-gradient-to-r from-primary/5 to-transparent"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold font-syne mb-6">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { num: 1, title: 'Discovery', desc: 'Understand your goals and vision' },
              { num: 2, title: 'Strategy', desc: 'Create a comprehensive plan' },
              { num: 3, title: 'Build', desc: 'Develop and design your solution' },
              { num: 4, title: 'Launch', desc: 'Deploy and optimize for success' },
            ].map((step) => (
              <motion.div
                key={step.num}
                className="relative"
                whileHover={{ y: -5 }}
              >
                <div className="absolute top-0 left-6 w-8 h-8 bg-primary rounded-full flex items-center justify-center font-bold text-dark text-sm">
                  {step.num}
                </div>
                <div className="pl-20">
                  <h4 className="font-bold mb-1">{step.title}</h4>
                  <p className="text-sm text-text-secondary">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
