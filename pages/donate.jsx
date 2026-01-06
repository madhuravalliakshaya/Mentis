import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../src/firebase/firebaseConfig";

export default function Donate() {
  const { ngoId } = useParams();
  const navigate = useNavigate();
  const [ngo, setNgo] = useState(null);
  const [books, setBooks] = useState([{ title: "", subject: "" }]);
  const user = auth.currentUser;

  useEffect(() => {
    const loadNgo = async () => {
      const snap = await getDoc(doc(db, "ngos", ngoId));
      if (!snap.exists()) {
        alert("NGO not found");
        navigate("/donate");
        return;
      }
      setNgo({ id: snap.id, ...snap.data() });
    };
    loadNgo();
  }, [ngoId, navigate]);

  const handleBookChange = (index, field, value) => {
    const newBooks = [...books];
    newBooks[index][field] = value;
    setBooks(newBooks);
  };

  const addAnotherBook = () => setBooks([...books, { title: "", subject: "" }]);

  const submitDonation = async () => {
    if (!user) return alert("Login first!");
    const validBooks = books.filter(b => b.title && b.subject);
    if (!validBooks.length) return alert("Add at least one book");

    await addDoc(collection(db, "donations"), {
      donorId: user.uid,
      donorEmail: user.email,
      ngoId: ngo.id,
      ngoName: ngo.name,
      books: validBooks,
      status: "pending",
      createdAt: serverTimestamp(),
    });

    alert("Donation submitted!");
    navigate("/donate");
  };

  if (!ngo) return <p>Loading NGO...</p>;

  return (
    <div style={{ maxWidth: 720, margin: "auto", padding: 20 }}>
      <h2>Donate to {ngo.name}</h2>
      {books.map((book, i) => (
        <div key={i} style={{ marginBottom: 12, padding: 10, border: "1px solid #ccc", borderRadius: 8 }}>
          <input
            type="text"
            placeholder="Book title"
            value={book.title}
            onChange={e => handleBookChange(i, "title", e.target.value)}
            style={{ marginBottom: 6, width: "100%", padding: 8 }}
          />
          <input
            type="text"
            placeholder="Subject"
            value={book.subject}
            onChange={e => handleBookChange(i, "subject", e.target.value)}
            style={{ width: "100%", padding: 8 }}
          />
        </div>
      ))}
      <button onClick={addAnotherBook} style={{ marginRight: 10 }}>Add Another Book</button>
      <button onClick={submitDonation} style={{ backgroundColor: "#22C55E", color: "#fff", padding: "8px 16px", border: "none", borderRadius: 6 }}>
        Submit Donation
      </button>
    </div>
  );
}
