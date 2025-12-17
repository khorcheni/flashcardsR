import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 🔹 Hard-coded Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAmKwlRT6gDOkpzVEq6u9R36mTNVcrma78",
  authDomain: "flashcards-react-53345.firebaseapp.com",
  projectId: "flashcards-react-53345",
  appId: "1:500000463158:web:966b6230e86a6b2c70bb97"
};

// 🔹 Console logs for debugging
console.log("Initializing Firebase with config:");
console.log("API KEY:", firebaseConfig.apiKey);
console.log("AUTH DOMAIN:", firebaseConfig.authDomain);
console.log("PROJECT ID:", firebaseConfig.projectId);
console.log("APP ID:", firebaseConfig.appId);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

console.log("Firebase Auth initialized:", auth);
