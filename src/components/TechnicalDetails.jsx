import { useState } from 'react'
import { Database, Brain, TrendingUp, FileText, ChevronDown, ChevronUp, BookOpen, Code, Download, Info, ExternalLink } from 'lucide-react'

export default function TechnicalDetails() {
  const [expandedSection, setExpandedSection] = useState('dataset')

  return (
    <section id="technical" className="px-6 py-20 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Details</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Deep dive into the methodology, data, and algorithms powering our phishing detection system
          </p>
        </div>

        {/* Collapsible Sections */}
        <div className="space-y-6">
          {/* Dataset Section */}
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'dataset' ? '' : 'dataset')}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <Database className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Dataset & Features</h3>
                  <p className="text-gray-400">Comprehensive analysis of phishing URL characteristics</p>
                </div>
              </div>
              {expandedSection === 'dataset' ? (
                <ChevronUp className="h-6 w-6 text-gray-400" />
              ) : (
                <ChevronDown className="h-6 w-6 text-gray-400" />
              )}
            </button>
            
            {expandedSection === 'dataset' && (
              <div className="px-6 pb-6 space-y-6 animate-fade-in">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white">Dataset Overview</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Our model was trained on a comprehensive dataset of over <strong className="text-blue-400">100,000 URLs</strong>, 
                      sourced from the UCI Machine Learning Repository and supplemented with real-world phishing samples 
                      from PhishTank and OpenPhish databases. The dataset maintains a balanced distribution with 
                      52% legitimate and 48% phishing URLs.
                    </p>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-green-400">390,000+</div>
                          <div className="text-sm text-gray-400">Legitimate URLs</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-red-400">150,000+</div>
                          <div className="text-sm text-gray-400">Phishing URLs</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white">Key Features Extracted</h4>
                    <div className="space-y-3">
                      {[
                        { name: 'URL Length', desc: 'Character count and structure analysis' },
                        { name: 'SSL Certificate', desc: 'HTTPS presence and certificate validity' },
                        { name: 'Subdomain Count', desc: 'Number and depth of subdomains' },
                        { name: 'Special Characters', desc: 'Suspicious symbols and encoding' },
                        { name: 'Redirect Chains', desc: 'URL shorteners and redirections' }
                      ].map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-slate-700/20 rounded-lg">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                          <div>
                            <div className="font-semibold text-white">{feature.name}</div>
                            <div className="text-sm text-gray-400">{feature.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Model Section */}
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'model' ? '' : 'model')}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Brain className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Machine Learning Models</h3>
                  <p className="text-gray-400">Algorithm selection and model architecture</p>
                </div>
              </div>
              {expandedSection === 'model' ? (
                <ChevronUp className="h-6 w-6 text-gray-400" />
              ) : (
                <ChevronDown className="h-6 w-6 text-gray-400" />
              )}
            </button>
            
            {expandedSection === 'model' && (
              <div className="px-6 pb-6 space-y-6 animate-fade-in">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      name: 'Random Forest',
                      accuracy: '94.2%',
                      description: 'Ensemble method with 100 decision trees, excellent for feature importance analysis',
                      pros: ['High interpretability', 'Robust to overfitting', 'Feature importance ranking'],
                      color: 'green'
                    },
                    {
                      name: 'XGBoost',
                      accuracy: '95.2%',
                      description: 'Gradient boosting framework optimized for speed and performance',
                      pros: ['Best overall accuracy', 'Fast inference', 'Handles missing values'],
                      color: 'blue'
                    },
                    {
                      name: 'Neural Network',
                      accuracy: '93.8%',
                      description: 'Deep learning approach with 3 hidden layers for complex pattern recognition',
                      pros: ['Complex pattern detection', 'Adaptive learning', 'Non-linear relationships'],
                      color: 'purple'
                    }
                  ].map((model, index) => (
                    <div key={index} className={`bg-${model.color}-500/10 border border-${model.color}-500/30 rounded-xl p-6`}>
                      <div className="space-y-4">
                        <div className="text-center">
                          <h4 className={`text-xl font-bold text-${model.color}-400`}>{model.name}</h4>
                          <div className={`text-3xl font-bold text-${model.color}-400 mt-2`}>{model.accuracy}</div>
                        </div>
                        <p className="text-gray-300 text-sm">{model.description}</p>
                        <div className="space-y-2">
                          <div className="text-sm font-semibold text-white">Key Advantages:</div>
                          <ul className="space-y-1">
                            {model.pros.map((pro, i) => (
                              <li key={i} className="text-xs text-gray-400 flex items-start space-x-2">
                                <span className="text-gray-500 mt-1">•</span>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-slate-700/30 rounded-xl p-6">
                  <h4 className="text-xl font-semibold text-white mb-4">Model Selection Rationale</h4>
                  <p className="text-gray-300 leading-relaxed">
                    After extensive experimentation, <strong className="text-blue-400">XGBoost</strong> was selected as our 
                    primary model due to its superior balance of accuracy, speed, and robustness. The ensemble approach 
                    combines multiple weak learners to create a strong classifier, while gradient boosting iteratively 
                    improves predictions by focusing on previously misclassified samples.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Evaluation Section */}
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'evaluation' ? '' : 'evaluation')}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Model Evaluation</h3>
                  <p className="text-gray-400">Performance metrics and validation methodology</p>
                </div>
              </div>
              {expandedSection === 'evaluation' ? (
                <ChevronUp className="h-6 w-6 text-gray-400" />
              ) : (
                <ChevronDown className="h-6 w-6 text-gray-400" />
              )}
            </button>
            
            {expandedSection === 'evaluation' && (
              <div className="px-6 pb-6 space-y-6 animate-fade-in">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-white">Performance Metrics</h4>
                    <div className="space-y-4">
                      {[
                        { metric: 'Accuracy', value: '95%', description: 'Overall correct predictions' },
                        { metric: 'Precision', value: '92%', description: 'True positives / (True positives + False positives)' },
                        { metric: 'Recall', value: '96%', description: 'True positives / (True positives + False negatives)' },
                        { metric: 'F1-Score', value: '94%', description: 'Harmonic mean of precision and recall' }
                      ].map((item, index) => (
                        <div key={index} className="bg-slate-700/30 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-white">{item.metric}</span>
                            <span className="text-2xl font-bold text-green-400">{item.value}</span>
                          </div>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-white">Validation Methodology</h4>
                    <div className="space-y-4">
                      <div className="bg-slate-700/30 rounded-lg p-4">
                        <h5 className="font-semibold text-white mb-2">Cross-Validation</h5>
                        <p className="text-gray-300 text-sm">
                          5-fold stratified cross-validation ensures robust performance estimates 
                          and prevents overfitting to specific data splits.
                        </p>
                      </div>
                      <div className="bg-slate-700/30 rounded-lg p-4">
                        <h5 className="font-semibold text-white mb-2">Train/Test Split</h5>
                        <p className="text-gray-300 text-sm">
                          80% training, 20% testing with stratified sampling to maintain 
                          class distribution across splits.
                        </p>
                      </div>
                      <div className="bg-slate-700/30 rounded-lg p-4">
                        <h5 className="font-semibold text-white mb-2">Temporal Validation</h5>
                        <p className="text-gray-300 text-sm">
                          Additional testing on recent phishing samples to ensure 
                          model effectiveness against evolving threats.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Code & Resources Section */}
          <div className="bg-slate-800/50 rounded-2xl border border-slate-700 overflow-hidden">
            <button
              onClick={() => setExpandedSection(expandedSection === 'code' ? '' : 'code')}
              className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Code & Resources</h3>
                  <p className="text-gray-400">Implementation details and reproducible research</p>
                </div>
              </div>
              {expandedSection === 'code' ? (
                <ChevronUp className="h-6 w-6 text-gray-400" />
              ) : (
                <ChevronDown className="h-6 w-6 text-gray-400" />
              )}
            </button>
            
            {expandedSection === 'code' && (
              <div className="px-6 pb-6 space-y-6 animate-fade-in">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white">Available Resources</h4>
                    <div className="space-y-3">
                      {[
                        {
                          title: 'Jupyter Notebook',
                          description: 'Complete data analysis and model training pipeline',
                          link: 'https://github.com/NacerEddine-19/PhishGuard-ML/blob/main/src/notebooks/Phishing%20Sites%20Detector.ipynb',
                          icon: BookOpen,
                          color: 'blue'
                        },
                        {
                          title: 'GitHub Repository',
                          description: 'Full source code with documentation and examples',
                          link: 'https://github.com/NacerEddine-19/PhishGuard-ML',
                          icon: Code,
                          color: 'green'
                        },
                        {
                          title: 'Dataset Download',
                          description: 'Preprocessed dataset ready for experimentation',
                          link: 'https://raw.githubusercontent.com/NacerEddine-19/PhishGuard-ML/main/src/data/phishing_site_urls.csv',
                          icon: Database,
                          color: 'purple'
                        },
                        {
                          title: 'API Documentation',
                          description: 'REST API endpoints and usage examples',
                          link: 'https://github.com/NacerEddine-19/PhishGuard-ML/blob/main/API_DOCUMENTATION.md',
                          icon: FileText,
                          color: 'orange'
                        }
                      ].map((resource, index) => (
                        <a
                          key={index}
                          href={resource.link}
                          target={resource.link.startsWith('http') ? '_blank' : undefined}
                          rel={resource.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className={`block p-4 bg-${resource.color}-500/10 border border-${resource.color}-500/30 rounded-lg hover:bg-${resource.color}-500/20 transition-colors group`}
                        >
                          <div className="flex items-center space-x-3">
                            <resource.icon className={`h-6 w-6 text-${resource.color}-400`} />
                            <div className="flex-1">
                              <div className={`font-semibold text-${resource.color}-400 group-hover:text-${resource.color}-300`}>
                                {resource.title}
                              </div>
                              <div className="text-sm text-gray-400">{resource.description}</div>
                            </div>
                            {resource.link.startsWith('http') ? (
                              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-white" />
                            ) : (
                              <Download className="h-4 w-4 text-gray-400 group-hover:text-white" />
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-white">Implementation Highlights</h4>
                    <div className="bg-slate-700/30 rounded-lg p-4">
                      <pre className="text-sm text-gray-300 overflow-x-auto">
{`# Feature extraction pipeline
def extract_features(url):
    features = {
        "url_length": len(url),
        "num_digits": sum(c.isdigit() for c in url),
        "num_special": len(re.findall(r"[^a-zA-Z0-9]", url)),
        "has_https": int(scheme.lower() == "https"),
        "num_dots": url.count("."),
        "has_at": int("@" in url),
        "has_ip": int(bool(re.search(r"\b\d{1,3}(\.\d{1,3}){3}\b", hostname))),
        "url_depth": url.count("/") - 2 if url.count("/") > 2 else 0,
        "has_keywords": int(
            any(keyword in url.lower() for keyword in phishing_keywords)
        ),
        "hostname_length": len(hostname),
        "is_top_domain": int(any(top in hostname for top in TOP_DOMAINS)),
        "suspicious_tld": int(tld.lower() in SUSPICIOUS_TLDS)
    }
    return features

# Model training
clf = XGBClassifier(
    scale_pos_weight=len(y[y==0]) / len(y[y==1])
)
clf.fit(X_train, y_train)`}
                      </pre>
                    </div>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Info className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-yellow-200">
                          <strong>Note:</strong> All code and resources are provided for educational purposes. 
                          Please ensure compliance with your institution's academic integrity policies.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 