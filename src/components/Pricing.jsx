import { motion } from 'framer-motion'
import { Check, X } from 'react-feather'

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '₵2,000 — ₵3,500',
      duration: 'Perfect for small projects',
      description: 'Essential web presence for growing businesses',
      features: [
        { text: '4 Pages', included: true },
        { text: 'Responsive Design', included: true },
        { text: 'Mobile Optimized', included: true },
        { text: 'Basic SEO', included: true },
        { text: '1 Month Support', included: true },
        { text: 'CMS Integration', included: false },
        { text: 'E-commerce', included: false },
        { text: 'Advanced Analytics', included: false },
      ],
      timeline: '1-2 weeks',
      cta: 'Get Started',
      badge: null,
    },
    {
      name: 'Business',
      price: '₵5,000 — ₵8,000',
      duration: 'Most popular choice',
      description: 'Full-featured website with custom design',
      features: [
        { text: '10 Pages', included: true },
        { text: 'Responsive Design', included: true },
        { text: 'Mobile Optimized', included: true },
        { text: 'Full SEO', included: true },
        { text: '3 Months Support', included: true },
        { text: 'CMS Integration', included: true },
        { text: 'Advanced Analytics', included: true },
        { text: 'Form Submissions', included: true },
      ],
      timeline: '3-4 weeks',
      cta: 'Get Started',
      badge: 'Most Popular',
    },
    {
      name: 'Premium',
      price: '₵10,000 — ₵15,000',
      duration: 'For ambitious projects',
      description: 'Unlimited possibilities with custom web app',
      features: [
        { text: 'Unlimited Pages', included: true },
        { text: 'Responsive Design', included: true },
        { text: 'Mobile Optimized', included: true },
        { text: 'Advanced SEO', included: true },
        { text: '6 Months Support', included: true },
        { text: 'E-commerce Integration', included: true },
        { text: 'Custom Web App', included: true },
        { text: 'Advanced Analytics & Reporting', included: true },
      ],
      timeline: '6-10 weeks',
      cta: 'Get Started',
      badge: null,
    },
  ]

  const additionalServices = [
    { name: 'AI Chatbot & Automation', price: '₵1,500 — ₵6,000' },
    { name: 'Social Media Management', price: '₵600 — ₵2,500/mo' },
    { name: 'Brand & Flyer Design', price: '₵80 — ₵600' },
    { name: 'CV / SOP Writing', price: '₵150 — ₵400' },
    { name: 'Landing Page', price: '₵1,500 — ₵4,000' },
    { name: 'Website Care Plan', price: '₵300 — ₵1,200/mo' },
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
    <section id="pricing" className="py-20 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="section-subtitle">
            Flexible plans for projects of any size. All prices in GHS (Ghanaian Cedis)
          </p>
        </motion.div>

        {/* Main Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              className={`relative rounded-2xl overflow-hidden transition-all ${
                plan.badge
                  ? 'border-2 border-primary scale-105 md:scale-110 shadow-2xl shadow-primary/20'
                  : 'border border-border-dark card'
              }`}
              variants={itemVariants}
              whileHover={{ y: -8, scale: plan.badge ? 1.08 : 1.03 }}
            >
              {/* Badge */}
              {plan.badge && (
                <motion.div
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-dark px-4 py-1 rounded-full font-semibold text-sm"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {plan.badge}
                </motion.div>
              )}

              <div className="p-8 flex flex-col h-full">
                {/* Header */}
                <div className="mb-8 pt-4">
                  <h3 className="text-2xl font-bold font-syne mb-2">{plan.name}</h3>
                  <p className="text-text-secondary text-sm mb-4">{plan.duration}</p>
                  <motion.div
                    className="text-4xl font-bold text-primary mb-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    {plan.price}
                  </motion.div>
                  <p className="text-text-tertiary text-sm mb-6">{plan.description}</p>
                  <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs text-primary font-medium">
                    {plan.timeline} turnaround
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-3 flex-grow border-t border-border-dark pt-8">
                  {plan.features.map((feature, fidx) => (
                    <motion.div
                      key={fidx}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: fidx * 0.05 }}
                      viewport={{ once: true }}
                    >
                      {feature.included ? (
                        <Check size={18} className="text-primary flex-shrink-0" />
                      ) : (
                        <X size={18} className="text-text-tertiary flex-shrink-0 opacity-30" />
                      )}
                      <span
                        className={
                          feature.included ? 'text-text-secondary' : 'text-text-tertiary opacity-50'
                        }
                      >
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <motion.button
                  className={`w-full mt-8 py-3 rounded-lg font-semibold transition-all ${
                    plan.badge
                      ? 'btn-primary'
                      : 'border border-border-dark text-text-secondary hover:border-primary hover:text-primary'
                  }`}
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(201, 162, 75, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  {plan.cta}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Services */}
        <motion.div
          className="bg-gradient-to-r from-primary/5 to-transparent border border-border-dark rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold font-syne mb-8">Additional Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-center text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-lg font-semibold mb-2">{service.name}</div>
                <div className="text-2xl text-primary font-bold">{service.price}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ/Note */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-text-secondary mb-6">
            All packages include responsive design, browser testing, and deployment. Custom quotes available for unique requirements.
          </p>
          <motion.a
            href="https://wa.me/233538713916"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary hover:text-primary font-semibold"
            whileHover={{ x: 5 }}
          >
            Need a custom quote? Chat with me on WhatsApp →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
