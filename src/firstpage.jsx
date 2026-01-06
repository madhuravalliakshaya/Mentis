import React, { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [syllabus, setSyllabus] = useState("");
  const [books, setBooks] = useState([]);
  const [suggestedBook, setSuggestedBook] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSyllabusChange = (e) => {
    setSyllabus(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image.");
    if (!syllabus.trim()) return alert("Please enter your preferances.");

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
       Upload image of books and add your preferences to find the most relevant books
        </p>

        <div style={styles.section}>
          <label style={styles.label}>Upload Book Image</label>
          <input style={{padding: 10+"px",
        border:"2px solid #ccc",
        borderRadius: 5+"px",
        backgroundColor: "#f9f9f9",
        fontSize: 16+"px"}} type="file" accept="image/*" onChange={handleFileChange}  />
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Enter your preferences</label>
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

      {books.length === 0 && suggestedBook && (
        <div style={styles.results}>
          <h4>no relevant books</h4>
          <h3 style={styles.resultsTitle}>Suggested Book</h3>
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
   backgroundColor:"white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "clamp(24px, 5vw, 48px)",
    fontFamily: "'Inter', Arial, sans-serif",
  },

  card: {
    width: "100%",
    maxWidth: "660px",
    background: "linear-gradient(180deg, #fdea9dff, #FFF9F2)",
    padding: "clamp(22px, 4vw, 34px)",
    borderRadius: "28px",
    boxShadow:
      "0 25px 60px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255,255,255,0.6)",
    marginBottom: "36px",
    position: "relative",
  },

  title: {
    marginBottom: "10px",
    textAlign: "center",
    fontSize: "clamp(26px, 5vw, 32px)",
    fontWeight: "900",
    letterSpacing: "3px",
    color: "#1F2937",
    background:
      "linear-gradient(135deg, #FACC15, #F59E0B)",
    padding: "10px 18px",
    borderRadius: "14px",
    display: "inline-block",
    boxShadow: "0 6px 18px rgba(245, 158, 11, 0.45)",
  },

  subtitle: {
    textAlign: "center",
    color: "#4B5563",
    marginBottom: "32px",
    fontSize: "15px",
    lineHeight: "1.8",
    maxWidth: "520px",
    marginInline: "auto",
  },

section: {
  marginBottom: "20px",
  background: "linear-gradient(180deg, #FFFBEB, #FFF6D6)",
  padding: "16px",
  borderRadius: "18px",
  border: "1px solid #ffffffff",
  width: "100%",
  boxSizing: "border-box",
  boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
}

,

  label: {
    display: "block",
    marginBottom: "10px",
    fontWeight: "700",
    color: "#374151",
    fontSize: "14px",
    letterSpacing: "0.3px",
  },

  textarea: {
    width: "95%",
    padding: "14px",
    borderRadius: "14px",
    border: "1px solid #E5E7EB",
    resize: "none",
    backgroundColor: "#FFFFFF",
    fontSize: "14px",
    outline: "none",
    boxShadow: "inset 0 2px 6px rgba(0,0,0,0.06)",
  },

  button: {
    width: "100%",
    padding: "16px",
    background:
      "linear-gradient(135deg, #f8b42cff, #e5b046ff)",
    color: "#FFFFFF",
    border: "none",
    borderRadius: "16px",
    fontSize: "16px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "18px",
    boxShadow:
      "0 14px 30px rgba(106, 106, 77, 0.4)",
    transition: "transform 0.15s ease, box-shadow 0.15s ease",
  },

  results: {
    width: "100%",
    maxWidth: "660px",
    marginTop: "24px",
  },

  resultsTitle: {
    marginBottom: "18px",
    color: "#1F2937",
    fontSize: "22px",
    fontWeight: "800",
    letterSpacing: "0.5px",
  },

  bookCard: {
    background:
      "linear-gradient(180deg, #FFFFFF, #FFFDF8)",
    padding: "20px",
    borderRadius: "18px",
    marginBottom: "18px",
    boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
    borderLeft: "8px solid #F59E0B",
  },

  bookTitle: {
    marginBottom: "8px",
    color: "#111827",
    fontSize: "17px",
    fontWeight: "700",
  },

  score: {
    color: "#047857",
    marginBottom: "10px",
    fontWeight: "600",
  },

  summary: {
    color: "#4B5563",
    fontSize: "14.5px",
    lineHeight: "1.7",
  },
};
