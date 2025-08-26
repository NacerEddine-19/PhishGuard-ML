# API Documentation — PhishGuard ML (FastAPI)

This document describes the public HTTP API exposed by the FastAPI backend for the PhishGuard ML phishing detection service.

## 🚀 Deployment Status
- **Production Backend**: `Your_Back_end_API_URL`
- **Production Frontend**: `https://phi-sh-guard.app/`
- **Local Development**: `http://127.0.0.1:8000`

## 🔧 Technology Stack
- **Backend**: Python 3.11, FastAPI, XGBoost, scikit-learn
- **Model**: XGBoost Classifier (pickle format)
- **Deployment**: Railway (containerized)
- **Caching**: LRU cache for predictions (max 1024 entries)

## 🌐 CORS Configuration
The API allows requests from:
- `https://phi-sh-guard.app/` (Production Frontend)
- `Your_Back_end_API_URL` (Production Backend)
- `http://localhost:5173` (Local Development)
- `https://phi-sh-guard.app` (Alternative Domain)

## 📡 API Endpoints

### GET /
**Health Check & API Info**
- **URL**: `/`
- **Method**: `GET`
- **Response**: Basic API information and available endpoints

**Example Response:**
```json
{
  "message": "PhishGuard ML API is running",
  "endpoints": ["/predict", "/health"]
}
```

### GET /health
**Detailed Health Check**
- **URL**: `/health`
- **Method**: `GET`
- **Response**: Model status and system health

**Example Response:**
```json
{
  "status": "healthy",
  "model_loaded": true
}
```

### GET /test
**Test Endpoint**
- **URL**: `/test`
- **Method**: `GET`
- **Response**: Simple test message

**Example Response:**
```json
{
  "message": "Test endpoint working"
}
```

### POST /predict
**Phishing Detection Prediction**
- **URL**: `/predict`
- **Method**: `POST`
- **Content-Type**: `application/json`

#### Request Body
```json
{
  "url": "string"
}
```

**Field Descriptions:**
- `url` (string, required): The URL to analyze for phishing detection

**Example Request:**
```json
{
  "url": "https://secure-login.example.com/update"
}
```

#### Response (200 OK)
```json
{
  "prediction": "string",
  "probability": 0.93,
  "probabilities": {
    "bad": 0.93,
    "good": 0.07
  }
}
```

**Field Descriptions:**
- `prediction` (string): Predicted class - either "bad" (phishing) or "good" (legitimate)
- `probability` (number): Confidence score for the predicted class (0.0 - 1.0)
- `probabilities` (object): Probability distribution across all classes

#### Error Responses

**422 Unprocessable Entity:**
```json
{
  "detail": [
    {
      "type": "missing",
      "loc": ["body", "url"],
      "msg": "Field required",
      "input": {}
    }
  ]
}
```

**500 Internal Server Error:**
```json
{
  "detail": "Error message describing the issue"
}
```

## 🧠 Machine Learning Model

### Model Details
- **Algorithm**: XGBoost Classifier
- **Type**: Binary Classification (Phishing vs. Legitimate)
- **Classes**: 
  - `bad` (0): Phishing/malicious URLs
  - `good` (1): Legitimate/safe URLs
- **Format**: Pickle (.pkl) file
- **Performance**: ~90% accuracy on test data

### Feature Extraction
The API automatically extracts 16 features from each URL:

1. **URL Structure Features:**
   - `url_length`: Total character count
   - `num_digits`: Count of numeric characters
   - `num_special`: Count of special characters
   - `has_https`: Boolean for HTTPS protocol
   - `num_dots`: Count of dots in URL
   - `has_at`: Boolean for @ symbol presence
   - `has_ip`: Boolean for IP address usage
   - `url_depth`: Directory depth level

2. **Content Analysis Features:**
   - `has_keywords`: Boolean for suspicious keywords
   - `hostname_length`: Domain name length
   - `is_top_domain`: Boolean for trusted domains
   - `suspicious_tld`: Boolean for suspicious TLDs

3. **Statistical Features:**
   - `url_entropy`: Shannon entropy of URL
   - `hyphen_count`: Count of hyphens
   - `longest_digit_seq`: Longest consecutive digit sequence
   - `levenshtein_sim_top`: Similarity to top domains

### Suspicious Keywords Detected
The system monitors for 50+ phishing-related keywords including:
- `login`, `signin`, `verify`, `account`, `secure`
- `update`, `confirm`, `banking`, `payment`, `paypal`
- `security`, `billing`, `credential`, `support`
- `recovery`, `purchase`, `checkout`, `wallet`
- `transfer`, `invoice`, `bonus`, `free`, `reward`

### Suspicious TLDs
High-risk top-level domains that trigger alerts:
- `.tk`, `.ml`, `.ga`, `.cf`, `.gq`
- `.xyz`, `.club`, `.top`, `.work`

## 🚀 Usage Examples

### cURL
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"url":"https://secure-login.example.com/update"}' \
  Your_Back_end_API_URL/predict
```

### JavaScript (Frontend)
```javascript
async function predictURL(url) {
  const response = await fetch("Your_Back_end_API_URL/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  
  return response.json();
}

// Usage
try {
  const result = await predictURL("https://example.com");
  console.log(`Prediction: ${result.prediction}, Confidence: ${result.probability}`);
} catch (error) {
  console.error("Prediction failed:", error);
}
```

### Python
```python
import requests

def predict_url(url):
    response = requests.post(
        "Your_Back_end_API_URL/predict",
        json={"url": url},
        timeout=10
    )
    response.raise_for_status()
    return response.json()

# Usage
try:
    result = predict_url("https://example.com")
    print(f"Prediction: {result['prediction']}")
    print(f"Confidence: {result['probability']:.2%}")
except Exception as e:
    print(f"Error: {e}")
```

## 🔍 Interactive API Documentation
- **Swagger UI**: `/docs` (when running locally)
- **ReDoc**: `/redoc` (when running locally)
- **OpenAPI Spec**: `/openapi.json`

**Note**: Interactive docs are only available in local development mode. Production Railway deployment focuses on performance and security.

## 🛠️ Local Development

### Prerequisites
- Python 3.11+
- Required packages: `fastapi`, `uvicorn`, `xgboost`, `scikit-learn`, `joblib`, `numpy`, `rapidfuzz`

### Running Locally
```bash
cd api
pip install -r requirements.txt
python app.py
```

Or with Uvicorn:
```bash
cd api
uvicorn app:app --reload --host 127.0.0.1 --port 8000
```

### Environment Variables
- `PORT`: Server port (default: 8000)
- `MODEL_PATH`: Path to XGBoost model file
- `ENCODER_PATH`: Path to label encoder file

## 📊 Performance & Caching
- **Response Time**: Average < 200ms for predictions
- **Caching**: LRU cache with 1024 entries for repeated URLs
- **Concurrent Requests**: Handles multiple simultaneous predictions
- **Memory Usage**: ~500MB for model and feature extraction

## 🔒 Security Notes
- **Authentication**: Currently public for demo purposes
- **Rate Limiting**: Not implemented (consider for production)
- **Input Validation**: Strict URL format validation with sanitization
- **Error Handling**: Comprehensive error handling with detailed messages
- **CORS**: Strictly configured for allowed origins only
- **Model Security**: ML model files are protected and not exposed via API

## 📝 Changelog
- **v1.0.0**: Initial release with XGBoost model
- **v1.1.0**: Railway deployment with optimized performance
- **v1.2.0**: Enhanced feature extraction and caching
- **Current**: Production-ready with 90%+ accuracy
- **Future**: Planned authentication, rate limiting, and model updates

## 🚨 Rate Limiting & Production Notes
- **Current Status**: No rate limiting implemented
- **Recommended**: Implement rate limiting for production use
- **Monitoring**: Consider adding request logging and analytics
- **Scaling**: Railway automatically scales based on traffic

---

**API Base URL**: `Your_Back_end_API_URL`

**Support**: For issues or questions, check the project repository or create an issue.

## 📊 API Status & Monitoring
- **Health Check**: `/health` endpoint for monitoring
- **Uptime**: Railway provides 99.9%+ uptime SLA
- **Performance**: Average response time < 200ms
- **Availability**: 24/7 with automatic scaling

---
*Last Updated: august 2025 | PhishGuard ML API v1.2.0*

