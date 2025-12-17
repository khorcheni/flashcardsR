import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

interface Props {
  onSwitch: () => void;
}

const Register: React.FC<Props> = ({ onSwitch }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

const handleRegister = async () => {
  setError("");
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user.email);
  } catch (e: any) {
    console.error("Firebase register error:", e.code, e.message);
    setError(e.message);
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
        <h2 style={{ fontSize: "1.25rem", fontWeight: "bold", marginBottom: "12px" }}>Register</h2>
        {error && <div style={{ color: "#e74c3c" }}>{error}</div>}
        <input
          style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: "1rem" }}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc", fontSize: "1rem" }}
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
          onClick={handleRegister}
        >
          Create account
        </button>
        <button
          style={{
            fontSize: "0.875rem",
            background: "none",
            border: "none",
            color: "#4a90e2",
            cursor: "pointer",
            marginTop: 4,
            textAlign: "center",
          }}
          onClick={onSwitch}
        >
          Already have an account?
        </button>
      </div>
    </div>
  );
};

export default Register;
