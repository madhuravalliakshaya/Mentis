import React from 'react';
import Cards from './cards.jsx';
import { Link } from 'react-router-dom';

function Need() {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Cards />

      <Link to="/form">
        <button
          style={{
            padding:"10px 20px",
            marginTop:"20px",
            backgroundColor:"#FACC15",
            color:"#1F2937",
            border:"none",
            borderRadius:"8px",
            fontWeight:"bold",
            cursor:"pointer",
            boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
          }}
        >
          Make a New Request
        </button>
      </Link>
    </div>
  );
}

export default Need;
