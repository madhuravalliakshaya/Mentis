import React, { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [syllabus, setSyllabus] = useState("");
  const [books, setBooks] = useState([]);
  const [suggestedBook, setSuggestedBook] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleSyllabusChange = (e) => setSyllabus(e.target.value);

  const handleUpload = async () => {
    if (!file) return alert("Please select an image.");
    if (!syllabus.trim()) return alert("Please enter your preferences.");

    try {
      const buffer = await file.arrayBuffer();

      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
        headers: {
          "Content-Type": file.type,
          "X-Syllabus": syllabus.trim(),
        },
        body: buffer,
      });

      const data = await res.json();

      if (data.error) {
        alert(data.error);
        setBooks([]);
        setSuggestedBook(null);
      } else {
        setBooks(data.rankedBooks || []);
        setSuggestedBook(data.suggestedBook || null);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to upload image.");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>MENTIS</h2>
        <p style={styles.subtitle}>
          Upload image of your books and add your preferences to get the most relevant suggestions.
        </p>

        <div style={styles.section}>
          <label style={styles.label}>Upload Book Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={styles.input}
          />
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Enter Preferences</label>
          <textarea
            placeholder="Eg: DBMS, normalization, SQL, indexing..."
            value={syllabus}
            onChange={handleSyllabusChange}
            rows={4}
            style={styles.textarea}
          />
        </div>

        <button onClick={handleUpload} style={styles.button}>
          Analyze Books
        </button>
      </div>

      {/* Ranked Books */}
      {books.length > 0 && (
        <div style={styles.results}>
          <h3 style={styles.resultsTitle}>📊 Ranked Books</h3>
          {books.map((book, i) => (
            <div key={i} style={styles.bookCard}>
              <h4 style={styles.bookTitle}>{book.title}</h4>
              <p style={styles.score}>
                Relevance Score: <strong>{book.relevanceScore}</strong>
              </p>
              <p style={styles.summary}>{book.summary}</p>
            </div>
          ))}
        </div>
      )}

      {/* Suggested Book */}
      {books.length === 0 && suggestedBook && (
        <div style={styles.results}>
          <h4 style={styles.noBooks}>No relevant books found</h4>
          <h3 style={styles.resultsTitle}>💡 Suggested Book</h3>
          <div style={styles.bookCard}>
            <h4 style={styles.bookTitle}>{suggestedBook.title}</h4>
            <p style={styles.summary}>{suggestedBook.reason}</p>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#ffffffff", // dark background
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "clamp(24px, 5vw, 48px)",
    fontFamily: "'Inter', Arial, sans-serif",
    color: "#F9FAFB",
  },

  card: {
    width: "100%",
    maxWidth: "660px",
    background: "linear-gradient(145deg, #96baf4ff, #346a98ff)", // dark card
    padding: "clamp(22px, 4vw, 34px)",
    borderRadius: "28px",
    boxShadow: "0 25px 60px rgba(0, 0, 0, 0.25)",
    marginBottom: "36px",
    position: "relative",
    color: "#F9FAFB",
  },

  title: {
    marginBottom: "10px",
    textAlign: "center",
    fontSize: "clamp(26px, 5vw, 32px)",
    fontWeight: "900",
    letterSpacing: "3px",
    color: "#FBBF24",
    padding: "10px 18px",
    borderRadius: "14px",
    display: "inline-block",

  },

  subtitle: {
    textAlign: "center",
    color: "#D1D5DB",
    marginBottom: "32px",
    fontSize: "15px",
    lineHeight: "1.8",
    maxWidth: "520px",
    marginInline: "auto",
  },

  section: {
    marginBottom: "20px",
    background: "#374151",
    padding: "16px",
    borderRadius: "18px",
    border: "1px solid #4B5563",
    width: "100%",
    boxSizing: "border-box",
  },

  label: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "700",
    color: "#FBBF24",
    fontSize: "14px",
    letterSpacing: "0.3px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #9CA3AF",
    backgroundColor: "#1F2937",
    color: "#F9FAFB",
    fontSize: "14px",
  },

  textarea: {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid #9CA3AF",
    backgroundColor: "#111827",
    color: "#F9FAFB",
    fontSize: "14px",
    outline: "none",
    resize: "none",
  },

  button: {
    width: "100%",
    padding: "16px",
    background: "linear-gradient(135deg, #FBBF24, #F59E0B)",
    color: "#111827",
    border: "none",
    borderRadius: "16px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "18px",
  
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  },

  results: {
    width: "100%",
    maxWidth: "660px",
    marginTop: "24px",
  },

  resultsTitle: {
    marginBottom: "18px",
    color: "#FBBF24",
    fontSize: "22px",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },

  bookCard: {
    background: "#111827",
    padding: "20px",
    borderRadius: "18px",
    marginBottom: "18px",
    boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
    borderLeft: "6px solid #FBBF24",
  },

  bookTitle: {
    marginBottom: "8px",
    color: "#F9FAFB",
    fontSize: "17px",
    fontWeight: "700",
  },

  score: {
    color: "#34D399",
    marginBottom: "10px",
    fontWeight: "600",
  },

  summary: {
    color: "#D1D5DB",
    fontSize: "14.5px",
    lineHeight: "1.7",
  },

  noBooks: {
    marginBottom: "10px",
    color: "#F87171",
    fontWeight: "600",
    fontSize: "16px",
  },
};
