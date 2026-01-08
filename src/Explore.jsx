import { useEffect, useState } from "react";
import { auth } from "./firebase/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./login.jsx";
import getDashboardData from "./stats.js";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const data = await getDashboardData(currentUser.uid);
          setDashboard(data);
        } catch (err) {
          console.error("Error fetching dashboard data:", err);
        }
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (loading) return <p style={loadingStyle}>Loading...</p>;

  if (!user) {
    return <Login />;
  }

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>📚 Dashboard</h1>

      {dashboard ? (
        <div style={cardsContainer}>
          <div style={{ ...cardStyle, background: "#4ade80" }}>
            <h2>{dashboard.donated}</h2>
            <p>Books Donated</p>
          </div>
          <div style={{ ...cardStyle, background: "#60a5fa" }}>
            <h2>{dashboard.borrowed}</h2>
            <p>Books Borrowed</p>
          </div>
          <div style={{ ...cardStyle, background: "#fbbf24" }}>
            <h2>{dashboard.requests}</h2>
            <p>Requests Made</p>
          </div>
          <div style={{ ...cardStyle, background: "#f87171" }}>
            <h2>{dashboard.fulfilled}</h2>
            <p>Requests Fulfilled</p>
          </div>
        </div>
      ) : (
        <p style={loadingStyle}>Loading dashboard stats...</p>
      )}

      <button onClick={() => signOut(auth)} style={logoutButtonStyle}>
        Logout
      </button>
    </div>
  );
}

/* ================= STYLES ================= */

const containerStyle = {
  maxWidth: 800,
  margin: "50px auto",
  padding: "20px",
  fontFamily: "'Inter', sans-serif",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "2rem",
  marginBottom: "40px",
  color: "#1e3a8a",
  fontWeight: "bold",
};

const cardsContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "20px",
  marginBottom: "40px",
};

const cardStyle = {
  padding: "20px",
  borderRadius: "15px",
  color: "#fff",
  height: "200px",
  boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const loadingStyle = {
  fontSize: "1.2rem",
  color: "#374151",
};

const logoutButtonStyle = {
  padding: "12px 25px",
  borderRadius: "10px",
  border: "none",
  background: "#f18484ff",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  transition: "transform 0.2s ease, background 0.3s ease",
};

