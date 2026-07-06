import { motion } from 'framer-motion'
import { ExternalLink, GitHub } from 'react-feather'

export default function CaseStudies() {
  const projects = [
    {
      id: 1,
      title: 'King Ofori Real Estate',
      category: 'Client Website',
      image: '/images/bc2.jpg',
      description: 'A conversion-focused React real-estate platform with property listings, search filters and responsive design — built for a real client.',
      stack: ['React', 'Vite', 'JavaScript'],
      url: 'https://annorfrancis.github.io/king-ofori-real-estate/',
      github: 'https://github.com/AnnorFrancis/king-ofori-real-estate',
      featured: true,
    },
    {
      id: 2,
      title: 'Luxe Estates',
      category: 'Business Website',
      image: '/images/bc4.jpg',
      description: 'A luxury real-estate site with elegant animations, property showcases and layouts designed to attract high-end buyers.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      url: 'https://annorfrancis.github.io/luxe-estates/',
      github: 'https://github.com/AnnorFrancis/luxe-estates',
    },
    {
      id: 3,
      title: 'TechNova E-Commerce',
      category: 'E-Commerce Website',
      image: '/images/bc6.jpg',
      description: 'A full-featured e-commerce storefront for smart devices with product catalogues, cart flow and secure checkout — built for the Accra market.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      url: 'https://annorfrancis.github.io/Technova-e-commence-website-/',
      github: 'https://github.com/AnnorFrancis/Technova-e-commence-website-',
    },
    {
      id: 4,
      title: "Duke's Sweet Bakery",
      category: 'Business Website',
      image: '/images/bc7.jpg',
      description: 'A warm, inviting bakery website with an online menu, gallery and order system — designed to drive foot traffic and online orders.',
      stack: ['HTML', 'CSS', 'JavaScript'],
      url: 'https://annorfrancis.github.io/Bakery_website/',
      github: 'https://github.com/AnnorFrancis/Bakery_website',
    },
    {
      id: 5,
      title: 'Perkins AI Front Desk',
      category: 'AI Product',
      image: '/images/bc5.jpg',
      description: 'An interactive AI assistant demo that handles enquiries, qualifies leads and books appointments 24/7 — a live showcase of what I build for clients.',
      stack: ['HTML', 'CSS', 'AI', 'UX'],
      url: 'https://annorfrancis.github.io/perkins-ai-front-desk/',
      github: 'https://github.com/AnnorFrancis/perkins-ai-front-desk',
    },
    {
      id: 6,
      title: 'Accra Bites POS 3D',
      category: 'Full-Stack App',
      image: '/images/bc1.jpg',
      description: 'A 3D restaurant POS system with touchscreen ordering, live kitchen queue and analytics dashboard — built with React and Three.js.',
      stack: ['React', 'Three.js', 'JavaScript'],
      url: 'https://annorfrancis.github.io/accra-bites-pos-3d/',
      github: 'https://github.com/AnnorFrancis/accra-bites-pos-3d',
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
            Click any project to see it live. Real builds, real results.
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
            <motion.div
              key={project.id}
              className={`group relative rounded-xl overflow-hidden border bg-dark-card transition-all duration-300 cursor-pointer ${
                project.featured
                  ? 'border-primary/50 shadow-lg shadow-primary/10 md:col-span-2 lg:col-span-1'
                  : 'border-border-dark hover:border-primary/60'
              }`}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              onClick={() => window.open(project.url, '_blank', 'noopener,noreferrer')}
            >
              {project.featured && (
                <div className="absolute top-0 right-0 z-20 bg-gold-gradient text-dark text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                  Flagship
                </div>
              )}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  width="400"
                  height="160"
                  className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-dark-card/40 to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-dark/70 border border-primary/40 text-primary">
                  {project.category}
                </span>
                <div className="absolute top-3 right-3 flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="w-8 h-8 rounded-lg bg-dark/70 border border-border-dark flex items-center justify-center text-text-secondary hover:text-primary hover:border-primary/60 transition-colors"
                      title="View source code"
                    >
                      <GitHub size={14} />
                    </a>
                  )}
                  <div className="w-8 h-8 rounded-lg bg-dark/70 border border-border-dark flex items-center justify-center text-text-secondary group-hover:text-primary group-hover:border-primary/60 transition-colors">
                    <ExternalLink size={14} />
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-bold mb-1.5 text-text-primary group-hover:text-primary transition-colors" style={{ fontFamily: '"Playfair Display", Georgia, serif' }}>
                  {project.title}
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech, i) => (
                    <span key={i} className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-primary/10 border border-primary/20 text-primary-light">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
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
