import React from "react";
import { auth } from "./firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function Login({ onLogin }) {
  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem("userId", user.uid);
    onLogin();
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "#f5f5f5" }}>
      <h2>Login</h2>
      <button onClick={loginWithGoogle} style={{ padding: 10, borderRadius: 5, border: "none", background: "#4CAF50", color: "#fff" }}>
        Sign in with Google
      </button>
    </div>
  );
}

