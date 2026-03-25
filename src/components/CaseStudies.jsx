import { motion } from 'framer-motion'
import { ExternalLink } from 'react-feather'

export default function CaseStudies() {
  const projects = [
    {
      id: 1,
      title: 'Featured Project 01',
      image: '/images/bc1.jpg',
      description: 'Replace this with your real project summary. Add what it does and the impact in 1–2 lines.',
      stack: ['React', 'Tailwind CSS', 'Vite'],
      url: '#',
    },
    {
      id: 2,
      title: 'Featured Project 02',
      image: '/images/bc2.jpg',
      description: 'Replace this with your real project summary. Keep it concise and outcome-focused.',
      stack: ['JavaScript', 'Node.js', 'MongoDB'],
      url: '#',
    },
    {
      id: 3,
      title: 'Featured Project 03',
      image: '/images/bc3.jpg',
      description: 'Replace this with your real project summary. Mention the main feature or business goal.',
      stack: ['Next.js', 'TypeScript', 'PostgreSQL'],
      url: '#',
    },
    {
      id: 4,
      title: 'Featured Project 04',
      image: '/images/bc4.jpg',
      description: 'Replace this with your real project summary. Mention speed, UX, or conversion improvements.',
      stack: ['Framer Motion', 'React', 'REST API'],
      url: '#',
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
    <section
      id="work"
      className="relative py-20 md:py-32 bg-dark bg-[url('/images/bc8.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-dark/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A selection of my top work. More projects will be added soon.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="group card overflow-hidden h-full flex flex-col bg-dark/70 backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="relative h-64 overflow-hidden rounded-lg mb-6">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-dark/30 group-hover:bg-dark/10 transition-all" />
              </div>

              <div className="space-y-4 flex-grow">
                <motion.h3
                  className="text-2xl font-bold font-syne"
                  whileHover={{ color: '#88CC00' }}
                >
                  {project.title}
                </motion.h3>

                <p className="text-text-secondary">{project.description}</p>

                <div className="pt-4 border-t border-border-dark">
                  <p className="text-xs text-text-tertiary mb-2">TECH STACK</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-xs text-primary"
                        whileHover={{ scale: 1.1, backgroundColor: '#88CC0020' }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>

              <motion.a
                href={project.url}
                className="mt-6 inline-flex items-center gap-2 text-primary hover:text-primary font-semibold group/link"
                whileHover={{ x: 5 }}
              >
                View Project
                <ExternalLink size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
