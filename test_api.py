import requests
import json

# Test the health endpoint
print("Testing /health endpoint...")
try:
    response = requests.get("http://127.0.0.1:8000/health", timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    print(f"Headers: {dict(response.headers)}")
except Exception as e:
    print(f"Error: {e}")

print("\n" + "="*50 + "\n")

# Test the root endpoint
print("Testing / endpoint...")
try:
    response = requests.get("http://127.0.0.1:8000/", timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    print(f"Headers: {dict(response.headers)}")
except Exception as e:
    print(f"Error: {e}")

print("\n" + "="*50 + "\n")

# Test the predict endpoint
print("Testing /predict endpoint...")
try:
    data = {"url": "https://google.com"}
    response = requests.post("http://127.0.0.1:8000/predict", 
                           json=data, 
                           timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
    print(f"Headers: {dict(response.headers)}")
except Exception as e:
    print(f"Error: {e}")
