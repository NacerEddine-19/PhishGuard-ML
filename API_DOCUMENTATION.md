## API Documentation — PhishGuard (FastAPI)

This document describes the public HTTP API exposed by the FastAPI backend located at `src/backend/app.py`.

### Base URLs
- Local (default during development): `http://127.0.0.1:8000`
- Vercel (co-located serverless function): use the `/api` prefix, e.g. `/api/predict`
  - Frontend can be configured via `VITE_API_URL` to point to a fully qualified API base when needed.

### Authentication
- None. All endpoints are public for demo purposes.

### Content Type
- Requests: `application/json`
- Responses: `application/json; charset=utf-8`

### CORS
Default allowed origins in the app include local dev: `http://localhost:5173`.
When deploying (e.g., to Vercel), broaden `allow_origins` to include your deployed frontend domain(s).

---

## Endpoints

### POST /predict
Predict whether a given URL is phishing or legitimate using the trained model.

#### Request
- Body schema:
```json
{
  "url": "string"
}
```

Example:
```json
{
  "url": "https://secure-login.example.com/update"
}
```

#### Response (200 OK)
- Body schema:
```json
{
  "prediction": "string",
  "probability": 0,
  "probabilities": { "string": 0 }
}
```

- Field descriptions:
  - `prediction` (string): Predicted class label (derived from the model’s label encoder).
  - `probability` (number): Probability of the predicted class (0–1).
  - `probabilities` (object): Map of class label → probability for all classes known to the model.

Example:
```json
{
  "prediction": "phishing",
  "probability": 0.93,
  "probabilities": {
    "legitimate": 0.07,
    "phishing": 0.93
  }
}
```

#### Errors
- 422 Unprocessable Entity: Request validation error (e.g., missing or non-string `url`).
- 500 Internal Server Error: Unexpected server/model error.

Error example (500):
```json
{
  "detail": "<error message>"
}
```

#### Examples

Curl:
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"url":"https://secure-login.example.com/update"}' \
  http://127.0.0.1:8000/predict
```

JavaScript (fetch):
```javascript
const API_BASE = import.meta.env?.VITE_API_URL || "http://127.0.0.1:8000";

async function predictURL(url) {
  const res = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}
```

Python (requests):
```python
import requests

resp = requests.post(
    "http://127.0.0.1:8000/predict",
    json={"url": "https://secure-login.example.com/update"},
    timeout=10,
)
resp.raise_for_status()
print(resp.json())
```

---

## Notes on Feature Extraction (Server-Side)
Clients only send a `url`. The server extracts features internally, including but not limited to:
- `url_length`, `num_digits`, `num_special`, `has_https`, `num_dots`, `has_at`, `has_ip`, `url_depth`, `has_keywords`, `hostname_length`
Additional derived signals may be computed, but the exact set used depends on the trained model’s expected feature set.

---

## OpenAPI & Interactive Docs
- Swagger UI: `/docs`
- ReDoc: `/redoc`
- OpenAPI spec: `/openapi.json`

These are available on the same base URL as the API (e.g., `http://127.0.0.1:8000/docs`).

---

## Local Development
Run the API locally with Uvicorn from the repository root:
```bash
uvicorn src.backend.app:app --reload --host 127.0.0.1 --port 8000
```

## Deployment Notes
- When deploying to Vercel as a Python serverless function, route API calls under `/api` (see `VERCEL_DEPLOYMENT.md`).
- Ensure model files under `src/models/` are included in the deployment package so they can be loaded at runtime.

