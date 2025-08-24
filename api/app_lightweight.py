# app_lightweight.py - Lightweight version for Vercel deployment

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
from pathlib import Path
from urllib.parse import urlparse
from collections import Counter
from rapidfuzz import fuzz
import re
import math
from fastapi.middleware.cors import CORSMiddleware
from functools import lru_cache

from mangum import Mangum

# Configure FastAPI for Vercel deployment
app = FastAPI(
    title="PhishGuard ML API (Lightweight)",
    description="Lightweight ML API for phishing detection",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://phish-guard-ml-website.vercel.app",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and encoder
BASE_DIR = Path(__file__).resolve().parent
MODELS_DIR = BASE_DIR / "models"

# Use pickle models instead of ONNX for smaller size
MODEL_PATH = MODELS_DIR / "model_XGBClassifier.pkl"
ENCODER_PATH = MODELS_DIR / "label_encoder_XGBClassifier.pkl"

# Load domains
TOP_DOMAINS_PATH = BASE_DIR / "top_domains.txt"
with open(TOP_DOMAINS_PATH, "r") as f:
    all_domains = [line.strip().lower() for line in f if line.strip()]

N = 100
TOP_DOMAINS = all_domains[:N]
SUSPICIOUS_TLDS = {".tk", ".ml", ".ga", ".cf", ".gq", ".xyz", ".club", ".top", ".work"}

model = None
label_encoder = None

def _load_model_and_encoder():
    """Load model with fallback options"""
    global model, label_encoder
    
    try:
        print("Loading pickle models...")
        model = joblib.load(MODEL_PATH)
        label_encoder = joblib.load(ENCODER_PATH)
        print("✅ Pickle models loaded successfully")
    except Exception as e:
        print(f"Model load failed: {e}")
        raise RuntimeError(f"Failed to load models: {e}")

# Load models on startup
try:
    _load_model_and_encoder()
except Exception as e:
    print(f"Failed to load models: {e}")
    raise

# Feature extraction functions
def shannon_entropy(text: str) -> float:
    if not text: return 0.0
    counts = Counter(text)
    length = len(text)
    entropy = 0.0
    for c in counts.values():
        p = c / length
        entropy -= p * math.log2(p)
    return float(entropy)

def longest_digit_run(text: str) -> int:
    max_run = current = 0
    for ch in text:
        if ch.isdigit():
            current += 1
            max_run = max(max_run, current)
        else:
            current = 0
    return max_run

def extract_features(url):
    try:
        parsed = urlparse(url)
        hostname = parsed.netloc
        scheme = parsed.scheme or ""
    except:
        hostname = url.split("/")[0] if "/" in url else url
        scheme = "https" if url.lower().startswith("https://") else "http"

    phishing_keywords = [
        "login", "signin", "verify", "account", "secure", "update", "confirm",
        "webscr", "ebayisapi", "banking", "service", "payment", "paypal",
        "security", "billing", "credential", "support", "unlock", "submit",
        "validate", "recovery", "purchase", "checkout", "order", "wallet",
        "transfer", "invoice", "bonus", "free", "reward", "alert", "notification",
        "official", "customer", "safe", "portal", "authenticate", "session",
        "id", "password", "user", "signinpage", "phishing", "fraud", "malware",
        "scam", "hack", "suspicious"
    ]

    try:
        parsed = urlparse(url)
        hostname = parsed.netloc or parsed.path.split("/")[0]
        scheme = parsed.scheme
    except:
        parsed = urlparse("http://" + url)
        hostname = parsed.netloc
        scheme = parsed.scheme

    domain = hostname.replace("www.", "").split(":")[0]
    tld = "." + domain.split(".")[-1] if "." in domain else ""
    
    features = {
        "url_length": len(url),
        "num_digits": sum(c.isdigit() for c in url),
        "num_special": len(re.findall(r"[^a-zA-Z0-9]", url)),
        "has_https": int(scheme.lower() == "https"),
        "num_dots": url.count("."),
        "has_at": int("@" in url),
        "has_ip": int(bool(re.search(r"\b\d{1,3}(\.\d{1,3}){3}\b", hostname))),
        "url_depth": max(url.count("/") - 2, 0),
        "has_keywords": int(any(keyword in url.lower() for keyword in phishing_keywords)),
        "hostname_length": len(hostname),
        "is_top_domain": int(any(top in hostname for top in TOP_DOMAINS)),
        "suspicious_tld": int(tld.lower() in SUSPICIOUS_TLDS),
        "url_entropy": shannon_entropy(url),
        "hyphen_count": url.count("-"),
        "longest_digit_seq": longest_digit_run(url),
        "levenshtein_sim_top": max([fuzz.ratio(domain, td) / 100.0 for td in TOP_DOMAINS]) if TOP_DOMAINS else 0.0,
    }
    return features

# Pydantic model
class URLRequest(BaseModel):
    url: str

def normalize_url(u: str) -> str:
    s = u.strip()
    return s if re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*://", s) else f"https://{s}"

@lru_cache(maxsize=1024)
def _predict_cached(normalized_url: str):
    features = extract_features(normalized_url)
    
    expected_features = [
        "url_length", "num_digits", "num_special", "has_https", "num_dots",
        "has_at", "has_ip", "url_depth", "has_keywords", "hostname_length",
        "is_top_domain", "suspicious_tld", "url_entropy", "hyphen_count",
        "longest_digit_seq", "levenshtein_sim_top",
    ]
    
    X = np.array([[features[f] for f in expected_features]], dtype=np.float32)
    
    # Get prediction probabilities using pickle model
    pred_proba = model.predict_proba(X)[0]
    
    # Determine prediction
    prediction_idx = int(np.argmax(pred_proba))
    final_probability = float(pred_proba[prediction_idx])
    
    # Create probability dictionary
    probability_dict = {
        label_encoder.classes_[i]: float(pred_proba[i])
        for i in range(len(label_encoder.classes_))
    }
    
    label = label_encoder.inverse_transform([prediction_idx])[0]
    
    return {
        "prediction": label,
        "probability": final_probability,
        "probabilities": probability_dict,
    }

@app.post("/predict")
def predict_url(data: URLRequest):
    try:
        normalized_url = normalize_url(data.url)
        print(f"Received URL: {data.url} -> Normalized: {normalized_url}")
        return _predict_cached(normalized_url)
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "healthy", "model_loaded": model is not None}

handler = Mangum(app) 