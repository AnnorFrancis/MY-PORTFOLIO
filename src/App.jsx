import Navigation from './components/Navigation'
import Hero from './components/Hero'
import CaseStudies from './components/CaseStudies'
import Services from './components/Services'
import Proof from './components/Proof'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PerkinsAI from './components/PerkinsAI'

export default function App() {
  return (
    <div>
      <a href="#main" className="skip-link">Skip to main content</a>

      <Navigation />

      <main id="main" className="bg-dark text-text-primary overflow-hidden">
        <Hero />
        <CaseStudies />
        <Services />
        <Proof />
        <Pricing />
        <Contact />
      </main>

      <Footer />
      <PerkinsAI />
    </div>
  )
}
