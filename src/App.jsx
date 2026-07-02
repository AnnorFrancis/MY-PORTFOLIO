import { useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import About from './components/About'
import CaseStudies from './components/CaseStudies'
import SocialProof from './components/SocialProof'
import Services from './components/Services'
import Process from './components/Process'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PerkinsAI from './components/PerkinsAI'

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight
          setScrollProgress(totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 sm:h-1 bg-primary z-50 origin-left"
        style={{ scaleX: scrollProgress / 100, transformOrigin: 'left' }}
      />

      <Navigation />

      <main className="bg-dark text-text-primary overflow-hidden">
        <Hero />
        <About />
        <SocialProof />
        <CaseStudies />
        <Services />
        <Process />
        <Pricing />
        <Contact />
      </main>

      <Footer />
      <PerkinsAI />
    </div>
  )
}
