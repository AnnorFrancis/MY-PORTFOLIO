import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'react-feather'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Web3Forms delivers submissions to your email inbox. This is a public key.
  const WEB3FORMS_KEY = '54c0f086-6bde-4ea9-85f8-342de5e5bc70'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    const { name, email, phone, projectType, message } = formData
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'New enquiry from the Perkins website',
          from_name: 'Perkins Website',
          name,
          email,
          phone,
          service: projectType,
          message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', phone: '', projectType: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
      setTimeout(() => setSubmitStatus(null), 6000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus(null), 6000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'annorfrancis23@outlook.com',
      href: 'mailto:annorfrancis23@outlook.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+233 538 713 916',
      href: 'tel:+233538713916',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Accra, Ghana',
      href: 'https://www.google.com/maps/search/?api=1&query=Accra%2C+Ghana',
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
    <section id="contact" className="py-12 sm:py-20 md:py-32 bg-dark relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            Let&apos;s Work <span className="gradient-text">Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? I&apos;d love to hear about it. Get in touch today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-8"
              whileHover={{ borderColor: '#C9A24B', scale: 1.02 }}
            >
              <h3 className="text-2xl font-bold font-syne mb-6">Quick Response Time</h3>
              <p className="text-text-secondary mb-4">
                I typically respond within 24 hours. For urgent matters, use WhatsApp.
              </p>
              <motion.a
                href="https://wa.me/233538713916"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary font-semibold"
                whileHover={{ x: 5 }}
              >
                Message on WhatsApp →
              </motion.a>
            </motion.div>

            {/* Contact Methods */}
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {contactMethods.map((method, idx) => {
                const Icon = method.icon
                return (
                  <motion.a
                    key={idx}
                    href={method.href}
                    className="card flex items-center gap-4 group hover:border-primary"
                    variants={itemVariants}
                    whileHover={{ x: 8 }}
                  >
                    <motion.div
                      className="p-3 bg-primary/10 border border-primary/30 rounded-lg"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon size={24} className="text-primary" />
                    </motion.div>
                    <div>
                      <div className="text-sm text-text-tertiary">{method.label}</div>
                      <div className="font-semibold text-text-secondary group-hover:text-primary transition-colors">
                        {method.value}
                      </div>
                    </div>
                  </motion.a>
                )
              })}
            </motion.div>

            {/* Availability */}
            <motion.div
              className="border-t border-border-dark pt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold mb-3">Availability</h4>
              <p className="text-text-secondary text-sm mb-4">
                Currently available for new projects. I typically take on 1-2 projects at a time to ensure quality.
              </p>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                <span className="text-sm text-primary font-medium">Open for Opportunities</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot — invisible to people, catches bots */}
              <input
                type="checkbox"
                name="botcheck"
                className="hidden"
                style={{ display: 'none' }}
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
              />

              {/* Name */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label htmlFor="name" className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 bg-dark-card border border-border-dark rounded-lg focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark transition-colors"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                viewport={{ once: true }}
              >
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 bg-dark-card border border-border-dark rounded-lg focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark transition-colors"
                />
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+233 XXX XXX XXX"
                  className="w-full px-4 py-3 bg-dark-card border border-border-dark rounded-lg focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark transition-colors"
                />
              </motion.div>

              {/* Project Type */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                viewport={{ once: true }}
              >
                <label htmlFor="projectType" className="block text-sm font-medium mb-2">Project Type</label>
                <select
                  name="projectType"
                  id="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-dark-card border border-border-dark rounded-lg focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark transition-colors"
                >
                  <option value="">Select a project type</option>
                  <option value="website">Website</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="webapp">Web App</option>
                  <option value="design">Design Only</option>
                  <option value="other">Other</option>
                </select>
              </motion.div>

              {/* Budget */}
              {/* Message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                viewport={{ once: true }}
              >
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-dark-card border border-border-dark rounded-lg focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-dark transition-colors resize-none"
                />
              </motion.div>

              {/* Status Messages */}
              <div role="status" aria-live="polite">
                {submitStatus === 'success' && (
                  <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg text-primary">
                    ✓ Message sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
                    ✗ Failed to send message. Please try again or use WhatsApp.
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary group disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
