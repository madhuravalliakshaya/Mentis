import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../src/firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function NgoList() {
  const [ngos, setNgos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "ngos"), (snap) => {
      setNgos(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, []);

  if (!ngos.length) return <p style={{padding: 20}}>No NGOs found</p>;

  return (
    <div style={{ maxWidth: 720, margin: "auto", padding: 20 }}>
      <h2>NGO List</h2>
      {ngos.map(ngo => (
        <div key={ngo.id} style={{ marginBottom: 12, padding: 12, border: "1px solid #ccc", borderRadius: 8 }}>
          <h3>{ngo.name}</h3>
          <p><strong>City:</strong> {ngo.city}</p>
          <p>{ngo.description}</p>
          <div>
            <strong>Needs:</strong>{" "}
            {Array.isArray(ngo.needs) 
              ? ngo.needs.map((n, i) => <span key={i} style={{marginRight: 6}}>{n}</span>) 
              : "No needs specified"}
          </div>
          <button
            onClick={() => navigate(`/donate/${ngo.id}`)}
            style={{ marginTop: 10, padding: "6px 12px", borderRadius: 6, border: "none", backgroundColor: "#F59E0B", color: "#fff", cursor: "pointer" }}
          >
            Donate Books
          </button>
        </div>
      ))}
    </div>
  );
}
