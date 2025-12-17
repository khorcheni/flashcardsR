import os
import json
import firebase_admin
from firebase_admin import credentials
from flask import Flask
from flask_cors import CORS
from routes.decks import deck_bp

# Load Firebase Admin credentials from environment variable
firebase_json = os.environ.get("FIREBASE_ADMIN_JSON")
cred = credentials.Certificate(json.loads(firebase_json))
firebase_admin.initialize_app(cred)

# Initialize Flask app
app = Flask(__name__)

# Enable CORS only for your React frontend
CORS(app, resources={r"/api/*": {"origins": ["https://flashcards-react-53345.web.app"]}})

# Register blueprints
app.register_blueprint(deck_bp, url_prefix='/api/decks')

if __name__ == "__main__":
    app.run(port=5000, debug=True)
