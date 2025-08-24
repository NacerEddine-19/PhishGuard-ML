# PhishGuard ML - Phishing Detection Website

A modern, interactive website showcasing a machine learning project for detecting phishing websites. Built with React, Tailwind CSS, and featuring a comprehensive demonstration of ML-powered cybersecurity solutions.

## 🌟 Features

### Core Functionality
- **Interactive Demo**: Real-time URL analysis with detailed feedback and confidence scores
- **Comprehensive Project Overview**: Detailed explanation of the problem, solution, and methodology
- **Technical Deep Dive**: Collapsible sections covering dataset, models, and evaluation metrics
- **Developer Profile**: Professional bio with skills, experience, and contact information

### Design & User Experience
- **Modern UI/UX**: Cybersecurity-themed design with gradient backgrounds and smooth animations
- **Responsive Design**: Mobile-first approach ensuring compatibility across all devices
- **Navigation**: Fixed header with smooth scrolling and mobile-friendly menu
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Performance**: Optimized loading with image preloading and efficient bundling

### Technical Features
- **SEO Optimized**: Comprehensive meta tags, Open Graph, and Twitter Card support
- **Interactive Elements**: Hover effects, loading animations, and micro-interactions
- **Professional Assets**: Custom-generated images including hero graphics and developer avatar
- **Code Quality**: Clean, maintainable React components with modern hooks

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd phishing-detection-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📁 Project Structure

```
phishing-detection-website/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   ├── hero-image.png          # Cybersecurity-themed hero graphic
│   │   ├── ml-pipeline.png         # Machine learning pipeline diagram
│   │   └── developer-avatar.png    # Professional developer headshot
│   ├── components/
│   │   └── ui/
│   │       └── button.jsx          # Reusable button component
│   ├── App.jsx                     # Main application component
│   ├── App.css                     # Custom styles and animations
│   └── main.jsx                    # Application entry point
├── index.html                      # HTML template with SEO meta tags
├── package.json                    # Dependencies and scripts
├── tailwind.config.js              # Tailwind CSS configuration
├── vite.config.js                  # Vite build configuration
└── README.md                       # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: Blue gradient (`from-blue-400 to-blue-600`)
- **Secondary**: Green accent (`text-green-400`)
- **Background**: Dark slate (`bg-slate-900`, `bg-slate-800`)
- **Text**: White and gray variants for hierarchy
- **Status Colors**: Green (safe), Red (phishing), Yellow (warning)

### Typography
- **Headings**: Bold, large sizes with gradient text effects
- **Body**: Clean, readable fonts with proper line spacing
- **Code**: Monospace font for technical content

### Components
- **Cards**: Rounded corners with subtle borders and backdrop blur
- **Buttons**: Gradient backgrounds with hover effects
- **Forms**: Modern input styling with focus states
- **Navigation**: Fixed header with smooth transitions

## 🔧 Technical Implementation

### Frontend Stack
- **React 18**: Modern hooks and functional components
- **Tailwind CSS**: Utility-first styling with custom configurations
- **Lucide React**: Consistent icon library
- **Vite**: Fast build tool and development server

### Key Components

#### Interactive Demo
- Real-time URL analysis simulation
- Dynamic result display with confidence scores
- Feature breakdown visualization
- Sample URL testing buttons

#### Technical Details
- Collapsible sections for organized content
- Dataset statistics and visualizations
- Model comparison cards
- Code snippets and resource links

#### Navigation System
- Fixed header with smooth scrolling
- Mobile-responsive hamburger menu
- Scroll-to-top functionality
- Section-based navigation

### Performance Optimizations
- Image preloading for critical assets
- Efficient bundle splitting
- Optimized CSS with Tailwind purging
- Lazy loading for non-critical content

## 📊 Demo Functionality

The interactive demo use machine learning phishing detection system:

### URL Analysis Features
- **Input Validation**: Accepts various URL formats
- **URL Parsing**: Extracts domain, path, and query parameters
- **URL Analysis**: Analyzes URL components for phishing indicators
- **Phishing Indicator Detection**: Identifies common phishing patterns
- **URL Safety Assessment**: Classifies URLs as safe or phishing
- **Confidence Scoring**: Displays prediction confidence levels
- **Feature Extraction**: Shows analyzed URL characteristics
- **Result Visualization**: Color-coded safety indicators

### Sample Test Cases
- `https://google.com` - Safe (legitimate site)
- `https://paypal-secure-verify.com` - Phishing (suspicious domain)
- `https://bank-update-account.net` - Phishing (fake banking site)
- `https://bit.ly/suspicious-link` - Phishing (URL shortener)

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

## 🚀 Deployment Options

### Static Hosting Services
- **Vercel**: `npm run build` → Deploy `dist/` folder
- **Netlify**: Connect repository for automatic deployments
- **GitHub Pages**: Use `gh-pages` package for deployment
- **AWS S3**: Upload built files to S3 bucket with static hosting

### Custom Server
- **Nginx**: Serve `dist/` folder as static files
- **Apache**: Configure virtual host for static content
- **Node.js**: Use `serve` package for simple hosting

### Environment Variables
No environment variables required - all functionality is client-side.


## 🤝 Contributing

### Development Guidelines
1. Follow React best practices and hooks patterns
2. Use Tailwind CSS for styling consistency
3. Maintain responsive design principles
4. Test across different browsers and devices
5. Ensure accessibility compliance

### Code Style
- Use functional components with hooks
- Implement proper error boundaries
- Follow consistent naming conventions
- Add comments for complex logic
- Maintain clean component structure


## 🙏 Acknowledgments
- **OpenAI**: AI-powered language model for text generation
- **Kaggle**: Dataset source for URL analysis
- **Scikit-learn**: Machine learning library for model training and evaluation
- **TensorFlow**: Deep learning framework for neural network models
- **React**: Front-end framework for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide**: Icon library for creating modern and scalable designs
- **Vite**: Fast build tool and development server
- **PhishTank & OpenPhish**: Real-world phishing samples

## 📞 Contact

**Majid Nacer Eddine** - Data Scientist & ML Engineer
- 📧 Email: majidnacereddine@gmail.com
- 💼 LinkedIn: [nacer-eddine-majid](https://www.linkedin.com/in/nacer-eddine-majid)
- 🐙 GitHub: [NacerEddine-19](https://https://github.com/NacerEddine-19)

---

**Built with ❤️ for cybersecurity education and machine learning demonstration**

