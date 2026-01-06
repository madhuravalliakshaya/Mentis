import React, { useState } from "react";
import { addDoc, collection, serverTimestamp, query, where, getDocs } from "firebase/firestore";
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
    if (!subject || !reason || !location) return alert("Please fill all fields");

    setLoading(true);

    try {
      // Check if user already has an active request
      const q = query(
        collection(db, "requests"),
        where("requesterId", "==", getUserId()),
        where("status", "in", ["pending", "in_progress"])
      );
      const snap = await getDocs(q);

      if (!snap.empty) {
        alert("You already have an active request. Complete it before creating a new one.");
        setLoading(false);
        return;
      }

      // Create new request
      await addDoc(collection(db, "requests"), {
        subject,
        reason,
        location,
        requesterId: getUserId(),
        helperId: null,
        status: "pending",
        timestamp: serverTimestamp(),
      });

      alert("Request created successfully!");
      
      // Clear form
      setSubject("");
      setReason("");
      setLocation("");
      setLoading(false);

      // Redirect to requests page
      navigate("/need");

    } catch (err) {
      console.error(err);
      alert("Error creating request");
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: 500,
      margin: "50px auto",
      padding: 30,
      borderRadius: 16,
      background: "#FFF7ED",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      fontFamily: "'Inter', sans-serif"
    }}>
      <h2 style={{ textAlign: "center", marginBottom: 20, color: "#B45309" }}>Create Book Request</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Book / Subject"
          value={subject}
          onChange={e => setSubject(e.target.value)}
          disabled={loading}
        />

        <textarea
          style={textareaStyle}
          placeholder="Reason for request"
          value={reason}
          onChange={e => setReason(e.target.value)}
          disabled={loading}
        />

        <input
          style={inputStyle}
          type="text"
          placeholder="Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            padding: "12px 0",
            borderRadius: 12,
            border: "none",
            backgroundColor: "#FACC15",
            color: "#1F2937",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: 16,
            transition: "0.2s",
          }}
          onMouseOver={e => !loading && (e.currentTarget.style.backgroundColor = "#FBBF24")}
          onMouseOut={e => !loading && (e.currentTarget.style.backgroundColor = "#FACC15")}
        >
          {loading ? "Checking..." : "Create Request"}
        </button>
      </div>
    </div>
  );
}

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
