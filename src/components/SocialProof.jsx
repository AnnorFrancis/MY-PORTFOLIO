import { motion } from 'framer-motion'
import { Award, Clock, RefreshCw, DollarSign, Shield, Zap } from 'react-feather'

export default function SocialProof() {
  const certifications = [
    'Google IT Support Professional',
    'Google IT Security',
    'Meta React Developer',
    'AI Automation (Coursera)',
    'Claude & Claude Code',
    'AWS Cloud Practitioner',
    'Google Project Management',
    'Customer Service Excellence',
  ]

  const guarantees = [
    { icon: DollarSign, title: 'Transparent pricing', text: 'Clear, fixed packages. You always know the cost before we start — no surprises.' },
    { icon: Clock, title: 'On-time delivery', text: 'Agreed timelines, honoured. Your project ships when I say it will.' },
    { icon: RefreshCw, title: 'Revisions included', text: 'We refine until it is right. Your satisfaction is built into every package.' },
    { icon: Shield, title: 'Reliable & certified', text: '7+ years of work and genuine, verifiable certifications behind every service.' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="py-20 md:py-32 bg-dark relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow">Why clients trust Perkins</span>
          <h2 className="section-title">
            Real Credentials, <span className="gradient-text">Real Standards</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            No fluff — just verifiable certifications and the way I work on every single project.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {guarantees.map((g, idx) => {
            const Icon = g.icon
            return (
              <motion.div key={idx} className="card text-center" variants={itemVariants} whileHover={{ y: -4 }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 mb-4">
                  <Icon size={20} className="text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-text-primary">{g.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{g.text}</p>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          className="rounded-2xl border border-border-dark bg-dark-card/60 p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <Award size={22} className="text-primary" />
            <h3 className="text-2xl font-bold text-text-primary" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
              Certifications & Credentials
            </h3>
          </div>
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {certifications.map((cert, idx) => (
              <motion.span
                key={idx}
                className="px-4 py-2.5 rounded-full bg-primary/5 border border-primary/30 text-sm text-primary-light font-medium"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                {cert}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="text-center mt-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap size={18} className="text-primary" />
            <span className="text-primary font-semibold uppercase text-xs tracking-[0.2em]">Now taking new clients</span>
          </div>
          <p className="text-text-secondary leading-relaxed mb-6">
            Be one of the first featured success stories. Early clients get my full attention, the sharpest pricing, and results we&apos;ll proudly showcase right here.
          </p>
          <a href="https://wa.me/233538713916" target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
            Start your project
          </a>
        </motion.div>
      </div>
    </section>
  )
}
