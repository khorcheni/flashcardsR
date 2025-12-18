import os
import json
import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask
from flask_cors import CORS

# -----------------------------
# Initialize Firebase FIRST
# -----------------------------
firebase_json = os.environ.get("FIREBASE_SERVICE_ACCOUNT")

if not firebase_json:
    raise RuntimeError("FIREBASE_SERVICE_ACCOUNT env var not set")

cred = credentials.Certificate(json.loads(firebase_json))
firebase_admin.initialize_app(cred)

db = firestore.client()

# -----------------------------
# Flask App
# -----------------------------
app = Flask(__name__)
CORS(app)

# Import blueprints AFTER Firebase init
from routes.decks import deck_bp
app.register_blueprint(deck_bp, url_prefix="/api/decks")

# -----------------------------
# Local run
# -----------------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
