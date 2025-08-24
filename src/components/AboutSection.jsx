import { User, Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import developerAvatar from '../assets/developer-avatar.jpg'

export default function AboutSection() {
  return (
    <section id="about" className="px-6 py-20 bg-gradient-to-br from-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            About the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Developer</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Meet the data scientist behind this innovative phishing detection system
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700 backdrop-blur-sm">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Profile Image */}
            <div className="text-center md:text-left">
              <div className="relative inline-block">
                <img 
                  src={developerAvatar} 
                  alt="Professional headshot of the developer" 
                  className="w-48 h-48 rounded-full mx-auto md:mx-0 object-cover border-4 border-blue-500/30 shadow-2xl"
                />
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center border-4 border-slate-800">
                  <User className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Nacer Eddine</h3>
                <p className="text-xl text-blue-400 font-semibold">Data Scientist & ML Engineer</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Passionate data scientist with expertise in machine learning, cybersecurity, and web development. 
                  Currently pursuing a Master's in Computer Science with a focus on AI applications in cybersecurity. 
                  This phishing detection project represents the intersection of my interests in protecting digital 
                  users and advancing machine learning techniques.
                </p>
                
                <p className="text-gray-300 leading-relaxed">
                  With experience in Python, JavaScript, and modern ML frameworks, I enjoy building practical 
                  solutions that make the internet safer for everyone.
                </p>
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white">Core Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Machine Learning', 'Python', 'Cybersecurity', 'Data Analysis', 
                    'React', 'Flask', 'Scikit-learn', 'Deep Learning'
                  ].map((skill, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-white">Connect With Me</h4>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="https://github.com/nacereddine-19" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors group"
                  >
                    <Github className="h-5 w-5 text-gray-300 group-hover:text-white" />
                    <span className="text-gray-300 group-hover:text-white">GitHub</span>
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-gray-300" />
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/nacer-eddine-majid" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors group"
                  >
                    <Linkedin className="h-5 w-5 text-white" />
                    <span className="text-white">LinkedIn</span>
                    <ExternalLink className="h-4 w-4 text-blue-200 group-hover:text-white" />
                  </a>
                  
                  <a 
                    href="mailto:majidnacereddine@gmail.com"
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg transition-colors group"
                  >
                    <Mail className="h-5 w-5 text-white" />
                    <span className="text-white">Email</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          {/* <div className="mt-8 pt-8 border-t border-slate-700">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-400">15+</div>
                <div className="text-gray-400">ML Projects</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-400">3</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-400">5</div>
                <div className="text-gray-400">Publications</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
} 