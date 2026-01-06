import { Routes, Route, Link } from "react-router-dom";
import App from "../src/App.jsx";
import Need from "./need.jsx";
import Chat from "./chat.jsx";
import Form from "./form.jsx";
import Login from "../src/login.jsx";
import Explore from "../src/Explore.jsx";
import Donate from "./donate.jsx";
import NgoList from "./list.jsx"; // DF renamed for clarity
import "./home.css";

function Home() {
  const style = {
    color: "#fff",
    fontWeight: "700",
    fontSize: "18px",
    fontFamily: "'Inter', cursive",
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: "10px",
    transition: "background 0.2s ease",
  };

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
          width: "100%",
          boxSizing: "border-box",
          background: "rgba(247, 182, 17, 1)",
        }}
      >
        <Link style={style} to="/">Explore</Link>
        <Link style={style} to="/upload">Discover</Link>
        <Link style={style} to="/need">Request</Link>
        <Link style={style} to="/donate">Contribute</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Explore />} />
        <Route path="/upload" element={<App />} />
        <Route path="/need" element={<Need />} />
        <Route path="/form" element={<Form />} />
        <Route path="/chat/:requestId" element={<Chat />} />
        <Route path="/ngos" element={<NgoList />} />

        {/* Donate routes */}
        <Route path="/donate" element={<NgoList />} /> {/* Shows list of NGOs */}
        <Route path="/donate/:ngoId" element={<Donate />} /> {/* Donate to selected NGO */}
      </Routes>
    </>
  );
}

export default Home;
