
import firebase_admin
from firebase_admin import credentials
cred = credentials.Certificate(r"C:\flashcardsR\flashcards-flask\flashcards-react-53345-firebase-adminsdk-fbsvc-43be6c2223.json")
firebase_admin.initialize_app(cred)
from flask import Flask
from flask_cors import CORS
from routes.decks import deck_bp



app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # allow all origins for /api/*
 # allow cross-origin requests

# Register blueprints
app.register_blueprint(deck_bp, url_prefix='/api/decks')

if __name__ == "__main__":
    app.run(port=5000, debug=True)
