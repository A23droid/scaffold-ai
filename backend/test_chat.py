import requests
try:
    resp = requests.post("http://127.0.0.1:8000/chat", json={
        "session_id": "session_1",
        "student_id": "student_1",
        "message": "What is the heart?"
    })
    print(f"Status Code: {resp.status_code}")
    print(f"Response: {resp.text}")
except Exception as e:
    print(f"Request failed: {e}")
