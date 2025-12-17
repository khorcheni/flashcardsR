import os
import json
import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask
from flask_cors import CORS
from routes.decks import deck_bp  # your blueprint

# -----------------------------
# Initialize Firebase Admin
# -----------------------------
firebase_json = os.environ.get("FIREBASE_ADMIN_JSON")

if firebase_json:
    # Deployment (Render)
    cred = credentials.Certificate(json.loads(firebase_json))
else:
    # Local testing: use file path
    cred_path = r"C:\flashcardsR\flashcards-flask\flashcards-react-53345-firebase-adminsdk-fbsvc-43be6c2223.json"
    cred = credentials.Certificate(cred_path)

# Initialize Firebase app (only once)
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

# Firestore client
db = firestore.client()

# -----------------------------
# Initialize Flask App
# -----------------------------
app = Flask(__name__)

# Allow CORS only from your React frontend
CORS(app, resources={r"/api/*": {"origins": ["https://flashcards-react-53345.web.app"]}})

# Register blueprints
app.register_blueprint(deck_bp, url_prefix="/api/decks")

# -----------------------------
# Main
# -----------------------------
if __name__ == "__main__":
    # For local testing only; on Render use gunicorn
    app.run(port=5000, debug=True)
