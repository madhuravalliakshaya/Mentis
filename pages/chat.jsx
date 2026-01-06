import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../src/firebase/firebaseConfig";

const getUserId = () => localStorage.getItem("userId");

export default function Chat() {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const userId = getUserId();

  const [request, setRequest] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const loadRequest = async () => {
      const snap = await getDoc(doc(db, "requests", requestId));
      if (!snap.exists()) return navigate("/");

      const data = snap.data();
      if (data.requesterId !== userId && data.helperId !== userId) {
        alert("You cannot view this chat");
        return navigate("/");
      }
      setRequest(data);
    };
    loadRequest();
  }, [requestId, navigate]);

  useEffect(() => {
    const q = query(collection(db, "requests", requestId, "messages"), orderBy("timestamp", "asc"));
    return onSnapshot(q, snap => setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, [requestId]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    await addDoc(collection(db, "requests", requestId, "messages"), {
      sender: userId,
      type: "text",
      text: text.trim(),
      timestamp: serverTimestamp(),
    });
    setText("");
  };

  const shareLocation = async () => {
    if (!request?.location) return;
    await addDoc(collection(db, "requests", requestId, "messages"), {
      sender: userId,
      type: "location",
      city: request.location,
      timestamp: serverTimestamp(),
    });
  };

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!request) return <p>Loading chat...</p>;

  return (
    <div style={{ maxWidth: 720, margin: "auto", padding: 20, display: "flex", flexDirection: "column", height: "90vh", border: "1px solid #ddd", borderRadius: 10 }}>
      <div style={{ marginBottom: 10, display: "flex", justifyContent: "space-between" }}>
        <h3>{request.subject}</h3>
        <button onClick={() => navigate("/need")}>← Back</button>
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: 10, display: "flex", flexDirection: "column", gap: 6, background: "#f5f5f5", borderRadius: 8 }}>
        {messages.map(m => {
          const isMe = m.sender === userId;
          if (m.type === "location") {
            return (
              <div key={m.id} style={{ alignSelf: isMe ? "flex-end" : "flex-start", background: "#D1FAE5", padding: 8, borderRadius: 12, maxWidth: "80%", fontStyle: "italic", color: "#065F46" }}>
                📍 {m.city}
              </div>
            );
          }
          return (
            <div key={m.id} style={{ alignSelf: isMe ? "flex-end" : "flex-start", background: isMe ? "#DCF8C6" : "#FFF", padding: 8, borderRadius: 12, maxWidth: "80%", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
              {m.text}
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
        <input style={{ flex: 1, padding: 10, borderRadius: 12, border: "1px solid #ccc" }} placeholder="Type a message..." value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()} />
        <button onClick={sendMessage}>Send</button>
        <button onClick={shareLocation}>📍</button>
      </div>
    </div>
  );
}
