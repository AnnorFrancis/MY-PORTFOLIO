import { motion } from 'framer-motion'
import { ExternalLink, GitHub } from 'react-feather'

export default function CaseStudies() {
  const projects = [
    {
      id: 1,
      title: 'Accra Bites POS 3D',
      category: 'Full-Stack App',
      image: '/images/bc1.jpg',
      description: 'A premium restaurant POS system with touchscreen ordering, live kitchen queue, BI analytics dashboard and interactive table seating — built to digitise local hospitality.',
      stack: ['React', 'JavaScript', 'Node.js', 'Analytics'],
      url: 'https://github.com/AnnorFrancis/accra-bites-pos-3d',
      featured: true,
    },
    {
      id: 2,
      title: 'King Ofori Real Estate',
      category: 'Client Project',
      image: '/images/bc2.jpg',
      description: 'A modern React real-estate platform with property listings, search filters and a clean, conversion-focused layout built for a real client.',
      stack: ['React', 'Vite', 'JavaScript', 'CSS'],
      url: 'https://github.com/AnnorFrancis/king-ofori-real-estate',
    },
    {
      id: 3,
      title: 'Luxe Estates',
      category: 'Business Website',
      image: '/images/bc4.jpg',
      description: 'A luxury real-estate website with elegant animations, property showcases and responsive layouts designed to attract high-end buyers.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      url: 'https://github.com/AnnorFrancis/luxe-estates',
    },
    {
      id: 4,
      title: 'Perkins AI Front Desk',
      category: 'AI Product',
      image: '/images/bc5.jpg',
      description: 'An AI-powered front-desk assistant that handles enquiries, qualifies leads and books appointments — a live demo of what I build for clients.',
      stack: ['HTML', 'AI', 'Chatbot', 'UX'],
      url: 'https://github.com/AnnorFrancis/perkins-ai-front-desk',
    },
    {
      id: 5,
      title: 'PremiumBoyfriendArt',
      category: 'Creative Platform',
      image: '/images/bc6.jpg',
      description: 'A polished React art showcase with smooth transitions, gallery views and a premium visual experience for creative content.',
      stack: ['React', 'Vite', 'CSS', 'Animation'],
      url: 'https://github.com/AnnorFrancis/PremiumBoyfriendArt',
    },
    {
      id: 6,
      title: 'Budget Tracker',
      category: 'Web App',
      image: '/images/bc7.jpg',
      description: 'A personal finance tool that tracks income and expenses with an intuitive dashboard so users always know where their money goes.',
      stack: ['JavaScript', 'CSS', 'LocalStorage'],
      url: 'https://github.com/AnnorFrancis/Budget-Tracker',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section
      id="work"
      className="relative py-12 sm:py-20 md:py-32 bg-dark bg-[url('/images/bc8.jpg')] bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute inset-0 bg-dark/88" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="eyebrow">Real, shipped work</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            A selection of real builds — each one live on my GitHub. More available on request.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project) => (
            <motion.a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative rounded-xl overflow-hidden border bg-dark-card transition-all duration-300 block ${
                project.featured
                  ? 'border-primary/50 shadow-lg shadow-primary/10 md:col-span-2 lg:col-span-1'
                  : 'border-border-dark hover:border-primary/60'
              }`}
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              {project.featured && (
                <div className="absolute top-0 right-0 z-20 bg-gold-gradient text-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                  Flagship
                </div>
              )}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="192"
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/40 to-transparent" />
                <span className="absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-dark/70 border border-primary/40 text-primary">
                  {project.category}
                </span>
                <div className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-dark/70 border border-border-dark flex items-center justify-center text-text-secondary group-hover:text-primary group-hover:border-primary/60 transition-colors">
                  <ExternalLink size={16} />
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-text-primary group-hover:text-primary transition-colors" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.stack.map((tech, i) => (
                    <span key={i} className="text-[11px] sm:text-xs px-2 sm:px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary-light">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <a
            href="https://github.com/AnnorFrancis"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <GitHub size={18} /> View all projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  )
}
