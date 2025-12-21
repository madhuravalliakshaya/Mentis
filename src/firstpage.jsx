import React, { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [syllabus, setSyllabus] = useState("");
  const [books, setBooks] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSyllabusChange = (e) => {
    setSyllabus(e.target.value);
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image.");
    if (!syllabus.trim()) return alert("Please enter your syllabus.");

    try {
      const buffer = await file.arrayBuffer();

      const res = await fetch("http://localhost:3000/upload", {
        method: "POST",
        headers: {
          "Content-Type": file.type, // matches express.raw()
          "X-Syllabus": syllabus.trim(), // send syllabus in header
        },
        body: buffer,
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (data.error) {
        alert(data.error);
        setBooks([]);
      } else {
        setBooks(data.rankedBooks || []);
      }
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Failed to upload image.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book OCR + Ranking</h2>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <br />
      <textarea
        placeholder="Enter syllabus/topics"
        value={syllabus}
        onChange={handleSyllabusChange}
        rows={4}
        cols={50}
        style={{ marginTop: "10px" }}
      />
      <br />
      <button onClick={handleUpload} style={{ marginTop: "10px" }}>
        Upload & Analyze
      </button>

      <h3>Ranked Books:</h3>
      <ul>
        {books.map((book, i) => (
          <li key={i} style={{ marginBottom: "10px" }}>
            <strong>{book.title}</strong> (Score: {book.relevanceScore})<br />
            Summary: {book.summary}
          </li>
        ))}
      </ul>
    </div>
  );
}
