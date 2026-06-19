import { motion } from 'framer-motion'
import { CheckCircle } from 'react-feather'

export default function About() {
  const skills = [
    { name: 'HTML & CSS', level: 95 },
    { name: 'JavaScript', level: 90 },
    { name: 'React.js', level: 88 },
    { name: 'Python', level: 85 },
    { name: 'Node.js', level: 82 },
    { name: 'Academic Consultant', level: 90 },
    { name: 'AI Automation & Chatbots', level: 88 },
    { name: 'CRM Systems (Salesforce, Zendesk, Freshdesk)', level: 92 },
    { name: 'MongoDB', level: 80 },
    { name: 'Git & Deployment', level: 85 },
    { name: 'Microsoft Office, Google Workspace, Slack', level: 88 },
    { name: 'MIS & Administrative Executive', level: 92 },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="about" className="relative py-16 md:py-24 bg-dark overflow-hidden">
      {/* Background Image */}
      <motion.div className="absolute inset-0" style={{backgroundImage: 'url(/images/bc3.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(2px) opacity(0.6)'}} animate={{ scale: [1, 1.01, 1] }} transition={{ duration: 25, repeat: Infinity }}></motion.div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark/90 via-dark/70 to-dark/50"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Left - Image */}
          <motion.div
            className="relative order-2 lg:order-1"
            whileInView={{ scale: 1, opacity: 1 }}
            initial={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden group cursor-pointer">
              <img
                src="/images/my-image8.jpg"
                alt="Francis Perkins Annor - Digital Creator"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold mb-2">Let's Create</div>
                  <div className="text-sm opacity-90">Something Amazing Together</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            className="space-y-6 order-1 lg:order-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-3">
              <motion.span
                className="inline-block text-primary font-semibold text-sm uppercase tracking-wider"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                About Me
              </motion.span>
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold font-syne leading-tight"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Digital Creator <span className="gradient-text">Driving Results</span>
              </motion.h2>
            </div>

            <motion.div
              className="space-y-4 text-lg text-text-secondary leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <p>
                I'm Francis Perkins Annor, a digital creator focused on helping individuals and businesses stand out and grow through smart, results-driven solutions.
              </p>
              <p>
                I specialize in building modern, high-performing websites that don't just look good but attract customers and drive real results. Beyond websites, I design professional fliers, digital business cards, and creative art videos for special occasions.
              </p>
              <p>
                I also support students and professionals with academic writing and international school applications, while running targeted social media ads on Meta platforms to help businesses convert attention into sales.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                className="btn-primary"
                onClick={() => document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
              </motion.button>
            </motion.div>

          </motion.div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          className="mt-16 md:mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className="text-2xl md:text-3xl font-bold font-syne mb-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Skills & Expertise
          </motion.h3>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                className="card group hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-sm">{skill.name}</span>
                  <span className="text-xs text-primary font-medium">{skill.level}%</span>
                </div>
                <div className="w-full bg-border-dark rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-primary to-primary/80 h-full rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1.2, delay: idx * 0.1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
