import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

interface Props {
  onSwitch: () => void;
  onLogin: (email: string) => void;
}

const Login: React.FC<Props> = ({ onSwitch, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    // 🔒 Basic validation
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // ✅ Successful login
      onLogin(userCredential.user.email || "");
    } catch (e: any) {
      // 🔍 Friendly Firebase error handling
      switch (e.code) {
        case "auth/user-not-found":
          setError("User does not exist");
          break;
        case "auth/wrong-password":
          setError("Wrong password");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/too-many-requests":
          setError("Too many attempts. Try again later.");
          break;
        default:
          setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f4f8",
      }}
    >
      <div
        style={{
          padding: "24px",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "20rem",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
          Login
        </h2>

        {error && (
          <div style={{ color: "#e74c3c", fontSize: "0.9rem" }}>
            {error}
          </div>
        )}

        <input
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={{
            width: "100%",
            padding: 8,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          style={{
            width: "100%",
            padding: 8,
            border: "none",
            borderRadius: 6,
            backgroundColor: "#27ae60",
            color: "white",
            cursor: "pointer",
            marginTop: 8,
          }}
          onClick={handleLogin}
        >
          Login
        </button>

        <button
          style={{
            fontSize: "0.875rem",
            background: "none",
            border: "none",
            color: "#4a90e2",
            cursor: "pointer",
            marginTop: 4,
          }}
          onClick={onSwitch}
        >
          Don't have an account?
        </button>
      </div>
    </div>
  );
};

export default Login;
