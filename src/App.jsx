import { useState, useEffect } from 'react'
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

export default function App() {
  const [isDark, setIsDark] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = (window.scrollY / totalHeight) * 100
      setScrollProgress(scrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Navigation */}
      <Navigation isDark={isDark} setIsDark={setIsDark} />

      {/* Main Content */}
      <main className="bg-dark dark:bg-light text-white dark:text-gray-900 overflow-hidden">
        <Hero />
        <About />
        <SocialProof />
        <CaseStudies />
        <Services />
        <Process />
        <Pricing />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
