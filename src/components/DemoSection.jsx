import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Search, CheckCircle, XCircle, Loader2, Info } from 'lucide-react'
import { predictURL } from '../hooks/predict'

export default function DemoSection() {
  const [demoUrl, setDemoUrl] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [error, setError] = useState(null)

  const generate_analysis_details = (features) => {
    const details = []

    if (features.hasHttps) {
      details.push("Secure HTTPS detected")
    } else {
      details.push("No HTTPS (potentially unsafe)")
    }

    if (features.subdomains > 2) {
      details.push(`Suspicious: ${features.subdomains} subdomains`)
    } else {
      details.push("No suspicious subdomains")
    }

    if (features.urlLength > 75) {
      details.push(`Long URL length: ${features.urlLength} characters`)
    } else {
      details.push("URL length appears normal")
    }

    if (features.hasSuspiciousTLD) {
      details.push("Suspicious top-level domain (TLD)")
    } else {
      details.push("TLD is common/benign")
    }

    if (features.hasKeywords) {
      details.push("Contains phishing-related keywords")
    } else {
      details.push("No phishing keywords detected")
    }

    // Additional analysis based on other features
    if (features.hasAt) {
      details.push("Contains @ symbol (suspicious)")
    }

    if (features.hasIP) {
      details.push("Uses IP address instead of domain name")
    }

    if (features.numDigits > 5) {
      details.push(`High number of digits: ${features.numDigits}`)
    }

    if (features.numSpecial > 10) {
      details.push(`Many special characters: ${features.numSpecial}`)
    }

    if (features.isTopDomain) {
      details.push("Recognized as trusted domain")
    }

    return details
  }

  const handleCheck = async (url) => {
    try {
      const result = await predictURL(url)
      return result
    } catch (err) {
      console.error('Prediction error:', err)
      throw err
    }
  }

  // Trigger analysis from both the Check URL button and Enter key
  const runAnalysis = async () => {
    if (!demoUrl.trim() || isAnalyzing) return

    setIsAnalyzing(true)
    setAnalysisResult(null)
    setError(null)

    try {
      const result = await handleCheck(demoUrl)

      // Process the real prediction result from API
      const isPhishing = result.prediction === "bad"
      const confidence = Math.round(result.probability * 100)

      // Extract features from the URL for display
      const urlObj = new URL(
        demoUrl.startsWith("http") ? demoUrl : `https://${demoUrl}`
      )
      const subdomains = urlObj.hostname.split(".").length - 2

      // Calculate additional features
      const numDigits = (demoUrl.match(/\d/g) || []).length
      const numSpecial = (demoUrl.match(/[^a-zA-Z0-9]/g) || []).length
      const numDots = (demoUrl.match(/\./g) || []).length
      const hasAt = demoUrl.includes("@") ? 1 : 0
      const hasIP = /\b\d{1,3}(\.\d{1,3}){3}\b/.test(urlObj.hostname) ? 1 : 0
      const urlDepth = (demoUrl.match(/\//g) || []).length - 2
      const hasKeywords = /secure|account|banking|login|signin|verify|update|confirm|hack|bit.ly|suspicious/i.test(
        demoUrl
      )
        ? 1
        : 0
      const suspiciousTLDs = [
        ".tk",
        ".ml",
        ".ga",
        ".cf",
        ".gq",
        ".xyz",
        ".club",
        ".top",
        ".work",
      ]
      const tld = "." + urlObj.hostname.split(".").pop()
      const hasSuspiciousTLD = suspiciousTLDs.includes(tld) ? 1 : 0
      const topDomains = [
        "google.com",
        "facebook.com",
        "amazon.com",
        "wikipedia.org",
        "twitter.com",
        "github.com",
        "linkedin.com",
        "youtube.com",
        "apple.com",
        "microsoft.com",
      ]
      const isTopDomain = topDomains.some((domain) =>
        urlObj.hostname.includes(domain)
      )
        ? 1
        : 0

      // Generate detailed analysis based on features
      const featureDetails = generate_analysis_details({
        hasHttps: demoUrl.startsWith("https"),
        subdomains: Math.max(0, subdomains),
        urlLength: demoUrl.length,
        hasSuspiciousTLD: hasSuspiciousTLD,
        hasKeywords: hasKeywords,
        hasAt: hasAt,
        hasIP: hasIP,
        numDigits: numDigits,
        numSpecial: numSpecial,
        isTopDomain: isTopDomain,
      })

      // Generate confidence-based summary
      let confidenceSummary = ""
      if (isPhishing) {
        if (confidence > 80) {
          confidenceSummary = "High confidence phishing detection"
        } else if (confidence > 60) {
          confidenceSummary = "Moderate confidence phishing detection"
        } else {
          confidenceSummary = "Low confidence phishing detection"
        }
      } else {
        if (confidence > 80) {
          confidenceSummary = "High confidence safe classification"
        } else if (confidence > 60) {
          confidenceSummary = "Moderate confidence safe classification"
        } else {
          confidenceSummary = "Low confidence classification"
        }
      }

      const reasons = [confidenceSummary, ...featureDetails]

      setAnalysisResult({
        isPhishing,
        confidence,
        reasons,
        features: {
          urlLength: demoUrl.length,
          hasHttps: demoUrl.startsWith("https"),
          subdomains: Math.max(0, subdomains),
          numDigits,
          numSpecial,
          numDots,
          hasAt,
          hasIP,
          urlDepth,
          hasKeywords,
          hasSuspiciousTLD,
          isTopDomain,
          hostnameLength: urlObj.hostname.length,
        },
        probabilities: result.probabilities, // Store full probability data
      })
      console.log("Analysis result:", analysisResult)
    } catch (err) {
      console.error("Check failed:", err)
      setError(err.message || "Failed to analyze URL. Please try again.")
      setAnalysisResult(null)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <section
      id="demo"
      className="px-6 py-20 bg-gradient-to-br from-slate-800 to-slate-900"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Try the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
              Demo
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Test our phishing detection system with any URL. Enter a website
            address below to see how our AI analyzes potential threats.
          </p>
        </div>

        {/* Demo Interface */}
        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 backdrop-blur-sm">
          <div className="space-y-6">
            {/* URL Input */}
            <div className="space-y-4">
              <label
                htmlFor="url-input"
                className="block text-lg font-semibold text-white"
              >
                Enter URL to Analyze
              </label>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  id="url-input"
                  type="url"
                  value={demoUrl}
                  onChange={(e) => setDemoUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      runAnalysis()
                    }
                  }}
                  placeholder="https://example.com"
                  className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={isAnalyzing}
                />
                <Button
                  onClick={runAnalysis}
                  disabled={isAnalyzing || !demoUrl.trim()}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Check URL
                    </>
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-5 p-2 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-200">
                  <strong>Tip</strong>: Include the protocol (http/https). If omitted, the app assumes https by default.
                </div>
              </div>
            </div>

            {/* Sample URLs */}
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Try these sample URLs:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { url: "https://google.com", isGood: true },
                  { url: "https://paypal-secure-verify.com", isGood: false },
                  { url: "https://bank-update-account.net", isGood: false },
                  { url: "https://bit.ly/suspicious-link", isGood: false },
                ].map(({ url, isGood }) => (
                  <button
                    key={url}
                    onClick={() => setDemoUrl(url)}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      isGood
                        ? "bg-green-500/10 border-green-500/30 hover:bg-green-700 text-white"
                        : "bg-red-500/10 border-red-500/30 hover:bg-red-700 text-white"
                    }`}
                    disabled={isAnalyzing}
                  >
                    {url}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-8 p-6 bg-red-500/10 border border-red-500/30 rounded-xl animate-fade-in">
                <div className="flex items-start space-x-3">
                  <XCircle className="h-6 w-6 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-red-400 mb-2">
                      Analysis Failed
                    </h3>
                    <p className="text-red-200 mb-3">
                      {error}
                    </p>
                    <div className="text-sm text-red-300 space-y-1 mb-4">
                      <p>• Check your internet connection</p>
                      <p>• Verify the URL format is correct</p>
                      <p>• Try again in a few moments</p>
                    </div>
                    <Button
                      onClick={() => {
                        setError(null)
                        runAnalysis()
                      }}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Try Again
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Analysis Results */}
            {analysisResult && (
              <div className="mt-8 space-y-6 animate-fade-in">
                {/* Main Result */}
                <div
                  className={`p-6 rounded-xl border-2 ${analysisResult.isPhishing
                    ? "bg-red-500/10 border-red-500/30"
                    : "bg-green-500/10 border-green-500/30"
                    }`}
                >
                  <div className="flex items-center space-x-3 mb-4">
                    {analysisResult.isPhishing ? (
                      <XCircle className="h-8 w-8 text-red-400" />
                    ) : (
                      <CheckCircle className="h-8 w-8 text-green-400" />
                    )}
                    <div>
                      <h3
                        className={`text-2xl font-bold ${analysisResult.isPhishing
                          ? "text-red-400"
                          : "text-green-400"
                          }`}
                      >
                        {analysisResult.isPhishing
                          ? "Potential Phishing"
                          : "Appears Safe"}
                      </h3>
                      <p className="text-gray-300">
                        Confidence: {analysisResult.confidence}%
                      </p>
                    </div>
                  </div>

                  {/* Reasons */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-white">
                      Analysis Details:
                    </h4>
                    <ul className="space-y-1">
                      {analysisResult.reasons.map((reason, index) => (
                        <li
                          key={index}
                          className="text-gray-300 flex items-start space-x-2"
                        >
                          <span className="text-gray-500 mt-1">•</span>
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Feature Analysis */}
                <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600">
                  <h4 className="font-semibold text-white mb-4">
                    Feature Analysis
                  </h4>

                  {/* Basic URL Features */}
                  <div className="mb-6">
                    <h5 className="text-sm font-medium text-gray-300 mb-3">
                      Basic URL Features
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-blue-400">
                          {analysisResult.features.urlLength}
                        </div>
                        <div className="text-xs text-gray-400">URL Length</div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-xl font-bold ${analysisResult.features.hasHttps
                            ? "text-green-400"
                            : "text-red-400"
                            }`}
                        >
                          {analysisResult.features.hasHttps ? "Yes" : "No"}
                        </div>
                        <div className="text-xs text-gray-400">HTTPS</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-purple-400">
                          {analysisResult.features.hostnameLength}
                        </div>
                        <div className="text-xs text-gray-400">
                          Hostname Length
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-orange-400">
                          {analysisResult.features.subdomains}
                        </div>
                        <div className="text-xs text-gray-400">Subdomains</div>
                      </div>
                    </div>
                  </div>

                  {/* Character Analysis */}
                  <div className="mb-6">
                    <h5 className="text-sm font-medium text-gray-300 mb-3">
                      Character Analysis
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-xl font-bold text-cyan-400">
                          {analysisResult.features.numDigits}
                        </div>
                        <div className="text-xs text-gray-400">Digits</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-yellow-400">
                          {analysisResult.features.numSpecial}
                        </div>
                        <div className="text-xs text-gray-400">
                          Special Chars
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-pink-400">
                          {analysisResult.features.numDots}
                        </div>
                        <div className="text-xs text-gray-400">Dots</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xl font-bold text-indigo-400">
                          {analysisResult.features.urlDepth}
                        </div>
                        <div className="text-xs text-gray-400">URL Depth</div>
                      </div>
                    </div>
                  </div>

                  {/* Security Indicators */}
                  <div>
                    <h5 className="text-sm font-medium text-gray-300 mb-3">
                      Security Indicators
                    </h5>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div
                          className={`text-xl font-bold ${analysisResult.features.hasAt
                            ? "text-red-400"
                            : "text-green-400"
                            }`}
                        >
                          {analysisResult.features.hasAt ? "Yes" : "No"}
                        </div>
                        <div className="text-xs text-gray-400">Contains @</div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-xl font-bold ${analysisResult.features.hasIP
                            ? "text-red-400"
                            : "text-green-400"
                            }`}
                        >
                          {analysisResult.features.hasIP ? "Yes" : "No"}
                        </div>
                        <div className="text-xs text-gray-400">IP Address</div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-xl font-bold ${analysisResult.features.hasKeywords
                            ? "text-red-400"
                            : "text-green-400"
                            }`}
                        >
                          {analysisResult.features.hasKeywords ? "Yes" : "No"}
                        </div>
                        <div className="text-xs text-gray-400">
                          Suspicious Keywords
                        </div>
                      </div>
                      <div className="text-center">
                        <div
                          className={`text-xl font-bold ${analysisResult.features.hasSuspiciousTLD
                            ? "text-red-400"
                            : "text-green-400"
                            }`}
                        >
                          {analysisResult.features.hasSuspiciousTLD
                            ? "Yes"
                            : "No"}
                        </div>
                        <div className="text-xs text-gray-400">
                          Suspicious TLD
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Domain Reputation */}
                  <div className="mt-6 pt-4 border-t border-slate-600">
                    <h5 className="text-sm font-medium text-gray-300 mb-3">
                      Domain Reputation
                    </h5>
                    <div className="text-center">
                      <div
                        className={`text-xl font-bold ${analysisResult.features.isTopDomain
                          ? "text-green-400"
                          : "text-yellow-400"
                          }`}
                      >
                        {analysisResult.features.isTopDomain
                          ? "Trusted Domain"
                          : "Unknown Domain"}
                      </div>
                      <div className="text-xs text-gray-400">
                        {analysisResult.features.isTopDomain
                          ? "Recognized as a legitimate website"
                          : "Not in our trusted domain list"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Probability Breakdown */}
                {analysisResult.probabilities &&
                  Object.keys(analysisResult.probabilities).length > 0 && (
                    <div className="bg-slate-700/30 rounded-xl p-4 sm:p-6 border border-slate-600">
                      <h4 className="font-semibold text-white mb-4">
                        Model Confidence Breakdown
                      </h4>
                      <div className="space-y-3">
                        {Object.entries(analysisResult.probabilities).map(
                          ([className, probability]) => {
                            const percentage = Math.round(probability * 100);
                            const isPredicted =
                              (analysisResult.isPhishing &&
                                (className === "phishing" ||
                                  className === "bad")) ||
                              (!analysisResult.isPhishing &&
                                (className === "legitimate" ||
                                  className === "good"));

                            return (
                              <div
                                key={className}
                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0"
                              >
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                  <span className={`text-gray-300 px-2 sm:px-3 py-1 rounded-md capitalize text-sm sm:text-base ${isPredicted ? `bg-${className === "bad" ? "red" : "green"}-500/20` : ""}`}>
                                    {className}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2 sm:space-x-3">
                                  <div className="flex-1 sm:w-32 bg-slate-600 rounded-full h-2 min-w-0">
                                    <div
                                      className={`h-2 rounded-full transition-all duration-500 ${isPredicted
                                        ? "bg-blue-400"
                                        : "bg-gray-500"
                                        }`}
                                      style={{ width: `${percentage}%` }}
                                    />
                                  </div>
                                  <span className="text-sm text-gray-300 w-12 sm:w-12 text-right flex-shrink-0">
                                    {percentage}%
                                  </span>
                                </div>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  )}
              </div>
            )}

            {/* Disclaimer */}
            <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-yellow-200">
                  <strong>Disclaimer:</strong> This demo uses real machine
                  learning predictions but should not be used as a production
                  security tool. The analysis is based on trained ML models and
                  may not catch all sophisticated phishing attempts.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 