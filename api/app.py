# app.py
from fastapi import FastAPI, HTTPException  # type: ignore
from pydantic import BaseModel  # type: ignore
import joblib  # type: ignore
# import onnxruntime as rt  # Commented out to reduce size
import numpy as np
from pathlib import Path
from urllib.parse import urlparse
from collections import Counter
from rapidfuzz import fuzz  # type: ignore
import re
import math
from fastapi.middleware.cors import CORSMiddleware  # type: ignore
from functools import lru_cache
from mangum import Mangum

# Configure FastAPI for Vercel deployment
app = FastAPI(
    title="PhishGuard ML API",
    description="Machine Learning API for phishing detection",
    version="1.0.0"
)

# Allow requests from your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://phishguard-ml-production.up.railway.app",
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model and label encoder (robust paths + fallback)
BASE_DIR = Path(__file__).resolve().parent
# MODELS_DIR = BASE_DIR / "models"
# print(BASE_DIR)
PRIMARY_MODEL_PATH ="models/model_XGBClassifier.pkl"
PRIMARY_ENCODER_PATH ="models/label_encoder_XGBClassifier.pkl"
print(PRIMARY_MODEL_PATH)
print(PRIMARY_ENCODER_PATH)

# Load all domains from file
TOP_DOMAINS_PATH = BASE_DIR / "top_domains.txt"

with open(TOP_DOMAINS_PATH, "r") as f:
    all_domains = [line.strip().lower() for line in f if line.strip()]

# Choose top N domains for similarity
N = 100  # change to 100 / 500 / 1000 as needed
TOP_DOMAINS = all_domains[:N]

# Suspicious TLDs often seen in phishing
SUSPICIOUS_TLDS = {".tk", ".ml", ".ga", ".cf", ".gq", ".xyz", ".club", ".top", ".work"}


model = None
label_encoder = None


def _load_model_and_encoder(model_path: Path, encoder_path: Path):
    # Load pickle model instead of ONNX for smaller size
    loaded_model = joblib.load(str(model_path))
    loaded_encoder = joblib.load(str(encoder_path))

    return loaded_model, loaded_encoder


def shannon_entropy(text: str) -> float:
    if not text:
        return 0.0
    counts = Counter(text)
    length = len(text)
    entropy = 0.0
    for c in counts.values():
        p = c / length
        entropy -= p * math.log2(p)
    return float(entropy)


def longest_digit_run(text: str) -> int:
    max_run = 0
    current = 0
    for ch in text:
        if ch.isdigit():
            current += 1
            if current > max_run:
                max_run = current
        else:
            current = 0
    return max_run





try:
    model, label_encoder = _load_model_and_encoder(
        PRIMARY_MODEL_PATH, PRIMARY_ENCODER_PATH
    )
    print("Loaded primary model and encoder successfully")
except Exception as primary_error:
    print(f"Primary model load failed: {primary_error}")
    print("Attempting to load fallback model and encoder...")
    try:
        model, label_encoder = _load_model_and_encoder(
            PRIMARY_MODEL_PATH, PRIMARY_ENCODER_PATH
        )
        print("Loaded fallback model and encoder successfully")
    except Exception as fallback_error:
        print(f"Fallback model load failed: {fallback_error}")
        raise RuntimeError(f"Failed to load any model. Tried: {PRIMARY_MODEL_PATH}")


# ======= Feature extraction function (same as training) =======
def extract_features(url):
    # Extract hostname from URL
    try:
        parsed = urlparse(url)
        hostname = parsed.netloc
        scheme = parsed.scheme or ""
    except:  # noqa: E722
        hostname = url.split("/")[0] if "/" in url else url
        scheme = (
            "https"
            if url.lower().startswith("https://")
            else ("http" if url.lower().startswith("http://") else "")
        )

    # Define phishing keywords
    phishing_keywords = [
        "login",
        "signin",
        "verify",
        "account",
        "secure",
        "update",
        "confirm",
        "webscr",
        "ebayisapi",
        "banking",
        "service",
        "payment",
        "paypal",
        "security",
        "billing",
        "credential",
        "support",
        "unlock",
        "submit",
        "validate",
        "recovery",
        "purchase",
        "checkout",
        "order",
        "wallet",
        "transfer",
        "invoice",
        "bonus",
        "free",
        "reward",
        "alert",
        "notification",
        "official",
        "customer",
        "safe",
        "portal",
        "authenticate",
        "session",
        "id",
        "password",
        "user",
        "signinpage",
        "phishing",
        "fraud",
        "malware",
        "scam",
        "hack",
        "suspicious",
    ]

    # Derive TLD for suspicious TLD detection
    try:
        parsed = urlparse(url)
        hostname = parsed.netloc or parsed.path.split("/")[0]
        scheme = parsed.scheme
    except:  # noqa: E722
        parsed = urlparse("http://" + url)
        hostname = parsed.netloc
        scheme = parsed.scheme

    domain = hostname.replace("www.", "").split(":")[0]
    tld = "." + domain.split(".")[-1] if "." in domain else ""
    # Return features in the exact order the model expects
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
        "suspicious_tld": int(tld.lower() in SUSPICIOUS_TLDS),
        "url_entropy": shannon_entropy(url),
        "hyphen_count": url.count("-"),
        "longest_digit_seq": longest_digit_run(url),
        "levenshtein_sim_top": max(
            [fuzz.ratio(domain, td) / 100.0 for td in TOP_DOMAINS]
        )
        if TOP_DOMAINS
        else 0.0,
    }
    return features


# ======= Pydantic model for request validation =======
class URLRequest(BaseModel):
    url: str


# ======= API endpoint =======
def normalize_url(u: str) -> str:
    s = u.strip()
    return s if re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*://", s) else f"https://{s}"


@lru_cache(maxsize=1024)
def _predict_cached(normalized_url: str):
    # 1) Extract features
    features = extract_features(normalized_url)

    # 2) Order features exactly as during training
    expected_features = [
        "url_length",
        "num_digits",
        "num_special",
        "has_https",
        "num_dots",
        "has_at",
        "has_ip",
        "url_depth",
        "has_keywords",
        "hostname_length",
        "is_top_domain",
        "suspicious_tld",
        "url_entropy",
        "hyphen_count",
        "longest_digit_seq",
        "levenshtein_sim_top",
    ]
    X = np.array([[features[f] for f in expected_features]], dtype=np.float32)

    # Pickle model prediction - get probabilities directly
    pred_proba = model.predict_proba(X)[0]

    # Handle ONNX output - XGBoost typically outputs probabilities for both classes
    if len(pred_proba) == 2:
        # Binary classification with 2 probability outputs [P(class=0), P(class=1)]
        # According to the notebook, class 0 = 'bad', class 1 = 'good'
        prob_bad = float(pred_proba[0])  # P(class=0)
        prob_good = float(pred_proba[1])  # P(class=1)

        # Determine prediction based on higher probability
        if prob_bad > prob_good:
            prediction_idx = 0  # bad
            final_probability = prob_bad
        else:
            prediction_idx = 1  # good
            final_probability = prob_good

        probability_dict = {
            label_encoder.classes_[0]: prob_bad,  # bad
            label_encoder.classes_[1]: prob_good,  # good
        }

    elif len(pred_proba) == 1:
        # Single probability output (unlikely for XGBoost, but handle it)
        predicted_probability = float(pred_proba[0])
        prediction_idx = int(predicted_probability >= 0.5)

        if prediction_idx == 0:
            # Predicted as class 0 (bad)
            probability_dict = {
                label_encoder.classes_[0]: float(1 - predicted_probability),  # bad
                label_encoder.classes_[1]: float(predicted_probability),  # good
            }
            final_probability = float(1 - predicted_probability)
        else:
            # Predicted as class 1 (good)
            probability_dict = {
                label_encoder.classes_[0]: float(1 - predicted_probability),  # bad
                label_encoder.classes_[1]: float(predicted_probability),  # good
            }
            final_probability = float(predicted_probability)
    else:
        # Multi-class classification (unlikely for binary XGBoost)
        prediction_idx = int(np.argmax(pred_proba))
        final_probability = float(pred_proba[prediction_idx])
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

@app.get("/test")
def test():
    print("Test endpoint called")
    return {"message": "Test endpoint working"}

@app.get("/")
def root():
    return {"message": "PhishGuard ML API is running", "endpoints": ["/predict", "/health"]}

@app.get("/health")
def health_check():
    print("Health check endpoint called")
    try:
        model_status = model is not None
        print(f"Model loaded: {model_status}")
        result = {"status": "healthy", "model_loaded": model_status}
        print(f"Returning: {result}")
        return result
    except Exception as e:
        print(f"Error in health check: {e}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict")
def predict_url(data: URLRequest):
    try:
        normalized_url = normalize_url(data.url)
        print(f"Received URL: {data.url} -> Normalized: {normalized_url}")
        return _predict_cached(normalized_url)
    except Exception as e:
        print(f"Error in prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


handler = Mangum(app)
