import React, { useState } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../src/firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const getUserId = () => localStorage.getItem("userId");

export default function CreateRequest() {
  const [subject, setSubject] = useState("");
  const [reason, setReason] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!subject || !reason || !location) {
      return alert("Please fill all fields");
    }

    setLoading(true);

    try {
      // 🔍 Check if user already has an active request
      const q = query(
        collection(db, "requests"),
        where("requesterId", "==", getUserId()),
        where("status", "in", ["open", "in_progress"])
      );

      const snap = await getDocs(q);

      if (!snap.empty) {
        alert("You already have an active request.");
        setLoading(false);
        return;
      }

      // ✅ Create request in Firestore
      await addDoc(collection(db, "requests"), {
        requesterId: getUserId(),
        subject,
        reason,
        location,
        city: location.toLowerCase(),
        helperId: null,
        status: "open",
        matchedDonationId: null,

        // 🔑 QR-related fields
        qrValue: `REQ_${Date.now()}`,
        qrType: "request",

        createdAt: serverTimestamp(),
      });

      alert("Request created successfully!");

      setSubject("");
      setReason("");
      setLocation("");
      setLoading(false);

      navigate("/need");
    } catch (error) {
      console.error("Error creating request:", error);
      alert("Something went wrong. Try again.");
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Create Book Request</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Book / Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          disabled={loading}
        />

        <textarea
          style={textareaStyle}
          placeholder="Reason for request"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          disabled={loading}
        />

        <input
          style={inputStyle}
          type="text"
          placeholder="City / Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? "Checking..." : "Create Request"}
        </button>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const containerStyle = {
  maxWidth: 500,
  margin: "50px auto",
  padding: 30,
  borderRadius: 16,
  background: "#FFF7ED",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  fontFamily: "'Inter', sans-serif",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: 20,
  color: "#B45309",
};

const inputStyle = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #FCD34D",
  outline: "none",
  fontSize: 14,
};

const textareaStyle = {
  padding: 12,
  borderRadius: 10,
  border: "1px solid #FCD34D",
  outline: "none",
  fontSize: 14,
  resize: "vertical",
  minHeight: 80,
};

const buttonStyle = {
  padding: "12px 0",
  borderRadius: 12,
  border: "none",
  backgroundColor: "#FACC15",
  color: "#1F2937",
  fontWeight: "bold",
  cursor: "pointer",
  fontSize: 16,
};
