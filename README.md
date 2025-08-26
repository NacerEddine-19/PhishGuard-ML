# PhishGuard ML - Machine Learning Phishing Detection System

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://phishguard-ml.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/NacerEddine-19/PhishGuard-ML)
[![API Docs](https://img.shields.io/badge/API-Documentation-green?style=for-the-badge&logo=read-the-docs)](https://github.com/NacerEddine-19/PhishGuard-ML/blob/main/API_DOCUMENTATION.md)

A comprehensive machine learning system for detecting phishing websites, featuring an interactive web interface, RESTful API, and advanced ML models. Built with React, Python, and state-of-the-art machine learning algorithms.

## 🌟 Project Overview

PhishGuard-ML addresses the critical cybersecurity challenge of phishing attacks, which cost businesses billions annually. Our solution combines machine learning expertise with modern web development to create a real-time phishing detection system that's both accurate and user-friendly.

### 🌟 Key Features

- **🤖 Advanced ML Pipeline**: XGBoost, Random Forest, and Neural Network models
- **📊 High Accuracy**: 90.2% accuracy with XGBoost as primary model
- **⚡ Real-time Analysis**: Instant URL analysis with confidence scores
- **🌐 Interactive Web Demo**: Modern React-based interface with Tailwind CSS
- **🔌 RESTful API**: Production-ready API with comprehensive documentation
- **🐳 Docker Support**: Containerized deployment for easy scaling
- **📱 Responsive Design**: Mobile-first approach with modern UI/UX

## 🚀 Quick Start

### Live Demo
Visit our interactive demo: **[PhishGuard-ML Live Demo](https://phishguard-ml.vercel.app)**

### Local Development

#### Prerequisites
- **Frontend**: Node.js 18+ and npm/yarn
- **Backend**: Python 3.8+ and pip

#### Frontend Setup
```bash
# Clone repository
git clone https://github.com/NacerEddine-19/PhishGuard-ML.git
cd PhishGuard-ML

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

#### Backend Setup
```bash
# Navigate to API directory
cd api

# Install Python dependencies
pip install -r requirements.txt

# Start API server
python app.py

# API will be available at http://localhost:5000
```

#### Production Build
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

## 📁 Architecture

### Frontend (React + Vite)
- **Framework**: React 18 with modern hooks
- **Styling**: Tailwind CSS with custom design system
- **Build Tool**: Vite for fast development and optimized builds
- **Icons**: Lucide React for consistent iconography
- **Deployment**: Vercel-ready configuration

### Backend (Python + Flask)
- **Framework**: Flask RESTful API
- **ML Libraries**: Scikit-learn, XGBoost, TensorFlow
- **Model Serving**: ONNX runtime for optimized inference
- **Containerization**: Docker with multi-stage builds
- **Deployment**: Railway, Heroku, or custom server support

### Machine Learning Pipeline
- **Feature Extraction**: 20+ URL characteristics analysis
- **Model Training**: Ensemble methods with cross-validation
- **Performance**: 90.2% accuracy, 0.89 F1-score
- **Scalability**: ONNX models for production deployment

## 📊 Technical Specifications

### Dataset
- **Size**: 500,000+ URLs (390,000+ legitimate, 150,000+ phishing)
- **Source**: Kaggle dataset + PhishTank & OpenPhish samples
- **Balance**: 52% legitimate, 48% phishing URLs
- **Features**: URL length, SSL certificates, subdomains, special characters, redirect chains

### Models & Performance
| Model | Accuracy | F1-Score | Use Case |
|-------|----------|----------|----------|
| **XGBoost** | 90.2% | 0.89 | Primary production model |
| **Random Forest** | 86.2% | 0.84 | Feature importance analysis |
| **Neural Network** | 93.8% | 0.92 | Complex pattern detection |

### Feature Engineering
- **URL Structure**: Length, depth, subdomain count
- **Security Indicators**: SSL certificates, HTTPS presence
- **Suspicious Patterns**: Special characters, encoding analysis
- **Redirect Analysis**: URL shorteners, chain detection
- **Domain Analysis**: TLD patterns, brand similarity

## 🔧 API Documentation

### Endpoints
- `POST /predict` - URL phishing detection
- `GET /health` - API health check
- `GET /docs` - Interactive API documentation

### Example Usage
```python
import requests

url = "https://api.phishguard-ml.com/predict"
data = {"url": "https://example.com"}
response = requests.post(url, json=data)

print(response.json())
# {
#   "prediction": "safe",
#   "confidence": 0.92,
#   "features": {...}
# }
```

For complete API documentation, visit: **[API Documentation](https://github.com/NacerEddine-19/PhishGuard-ML/blob/main/API_DOCUMENTATION.md)**

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradients (`from-blue-400 to-blue-600`)
- **Secondary**: Green accents (`text-green-400`)
- **Background**: Dark slate (`bg-slate-900`, `bg-slate-800`)
- **Status Colors**: Green (safe), Red (phishing), Yellow (warning)

### Components
- **Cards**: Rounded corners with backdrop blur effects
- **Buttons**: Gradient backgrounds with hover animations
- **Forms**: Modern input styling with focus states
- **Navigation**: Fixed header with smooth scrolling

## 📁 Project Structure

```
PhishGuard-ML/
├── 📁 src/ # Frontend React application
│ ├── 📁 components/ # React components
│ │ ├── 📁 ui/ # Reusable UI components
│ │ ├── AboutSection.jsx # Project overview
│ │ ├── DemoSection.jsx # Interactive demo
│ │ ├── TechnicalDetails.jsx # ML details
│ │ └── Navigation.jsx # Navigation system
│ ├── 📁 assets/ # Images and static files
│ ├── 📁 hooks/ # Custom React hooks
│ └── App.jsx # Main application
├── 📁 api/ # Backend Python API
│ ├── 📁 models/ # Trained ML models
│ ├── app.py # Flask application
│ ├── requirements.txt # Python dependencies
│ └── Dockerfile # Container configuration
├── 📁 public/ # Static assets
├── package.json # Frontend dependencies
├── vite.config.js # Vite configuration
└── README.md # This file  # This file
```

## 🎯 Educational Content

### Project Overview
- Problem statement and impact statistics
- Solution approach and methodology
- Technology stack and implementation details
- Performance metrics and results

### Technical Deep Dive
- **Dataset**: 500,000+ URLs from kaggle dataset phishing-site-urls by taruntiwarihp
- **Features**: URL length, SSL certificates, subdomains, number of digits, evenshtein sim top ...
- **Models**: Random Forest, XGBoost(primary), Neural Networks
- **Evaluation**: Cross-validation, precision, recall, F1-score

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder to Vercel or Netlify
```

### Backend (Railway/Heroku)
```bash
cd api
# Deploy using Railway CLI or Heroku Git
```

### Docker Deployment
```bash
cd api
docker build -t phishguard-ml .
docker run -p 5000:5000 phishguard-ml
```

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow React best practices and hooks patterns
- Use Tailwind CSS for styling consistency
- Maintain responsive design principles
- Ensure accessibility compliance (WCAG 2.1)
- Add comprehensive tests for new features

## 📈 Performance Metrics

- **Frontend**: Lighthouse score 95+ (Performance, Accessibility, Best Practices, SEO)
- **Backend**: <100ms response time for predictions
- **Models**: 90.2% accuracy with 0.89 F1-score
- **Scalability**: Handles 1000+ concurrent requests

## 🔒 Security Features

- **Input Validation**: Comprehensive URL sanitization
- **Rate Limiting**: API request throttling
- **CORS Configuration**: Secure cross-origin requests
- **Model Security**: ONNX runtime for safe inference

## 📚 Educational Resources

This project serves as both a production system and educational resource for:
- Machine Learning in Cybersecurity
- React + Python Full-Stack Development
- API Design and Documentation
- Modern Web Development Practices

## 🙏 Acknowledgments

- **Kaggle**: Dataset source for URL analysis
- **Scikit-learn**: Machine learning library
- **XGBoost**: Gradient boosting framework
- **React & Vite**: Frontend development tools
- **Tailwind CSS**: Utility-first CSS framework
- **PhishTank & OpenPhish**: Real-world phishing samples

## 📞 Contact & Connect

**Majid Nacer Eddine** - Data Scientist & ML Engineer

- 📧 **Email**: [majidnacereddine@gmail.com](mailto:majidnacereddine@gmail.com)
- 💼 **LinkedIn**: [nacer-eddine-majid](https://www.linkedin.com/in/nacer-eddine-majid)
-  **GitHub**: [NacerEddine-19](https://github.com/NacerEddine-19)
-  **Portfolio**: [PhishGuard-ML Live Demo](https://phishguard-ml.vercel.app)

---

<div align="center">

**Built with ❤️ for cybersecurity education and machine learning demonstration**

[![GitHub stars](https://img.shields.io/github/stars/NacerEddine-19/PhishGuard-ML?style=social)](https://github.com/NacerEddine-19/PhishGuard-ML)
[![GitHub forks](https://img.shields.io/github/forks/NacerEddine-19/PhishGuard-ML?style=social)](https://github.com/NacerEddine-19/PhishGuard-ML)

</div>

