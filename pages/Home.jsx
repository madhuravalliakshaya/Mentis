import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import App from "../src/App.jsx";
import Need from "./need.jsx";
import Chat from "./chat.jsx";
import Form from "./form.jsx";
import Explore from "../src/Explore.jsx";
import Donate from "./donate.jsx";
import NgoList from "./list.jsx";
import Qrscanner from "./Qrscanner.jsx";
import { auth } from "../src/firebase/firebaseConfig";
import "./home.css";

function Home() {
  const [sidebar, setSidebar] = useState(false);

  return (
    <div className="layout">
      <button
        className="btn"
        onClick={() => setSidebar(!sidebar)}
        title={sidebar ? "Close Menu" : "Open Menu"}
      >
        ☰
      </button>

      <div className={`sidebar ${sidebar ? "open" : ""}`}>
        <h2 className="sidebar-title">Mentis</h2>
        <nav>
          <Link to="/">Explore</Link>
          <Link to="/upload">Discover</Link>
          <Link to="/need">Request</Link>
          <Link to="/donate">Contribute</Link>
        </nav>
      </div>

      <div className={`content ${sidebar ? "shift" : ""}`}>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/upload" element={<App />} />
          <Route path="/need" element={<Need />} />
          <Route path="/form" element={<Form />} />
          <Route path="/chat/:requestId" element={<Chat />} />
          <Route path="/ngos" element={<NgoList />} />
          <Route path="/donate" element={<NgoList />} />
          <Route path="/donate/:ngoId" element={<Donate />} />
          <Route path="/scan" element={<Qrscanner />} />
        </Routes>
      </div>
    </div>
  );
}

export default Home;
