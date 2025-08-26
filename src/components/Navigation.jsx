import { useState } from 'react'
import { Shield, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button.jsx'

export default function Navigation({ scrollToSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleScrollToSection = (sectionId) => {
    scrollToSection(sectionId)
    setIsMenuOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            className="flex items-center space-x-2"
            href={`#`}
            >
            <img 
              src="/shield-logo.png" 
              alt="PhishGuard ML Logo" 
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold text-white">PhishGuard ML</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleScrollToSection('overview')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Overview
            </button>
            <button 
              onClick={() => handleScrollToSection('demo')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Demo
            </button>
            <button 
              onClick={() => handleScrollToSection('technical')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Technical
            </button>
            <button 
              onClick={() => handleScrollToSection('about')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              About
            </button>
            <Button 
              onClick={() => handleScrollToSection('demo')}
              className="bg-blue-600 hover:bg-blue-500 text-white"
            >
              Try Demo
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-slate-700">
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => handleScrollToSection('overview')}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                Overview
              </button>
              <button 
                onClick={() => handleScrollToSection('demo')}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                Demo
              </button>
              <button 
                onClick={() => handleScrollToSection('technical')}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                Technical
              </button>
              <button 
                onClick={() => handleScrollToSection('about')}
                className="text-gray-300 hover:text-white transition-colors text-left"
              >
                About
              </button>
              <Button 
                onClick={() => handleScrollToSection('demo')}
                className="bg-blue-600 hover:bg-blue-500 text-white w-fit"
              >
                Try Demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
} 