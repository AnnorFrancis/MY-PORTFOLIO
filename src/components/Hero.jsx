import { motion } from 'framer-motion'
import { ArrowRight, GitHub, Linkedin, Mail } from 'react-feather'
import { useState, useEffect } from 'react'

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = ['/images/my-image.jpg', '/images/my-image3.jpg'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = (e) => {
    e.preventDefault()
    const element = document.querySelector('#contact')
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  const floatingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: 'easeOut' },
    },
  }

  const statVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="relative min-h-screen bg-dark pt-20 md:pt-0 flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <motion.div className="absolute inset-0" style={{backgroundImage: 'url(/images/bc1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(3px) opacity(0.6)'}} animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 20, repeat: Infinity }}></motion.div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark/40"></div>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full w-fit"
              variants={itemVariants}
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">Available for projects</span>
            </motion.div>

            {/* Main Heading */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
                Websites, AI &amp; Brands,<br /><span className="gradient-text">Built to Win Clients</span>
              </h1>
              <p className="text-xl text-text-secondary leading-relaxed max-w-xl">
                I&apos;m Francis Annor — founder of <span className="text-primary font-semibold">Perkins Creative Digital Agency</span>. I design premium websites, build AI automations, and craft brands &amp; content that make ambitious businesses impossible to ignore.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
              <motion.button
                className="btn-primary group"
                onClick={scrollToContact}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  Start Your Project
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              <motion.button
                className="btn-secondary"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#work').scrollIntoView({ behavior: 'smooth' })
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div className="flex gap-6 pt-4" variants={itemVariants}>
              <motion.a
                href="https://linkedin.com/in/francis-annor-649a0a26a"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-border-dark hover:border-primary hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                href="https://github.com/AnnorFrancis"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-border-dark hover:border-primary hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <GitHub size={20} />
              </motion.a>
              <motion.a
                href="mailto:annorfrancis23@outlook.com"
                className="p-3 rounded-lg border border-border-dark hover:border-primary hover:text-primary transition-colors"
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right - Hero Image */}
          <motion.div
            className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden"
            variants={floatingVariants}
          >
            <motion.div
              className="relative w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border border-border-dark overflow-hidden flex items-center justify-center"
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              {images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt="Francis Annor"
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-opacity ease-in-out"
                  style={{ opacity: idx === currentImage ? 1 : 0, transitionDuration: '1400ms' }}
                />
              ))}
              {/* Slideshow Dots */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`w-3 h-3 rounded-full transition-colors ${idx === currentImage ? 'bg-primary' : 'bg-white/50'}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { label: 'Projects Shipped', value: '15+' },
            { label: 'Services', value: '9' },
            { label: 'Years Experience', value: '7+' },
            { label: 'Certifications', value: '8+' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className="card text-center"
              variants={statVariants}
            >
              <motion.div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.value}
              </motion.div>
              <div className="text-sm text-text-secondary">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
