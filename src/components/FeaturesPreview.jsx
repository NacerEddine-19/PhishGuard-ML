import { Brain, Globe, Lock } from 'lucide-react'

export default function FeaturesPreview() {
  return (
    <section className="px-6 py-16 bg-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4 p-6 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
              <Brain className="h-8 w-8 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">AI-Powered Detection</h3>
            <p className="text-gray-400">Advanced machine learning algorithms analyze multiple URL features to identify phishing attempts.</p>
          </div>
          
          <div className="text-center space-y-4 p-6 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
              <Globe className="h-8 w-8 text-green-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Real-time Analysis</h3>
            <p className="text-gray-400">Instant URL scanning with results delivered in under 200 milliseconds.</p>
          </div>
          
          <div className="text-center space-y-4 p-6 rounded-xl bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto">
              <Lock className="h-8 w-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Secure & Private</h3>
            <p className="text-gray-400">No data storage or tracking. All analysis happens locally for maximum privacy.</p>
          </div>
        </div>
      </div>
    </section>
  )
} 