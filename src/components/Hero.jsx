import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, GitHub, Linkedin, Mail } from 'react-feather'

export default function Hero() {
  const reduce = useReducedMotion()

  const scrollTo = (e, selector) => {
    e.preventDefault()
    const element = document.querySelector(selector)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const stats = [
    { value: '7', label: 'Live builds you can open' },
    { value: '40+', label: 'Admin screens behind them' },
    { value: '8', label: 'Certifications earned' },
  ]

  const socials = [
    { icon: Linkedin, href: 'https://linkedin.com/in/francis-annor-649a0a26a', label: 'LinkedIn' },
    { icon: GitHub, href: 'https://github.com/AnnorFrancis', label: 'GitHub' },
    { icon: Mail, href: 'mailto:annorfrancis23@outlook.com', label: 'Email' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: reduce ? 0 : 0.15, delayChildren: reduce ? 0 : 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.7, ease: 'easeOut' } },
  }

  return (
    <section className="relative min-h-[100dvh] bg-dark pt-20 md:pt-0 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: 'url(/images/bc1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/85 to-dark/55" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 sm:w-96 h-64 sm:h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Content */}
          <motion.div className="space-y-7" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full w-fit"
              variants={itemVariants}
            >
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm font-medium text-primary">Available for projects</span>
            </motion.div>

            <motion.div className="space-y-5" variants={itemVariants}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] sm:leading-tight">
                Ghanaian businesses hire me to build the website —{' '}
                <span className="gradient-text">and the system behind it.</span>
              </h1>
              <p className="text-base sm:text-xl text-text-secondary leading-relaxed max-w-xl">
                I&apos;m Francis Annor, a web developer in Accra and founder of{' '}
                <span className="text-primary font-semibold">Perkins Creative</span>. Six businesses are running on
                software I built — a till that takes Mobile Money, stock that counts itself, bookings that price
                themselves. Open any of them below.
              </p>
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
              <motion.button
                className="btn-primary group"
                onClick={(e) => scrollTo(e, '#contact')}
                whileHover={reduce ? undefined : { scale: 1.04 }}
                whileTap={reduce ? undefined : { scale: 0.96 }}
              >
                <span className="flex items-center gap-2">
                  Start a project
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              <motion.button
                className="btn-secondary"
                onClick={(e) => scrollTo(e, '#work')}
                whileHover={reduce ? undefined : { scale: 1.04 }}
                whileTap={reduce ? undefined : { scale: 0.96 }}
              >
                See the live work
              </motion.button>
            </motion.div>

            <motion.div className="flex gap-4 pt-1" variants={itemVariants}>
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                    rel={s.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                    aria-label={s.label}
                    className="p-3 rounded-lg border border-border-dark hover:border-primary hover:text-primary transition-colors"
                    whileHover={reduce ? undefined : { scale: 1.1, y: -4 }}
                    whileTap={reduce ? undefined : { scale: 0.95 }}
                  >
                    <Icon size={20} />
                  </motion.a>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right - Portrait */}
          <motion.div
            className="relative h-[340px] sm:h-[440px] md:h-[520px] lg:h-[580px] rounded-2xl overflow-hidden border border-border-dark"
            variants={itemVariants}
          >
            <img
              src="/images/my-image.jpg"
              alt="Francis Annor, founder of Perkins Creative"
              width="600"
              height="600"
              loading="eager"
              decoding="sync"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-3 gap-3 sm:gap-6 mt-12 sm:mt-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {stats.map((stat) => (
            <motion.div key={stat.label} className="card text-center" variants={itemVariants}>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-1 sm:mb-2">{stat.value}</div>
              <div className="text-xs sm:text-sm text-text-secondary leading-snug">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
