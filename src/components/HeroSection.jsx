import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { ChevronRight } from 'lucide-react'
import heroImage from '../assets/hero-image.png'

export default function HeroSection({ scrollToDemo,scrollToOverView }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative px-6 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                Detecting Phishing Websites with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                  {" "}
                  Machine Learning
                </span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                Protecting users from malicious websites through advanced
                machine learning algorithms. Our intelligent system analyzes URL
                patterns, domain characteristics, and web content to identify
                potential phishing threats with 95% accuracy, helping safeguard
                digital identities and financial information from
                cybercriminals.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={scrollToDemo}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Try the Demo
                <ChevronRight
                  className={`ml-2 h-5 w-5 transition-transform duration-300 ${
                    isHovered ? "translate-x-1" : ""
                  }`}
                />
              </Button>
              <Button
                onClick={scrollToOverView}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                variant="outline"
                className="border-gray-400 text-gray-300 hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">95%</div>
                <div className="text-gray-400">Accuracy</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">540K+</div>
                <div className="text-gray-400">URLs Analyzed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">0.2s</div>
                <div className="text-gray-400">Response Time</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative z-10 animate-float">
              <img
                src={heroImage}
                alt="Cybersecurity illustration with digital padlock and network connections"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-500/20 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-green-500/20 rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-twinkle"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-green-400 rounded-full animate-twinkle delay-500"></div>
        <div className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-purple-400 rounded-full animate-twinkle delay-1000"></div>
      </div>
    </section>
  );
} 