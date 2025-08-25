import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">PhishGuard ML</span>
            </div>
            <p className="text-gray-400 text-sm">
              Advanced machine learning for phishing detection and cybersecurity protection.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Project</h4>
            <div className="space-y-2">
              <a href="#overview" className="block text-gray-400 hover:text-white transition-colors text-sm">Overview</a>
              <a href="#demo" className="block text-gray-400 hover:text-white transition-colors text-sm">Demo</a>
              <a href="#technical" className="block text-gray-400 hover:text-white transition-colors text-sm">Technical Details</a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Resources</h4>
            <div className="space-y-2">
              <a href="https://github.com/NacerEddine-19/PhishGuard-ML" className="block text-gray-400 hover:text-white transition-colors text-sm">GitHub Repository</a>
              <a href="https://github.com/NacerEddine-19/PhishGuard-ML/blob/main/API_DOCUMENTATION.md" className="block text-gray-400 hover:text-white transition-colors text-sm">Research Paper</a>
              <a href="https://www.kaggle.com/datasets/taruntiwarihp/phishing-site-urls/data" className="block text-gray-400 hover:text-white transition-colors text-sm">Dataset</a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Contact</h4>
            <div className="space-y-2">
              <a href="#about" className="block text-gray-400 hover:text-white transition-colors text-sm">About Developer</a>
              <a href="mailto:majidnacereddine@gmail.com" className="block text-gray-400 hover:text-white transition-colors text-sm">Email</a>
              <a href="https://www.linkedin.com/in/nacer-eddine-majid" className="block text-gray-400 hover:text-white transition-colors text-sm">LinkedIn</a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-700 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 PhishGuard ML. Built with React and machine learning for educational purposes.
          </p>
        </div>
      </div>
    </footer>
  )
} 