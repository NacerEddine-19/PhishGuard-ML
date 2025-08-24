export interface PredictionResponse {
    prediction: string;
    probability: number;
    probabilities: Record<string, number>;
}

export async function predictURL(url: string): Promise<PredictionResponse> {
    console.log("Predicting URL:", url);
    const trimmed = url.trim();
    const normalized = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed) ? trimmed : `https://${trimmed}`;
    const response = await fetch("http://127.0.0.1:8000/predict", {
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
