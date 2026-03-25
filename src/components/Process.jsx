import { motion } from 'framer-motion'
import { CheckCircle } from 'react-feather'

export default function Process() {
  const steps = [
    {
      title: 'Discovery & Strategy',
      description: 'We start by understanding your business, goals, and target audience. I conduct thorough research to create a strategy.',
      timeline: 'Week 1-2',
      details: [
        'Initial consultation',
        'Competitor analysis',
        'User research',
        'Strategy document',
      ],
    },
    {
      title: 'Design & Wireframes',
      description: 'Creating beautiful, user-friendly designs that align with your brand and vision. Starting from low-fidelity wireframes.',
      timeline: 'Week 2-3',
      details: [
        'Wireframing',
        'Design mockups',
        'Interactive prototypes',
        'Design approval',
      ],
    },
    {
      title: 'Development & Build',
      description: 'Time to bring designs to life. Using modern technologies and best practices, I build your website or application.',
      timeline: 'Week 4-8',
      details: [
        'Frontend development',
        'Backend integration',
        'Database setup',
        'API integration',
      ],
    },
    {
      title: 'Testing & Optimization',
      description: 'Rigorous testing across browsers and devices. Performance optimization for speed, SEO, and user experience.',
      timeline: 'Week 8-9',
      details: [
        'Quality assurance',
        'Performance optimization',
        'SEO tuning',
        'Security audit',
      ],
    },
    {
      title: 'Launch & Support',
      description: 'Your site goes live! I provide ongoing support, monitoring, and updates to ensure continued success.',
      timeline: 'Week 10+',
      details: [
        'Site deployment',
        'Analytics setup',
        'Monitoring',
        'Ongoing support',
      ],
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  }

  return (
    <section id="process" className="py-20 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            My <span className="gradient-text">Process</span>
          </h2>
          <p className="section-subtitle">
            A proven methodology to deliver exceptional results, every time
          </p>
        </motion.div>

        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {/* Step Number & Timeline */}
              <motion.div
                className="flex flex-col items-start md:items-center"
                whileHover={{ scale: 1.1 }}
              >
                <motion.div
                  className="relative"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary rounded-full flex items-center justify-center mb-4">
                    <motion.div
                      className="text-2xl font-bold text-primary font-syne"
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    >
                      {idx + 1}
                    </motion.div>
                  </div>
                </motion.div>
                <div className="text-center md:text-center">
                  <div className="text-primary font-semibold text-sm">{step.timeline}</div>
                  {idx < steps.length - 1 && (
                    <motion.div
                      className="w-1 h-20 bg-gradient-to-b from-primary to-primary/20 mx-auto my-2"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ delay: 0.2 + idx * 0.15 }}
                      viewport={{ once: true }}
                    />
                  )}
                </div>
              </motion.div>

              {/* Content */}
              <motion.div className="md:col-span-2">
                <motion.h3
                  className="text-2xl font-bold font-syne mb-3"
                  whileHover={{ color: '#88CC00' }}
                >
                  {step.title}
                </motion.h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  {step.description}
                </p>

                {/* Details */}
                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-3"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {step.details.map((detail, didx) => (
                    <motion.div
                      key={didx}
                      className="flex items-center gap-2 text-sm text-text-secondary bg-primary/5 px-3 py-2 rounded-lg border border-primary/20"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: didx * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ borderColor: '#88CC00', scale: 1.05 }}
                    >
                      <CheckCircle size={14} className="text-primary flex-shrink-0" />
                      {detail}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Final CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-text-secondary mb-6">
            Ready to start? The typical project timeline is <span className="text-primary font-semibold">4-10 weeks</span> depending on scope and complexity.
          </p>
          <motion.a
            href="#contact"
            className="btn-primary inline-flex"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule Your Discovery Call
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
