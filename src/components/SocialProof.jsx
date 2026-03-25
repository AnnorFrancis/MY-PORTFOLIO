import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'react-feather'

export default function SocialProof() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      name: 'Mr. Kobby Bruce',
      company: 'Tech Startup Ghana',
      role: 'Founder',
      category: 'Startup',
      achievement: '45% conversion increase',
      text: 'Francis transformed our vision into reality. The website increased our conversions by 45% in the first month.',
      accentColor: 'border-blue-500/30 hover:border-blue-500/60',
      tagColor: 'bg-blue-500/20 text-blue-300',
      badgeColor: 'bg-blue-500/10 text-blue-400',
    },
    {
      name: 'Mr. Samuel Asare',
      company: 'Digital Agency',
      role: 'CEO',
      category: 'Agency',
      achievement: 'Performance optimized',
      text: 'Outstanding work. The attention to detail and performance optimization was exactly what we needed.',
      accentColor: 'border-purple-500/30 hover:border-purple-500/60',
      tagColor: 'bg-purple-500/20 text-purple-300',
      badgeColor: 'bg-purple-500/10 text-purple-400',
    },
    {
      name: 'Mrs. Ivy Mensah',
      company: 'E-commerce Business',
      role: 'Owner',
      category: 'E-commerce',
      achievement: '2x faster loading',
      text: 'Best investment we made. The new site is fast, beautiful, and our customers love it.',
      accentColor: 'border-emerald-500/30 hover:border-emerald-500/60',
      tagColor: 'bg-emerald-500/20 text-emerald-300',
      badgeColor: 'bg-emerald-500/10 text-emerald-400',
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 md:py-32 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="section-title text-center mb-16">
            What Clients Are Saying
          </h3>

          {/* Desktop Grid View (hidden on mobile) */}
          <div className="hidden md:block">
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, idx) => (
                <motion.div
                  key={idx}
                  className={`card flex flex-col gap-6 border-l-4 transition-all duration-300 ${testimonial.accentColor}`}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Quote Icon */}
                  <div className="text-4xl text-primary/40">❝</div>

                  {/* Category Tag */}
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${testimonial.tagColor}`}>
                      {testimonial.category}
                    </span>
                  </div>

                  {/* Rating */}
                  <motion.div className="flex gap-1" whileHover={{ scale: 1.08 }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg">
                        ⭐
                      </span>
                    ))}
                  </motion.div>

                  {/* Quote */}
                  <p className="text-text-secondary italic leading-relaxed flex-grow">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Achievement Badge */}
                  <div className={`text-xs font-medium px-3 py-2 rounded ${testimonial.badgeColor} w-fit`}>
                    ✓ {testimonial.achievement}
                  </div>

                  {/* Author */}
                  <div className="pt-6 border-t border-border-dark">
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-text-tertiary">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Carousel View (visible only on mobile) */}
          <div className="md:hidden">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                >
                  {(() => {
                    const testimonial = testimonials[activeIndex]
                    return (
                      <div
                        className={`card flex flex-col gap-6 border-l-4 transition-all duration-300 ${testimonial.accentColor}`}
                      >
                        {/* Quote Icon */}
                        <div className="text-4xl text-primary/40">❝</div>

                        {/* Category Tag */}
                        <div className="flex items-center gap-2">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${testimonial.tagColor}`}>
                            {testimonial.category}
                          </span>
                        </div>

                        {/* Rating */}
                        <motion.div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-lg">
                              ⭐
                            </span>
                          ))}
                        </motion.div>

                        {/* Quote */}
                        <p className="text-text-secondary italic leading-relaxed flex-grow">
                          &ldquo;{testimonial.text}&rdquo;
                        </p>

                        {/* Achievement Badge */}
                        <div className={`text-xs font-medium px-3 py-2 rounded ${testimonial.badgeColor} w-fit`}>
                          ✓ {testimonial.achievement}
                        </div>

                        {/* Author */}
                        <div className="pt-6 border-t border-border-dark">
                          <div className="font-semibold text-sm">{testimonial.name}</div>
                          <div className="text-xs text-text-tertiary">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </motion.div>
              </AnimatePresence>

              {/* Carousel Controls */}
              <div className="flex items-center justify-between mt-6 gap-4">
                <motion.button
                  onClick={prevTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full border border-border-dark hover:border-primary/50 hover:text-primary transition-colors"
                >
                  <ChevronLeft size={20} />
                </motion.button>

                {/* Indicators */}
                <div className="flex gap-2">
                  {testimonials.map((_, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === activeIndex ? 'bg-primary w-6' : 'bg-border-dark'
                      }`}
                      whileHover={{ scale: 1.2 }}
                    />
                  ))}
                </div>

                <motion.button
                  onClick={nextTestimonial}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full border border-border-dark hover:border-primary/50 hover:text-primary transition-colors"
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>

              {/* Counter */}
              <div className="text-center mt-4 text-sm text-text-tertiary">
                {activeIndex + 1} / {testimonials.length}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
