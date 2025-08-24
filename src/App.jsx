import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import FeaturesPreview from './components/FeaturesPreview'
import ProjectOverview from './components/ProjectOverview'
import DemoSection from './components/DemoSection'
import TechnicalDetails from './components/TechnicalDetails'
import AboutSection from './components/AboutSection'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import './App.css'

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Handle scroll events for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToDemo = () => {
    const demoSection = document.getElementById('demo')
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToOverView = () => {
    const demoSection = document.getElementById('overview')
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Navigation Header */}
      <Navigation
        scrollToSection={scrollToSection}
      />

      {/* Main Content */}
      <div className="pt-20">
        {/* Hero Section */}
        <HeroSection
          scrollToDemo={scrollToDemo}
          scrollToOverView={scrollToOverView}
        />

        {/* Features Preview */}
        <FeaturesPreview />

        {/* Project Overview Section */}
        <ProjectOverview />

        {/* Interactive Demo Section */}
        <DemoSection />

        {/* Technical Details Section */}
        <TechnicalDetails />

        {/* About the Developer Section */}
        <AboutSection />

        {/* Footer */}
        <Footer />

        {/* Scroll to Top Button */}
        <ScrollToTop showScrollTop={showScrollTop} />
      </div>
    </div>
  );
}

export default App