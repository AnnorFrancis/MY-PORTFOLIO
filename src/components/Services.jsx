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
    hidden: { opacity: 0, y: 30 },
    visible: i => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
  }

  return (
    <section id="services" className="py-20 md:py-32 relative overflow-hidden" style={{
      background: `linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 248, 248, 0.1) 100%), url('/images/bc8.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundBlendMode: 'overlay',
      filter: 'blur(0.5px)'
    }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-red-50/10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-black font-syne mb-4" style={{ color: '#F8F9FA' }}>
            Services I <span style={{
              background: 'linear-gradient(45deg, #88CC00, #A8E011, #88CC00)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Provide</span>
          </h2>
          <p className="text-lg mb-12 font-semibold" style={{ color: '#A6ADBE' }}>
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
                custom={idx}
                className="bg-dark-card/80 backdrop-blur-[18px] rounded-xl p-6 border-2 border-red-500/60 hover:border-red-400 shadow-[0_8px_30px_rgba(220,20,60,0.25)] hover:shadow-[0_12px_40px_rgba(220,20,60,0.35)] transition-all duration-300 group"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -8, scale: 1.02 }}
                style={{ boxShadow: '0 10px 30px rgba(220, 20, 60, 0.15)' }}
                aria-label={`${service.title} service card`}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-lg mb-6 shadow-md"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Icon size={24} className="text-white" />
                </motion.div>

                <h3 className="text-2xl font-black font-syne mb-3" style={{ color: '#F8F9FA' }}>
                  {service.title}
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed font-semibold">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.features.map((feature, fidx) => (
                    <motion.li
                      key={fidx}
                      className="flex items-center gap-2 text-sm text-text-secondary font-medium"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: fidx * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
