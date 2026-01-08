import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../src/firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function ReceiverList() {
  const [receivers, setReceivers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "ngos"), (snap) => {
      setReceivers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  if (!receivers.length)
    return <p style={{ padding: 20, textAlign: "center" }}>No receivers found</p>;

  return (
    <div style={styles.page}>
      <h2 style={styles.heading}>🤲 People & Organizations in Need</h2>

      {receivers.map((r) => (
        <div key={r.id} style={styles.card}>
          <div style={styles.header}>
            <h3>{r.name}</h3>
            <span style={styles.type}>{r.type}</span>
          </div>

          <p style={styles.meta}>📍 {r.city}</p>

          <p style={styles.desc}>
            {r.description || "No description provided"}
          </p>

          <div style={styles.needs}>
            <strong>Needs:</strong>{" "}
            {Array.isArray(r.needs) && r.needs.length ? (
              r.needs.map((n, i) => (
                <span key={i} style={styles.tag}>{n}</span>
              ))
            ) : (
              <span style={{ opacity: 0.6 }}>No needs specified</span>
            )}
          </div>

          <button
            style={styles.btn}
            onClick={() => navigate(`/donate/${r.id}`)}
          >
            📚 Donate / Help
          </button>
        </div>
      ))}
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    maxWidth: 800,
    margin: "auto",
    padding: 16,
  },
  heading: {
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    background: "#fff",
    padding: 16,
    marginBottom: 14,
    borderRadius: 14,
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  type: {
    background: "#E0F2FE",
    color: "#0369A1",
    padding: "4px 8px",
    borderRadius: 8,
    fontSize: 12,
  },
  meta: {
    fontSize: 13,
    opacity: 0.7,
  },
  desc: {
    margin: "8px 0 12px",
  },
  needs: {
    marginBottom: 12,
  },
  tag: {
    display: "inline-block",
    background: "#FEF3C7",
    color: "#92400E",
    padding: "4px 8px",
    borderRadius: 8,
    marginRight: 6,
    marginTop: 4,
    fontSize: 13,
  },
  btn: {
    width: "100%",
    background: "#22C55E",
    border: "none",
    padding: "10px 14px",
    borderRadius: 10,
    color: "#fff",
    fontSize: 15,
    cursor: "pointer",
  },
};

