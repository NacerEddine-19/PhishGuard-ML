import { AlertTriangle, Target, Code, BarChart3 } from 'lucide-react'
import mlPipelineImage from '../assets/ml-pipeline.svg'

export default function ProjectOverview() {
  return (
    <section id="overview" className="px-6 py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Overview</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A comprehensive machine learning solution to combat the growing threat of phishing attacks
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Problem Statement */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">The Problem</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Phishing attacks represent one of the most significant cybersecurity threats today, with over 
                <span className="text-red-400 font-semibold"> 3.4 billion phishing emails</span> sent daily. 
                These malicious websites trick users into revealing sensitive information, leading to financial 
                losses exceeding <span className="text-red-400 font-semibold">$12 billion annually</span>. 
                Traditional blacklist-based detection methods are reactive and often fail to catch newly created 
                phishing sites, leaving users vulnerable to sophisticated attacks.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Our Solution</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Our machine learning approach analyzes multiple URL and website characteristics in real-time, 
                providing proactive protection against both known and zero-day phishing threats. By leveraging 
                supervised learning algorithms, we can identify suspicious patterns and behaviors that indicate 
                malicious intent, achieving <span className="text-green-400 font-semibold">95% accuracy </span> 
                with minimal false positives.
              </p>
            </div>
          </div>

          {/* ML Pipeline Visualization */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white text-center">Machine Learning Pipeline</h3>
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <img 
                src={mlPipelineImage} 
                alt="Machine Learning Pipeline flowchart showing URL input, feature extraction, ML model, classification, and output" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Technologies and Results */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Technologies */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Code className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Technologies Used</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="text-blue-400 font-semibold">Languages</div>
                <div className="text-gray-300 text-sm">Python, JavaScript</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="text-green-400 font-semibold">ML Libraries</div>
                <div className="text-gray-300 text-sm">Scikit-learn, XGBoost</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="text-purple-400 font-semibold">Data Processing</div>
                <div className="text-gray-300 text-sm">Pandas, NumPy</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                <div className="text-orange-400 font-semibold">Deployment</div>
                <div className="text-gray-300 text-sm">Flask, React</div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">Key Results</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Accuracy</span>
                  <span className="text-green-400 font-bold">95.2%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full" style={{width: '95.2%'}}></div>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Precision</span>
                  <span className="text-blue-400 font-bold">94.8%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full" style={{width: '94.8%'}}></div>
                </div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Recall</span>
                  <span className="text-purple-400 font-bold">96.1%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full" style={{width: '96.1%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 