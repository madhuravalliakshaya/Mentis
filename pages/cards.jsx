import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  runTransaction,
  where
} from "firebase/firestore";
import { db } from "../src/firebase/firebaseConfig";

const getUserId = () => localStorage.getItem("userId");

export default function Cards() {
  const navigate = useNavigate();
  const userId = getUserId();
  const [requests, setRequests] = useState([]);
  const [myActiveRequest, setMyActiveRequest] = useState(null);

  // 🔹 Fetch all requests
  useEffect(() => {
    const q = query(collection(db, "requests"), orderBy("timestamp", "desc"));
    return onSnapshot(q, snap =>
      setRequests(snap.docs.map(d => ({ id: d.id, ...d.data() })))
    );
  }, []);

  // 🔹 Check if user already has an active request
  useEffect(() => {
    const q = query(
      collection(db, "requests"),
      where("requesterId", "==", userId),
      where("status", "!=", "completed")
    );
    return onSnapshot(q, snap => {
      setMyActiveRequest(snap.docs.length > 0);
    });
  }, [userId]);

  // 🔹 Handle card click
  const handleHelp = async (req) => {
    // 🚫 requester cannot help themselves
    if (req.requesterId === userId) return;

    // Already taken
    if (req.helperId && req.helperId !== userId) {
      alert("Already taken by another helper");
      return;
    }

    // Navigate if already helper
    if (req.helperId === userId) {
      navigate(`/chat/${req.id}`);
      return;
    }

    // Take request safely
    try {
      await runTransaction(db, async (tx) => {
        const ref = doc(db, "requests", req.id);
        const snap = await tx.get(ref);

        if (snap.data().helperId) throw "taken";

        tx.update(ref, {
          helperId: userId,
          status: "in_progress",
        });
      });

      navigate(`/chat/${req.id}`);
    } catch {
      alert("Someone already took this request");
    }
  };

  const openChat = (id) => navigate(`/chat/${id}`);

  const completeRequest = async (req) => {
    if (req.requesterId !== userId) return;

    await runTransaction(db, async (tx) => {
      tx.update(doc(db, "requests", req.id), {
        status: "completed",
      });
    });

    alert("Request completed");
  };

  return (
    <div style={{ maxWidth: 720, margin: "auto", padding: 20 }}>
      <h2>📚 Book Requests</h2>

      {requests.map(req => {
        const isRequester = req.requesterId === userId;
        const isHelper = req.helperId === userId;
        const isTaken = !!req.helperId;
        const completed = req.status === "completed";

        return (
          <div key={req.id} style={{
            padding: 14,
            marginBottom: 12,
            borderRadius: 12,
            background: completed ? "#e5e7eb" : "#fff7ed",
            opacity: completed ? 0.6 : 1
          }}>
            <h4>{req.subject}</h4>
            <p>{req.reason}</p>
            <p>📍 {req.location}</p>
            <p>Status: <b>{req.status}</b></p>

            {/* CHAT ACCESS */}
            {(isRequester || isHelper) && (
              <button onClick={() => openChat(req.id)}>Open Chat</button>
            )}

            {/* HELP BUTTON */}
            {!isRequester && !isTaken && !completed && (
              <button onClick={() => handleHelp(req)}>I Can Help</button>
            )}

            {/* TAKEN */}
            {!isRequester && isTaken && !isHelper && (
              <button disabled>Taken</button>
            )}

            {/* COMPLETE */}
            {isRequester && req.status === "given" && (
              <button
                onClick={() => completeRequest(req)}
                style={{ marginLeft: 10, background: "#22c55e", color: "#fff" }}
              >
                Complete
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

