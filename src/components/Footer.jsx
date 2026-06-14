import { motion } from 'framer-motion'
import { GitHub, Linkedin, Mail, Heart, ArrowUp } from 'react-feather'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialLinks = [
    { icon: Linkedin, href: 'https://linkedin.com/in/francis-annor-649a0a26a', label: 'LinkedIn' },
    { icon: GitHub, href: 'https://github.com/AnnorFrancis', label: 'GitHub' },
    { icon: Mail, href: 'mailto:annorfrancis23@outlook.com', label: 'Email' },
  ]

  const footerLinks = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ]

  const handleNavClick = (e, href) => {
    if (href === '#') return
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <footer className="bg-dark-card border-t border-border-dark">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <img src="/perkins-logo.png" alt="Perkins logo" className="w-10 h-10" />
              <span className="font-bold text-lg" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>Perkins</span>
            </motion.div>
            <p className="text-text-secondary text-sm leading-relaxed">
              Perkins Creative Digital Agency — websites, AI, branding, video &amp; more. One trusted partner, delivered at a premium.
            </p>
            <p className="text-primary text-sm font-medium italic">Elevate Everything.</p>
            {/* Social Links */}
            <motion.div className="flex gap-3 pt-4" variants={containerVariants}>
              {socialLinks.map((link, idx) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg border border-border-dark hover:border-primary hover:text-primary transition-colors"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    title={link.label}
                  >
                    <Icon size={18} />
                  </motion.a>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Navigation */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h4 className="font-semibold text-text-primary">Navigation</h4>
            <ul className="space-y-2">
              {footerLinks.map((link, idx) => (
                <motion.li key={idx} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-text-secondary hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h4 className="font-semibold text-text-primary">Services</h4>
            <ul className="space-y-2">
              {[
                'Web & App Development',
                'AI Automation & Chatbots',
                'Branding & Design',
                'Social Media & Marketing',
              ].map((service, idx) => (
                <motion.li
                  key={idx}
                  className="text-text-secondary hover:text-primary transition-colors text-sm cursor-pointer"
                  whileHover={{ x: 5 }}
                >
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h4 className="font-semibold text-text-primary">Contact</h4>
            <ul className="space-y-2 text-sm">
              <motion.li whileHover={{ x: 5 }}>
                <a
                  href="mailto:annorfrancis23@outlook.com"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  annorfrancis23@outlook.com
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a
                  href="tel:+233538713916"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  +233 538 713 916
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a
                  href="https://wa.me/233538713916"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  WhatsApp
                </a>
              </motion.li>
              <motion.li className="text-text-secondary pt-2">
                📍 Accra, Ghana
              </motion.li>
            </ul>
          </motion.div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="border-t border-border-dark" />

      {/* Bottom Bar */}
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        {/* Copyright */}
        <motion.div className="text-text-tertiary text-sm flex items-center gap-2">
          <span>© {currentYear} Perkins Creative. Made with</span>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart size={16} className="text-primary" />
          </motion.span>
          <span>by Francis Annor</span>
        </motion.div>

        {/* Links */}
        <motion.div className="flex items-center gap-6 text-sm text-text-tertiary">
          <motion.a
            href="#"
            className="hover:text-primary transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            Privacy Policy
          </motion.a>
          <motion.a
            href="#"
            className="hover:text-primary transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            Terms
          </motion.a>
        </motion.div>

        {/* Back to Top */}
        <motion.button
          onClick={scrollToTop}
          className="p-2 rounded-lg border border-border-dark hover:border-primary hover:text-primary transition-colors"
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.95 }}
          title="Back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      </motion.div>
    </footer>
  )
}
