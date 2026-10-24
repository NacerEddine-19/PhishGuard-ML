export interface PredictionResponse {
    prediction: string;
    probability: number;
    probabilities: Record<string, number>;
}


export async function predictURL(url: string){
    console.log("Predicting URL:", url);
    const trimmed = url.trim();
    const normalized = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
    const API_BASE = import.meta.env.VITE_API_URL || "https://phishguard-ml-v2asy.ondigitalocean.app";
const response = await fetch(`${API_BASE}/api/predict`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: normalized }),
});

if (!response.ok) {
    throw new Error(`Prediction API error: ${response.status}`);
}

const result: PredictionResponse = await response.json();
return result;
}
