import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  runTransaction,
} from "firebase/firestore";
import { db } from "../src/firebase/firebaseConfig";
import { QRCodeCanvas } from "qrcode.react";
import { Html5QrcodeScanner } from "html5-qrcode";

const getUserId = () => localStorage.getItem("userId");

export default function Cards() {
  const navigate = useNavigate();
  const userId = getUserId();

  const [requests, setRequests] = useState([]);
  const [scanRequestId, setScanRequestId] = useState(null);
  const scannerRef = useRef(null);
  const scanLock = useRef(false);

  /* ================= FETCH REQUESTS ================= */
  useEffect(() => {
    const q = query(collection(db, "requests"), orderBy("createdAt", "desc"));
    return onSnapshot(q, (snap) => {
      setRequests(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
  }, []);

  /* ================= ACCEPT REQUEST ================= */
  const handleHelp = async (req) => {
    if (!userId) return alert("Login required");
    if (req.requesterId === userId) return;

    try {
      await runTransaction(db, async (tx) => {
        const ref = doc(db, "requests", req.id);
        const snap = await tx.get(ref);

        if (!snap.exists()) return;
        if (snap.data().helperId) throw new Error();

        tx.update(ref, {
          helperId: userId,
          status: "in_progress",
          bookState: "requested",
        });
      });

      navigate(`/chat/${req.id}`);
    } catch {
      alert("Request already taken");
    }
  };

  /* ================= REQUESTER CLOSE (ONLY BEFORE BORROWED) ================= */
  const closeRequest = async (req) => {
    if (req.bookState === "borrowed") {
      return alert("Cannot close while book is borrowed");
    }

    if (!window.confirm("Close this request permanently?")) return;

    await runTransaction(db, async (tx) => {
      const ref = doc(db, "requests", req.id);
      tx.update(ref, {
        status: "completed",
        bookState: "closed",
      });
    });
  };

  /* ================= QR SCANNER (2-SCAN LOGIC) ================= */
  useEffect(() => {
    if (!scanRequestId) return;
    scanLock.current = false;

    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 220 },
      false
    );

    scannerRef.current = scanner;

    scanner.render(async (decodedText) => {
      if (scanLock.current) return;
      scanLock.current = true;

      try {
        const parsed = JSON.parse(decodedText);
        if (parsed.requestId !== scanRequestId) {
          alert("Wrong QR ❌");
          scanLock.current = false;
          return;
        }

        await runTransaction(db, async (tx) => {
          const ref = doc(db, "requests", scanRequestId);
          const snap = await tx.get(ref);
          if (!snap.exists()) return;

          const data = snap.data();
          if (data.status === "completed") return;

          /* ✅ EXACT 2-SCAN STATE MACHINE */
          if (data.bookState === "requested") {
            // Scan 1 → Book handed over
            tx.update(ref, { bookState: "borrowed" });
          } 
          else if (data.bookState === "borrowed") {
            // Scan 2 → Book returned, request completed
            tx.update(ref, {
              bookState: "returned",
              status: "completed",
            });
          } 
          else {
            throw new Error("Invalid scan");
          }
        });

        alert("Scan successful ✅");
        scanner.clear();
        setScanRequestId(null);
      } catch {
        alert("Invalid QR ❌");
        scanLock.current = false;
      }
    });

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [scanRequestId]);

  /* ================= UI ================= */
  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>📚 Book Requests</h1>

      <div style={styles.grid}>
        {requests.map((req) => {
          const isRequester = req.requesterId === userId;
          const isHelper = req.helperId === userId;
          const closed = req.status === "completed";

          return (
            <div key={req.id} style={styles.card}>
              <h3>{req.subject}</h3>
              <p>{req.reason}</p>
              <p style={styles.meta}>📍 {req.location}</p>

              <p>
                <b>Status:</b>{" "}
                {req.bookState === "requested" && "Waiting for pickup"}
                {req.bookState === "borrowed" && "Book borrowed"}
                {req.bookState === "returned" && "Completed"}
                {req.bookState === "closed" && "Closed"}
              </p>

              {!closed && (
                <div style={styles.actions}>
                  {!isRequester && !req.helperId && (
                    <button
                      style={styles.primaryBtn}
                      onClick={() => handleHelp(req)}
                    >
                      🤝 Help
                    </button>
                  )}

                  {(isRequester || isHelper) && (
                    <button
                      style={styles.outlineBtn}
                      onClick={() => navigate(`/chat/${req.id}`)}
                    >
                      💬 Chat
                    </button>
                  )}

                  {isRequester && (
                    <>
                      <div style={styles.qrBox}>
                        <QRCodeCanvas
                          value={JSON.stringify({ requestId: req.id })}
                          size={140}
                        />
                      </div>

                      <button
                        style={styles.dangerBtn}
                        onClick={() => closeRequest(req)}
                      >
                        🔒 Close Request
                      </button>
                    </>
                  )}

                  {isHelper && (
                    <button
                      style={styles.scanBtn}
                      onClick={() => setScanRequestId(req.id)}
                    >
                      📷 Scan
                    </button>
                  )}
                </div>
              )}

              {closed && <div style={styles.overlay}>🔒 Completed</div>}
            </div>
          );
        })}
      </div>

      {scanRequestId && (
        <div style={styles.scannerWrap}>
          <h3 style={{ color: "#fff" }}>Scan Requester QR</h3>
          <div id="qr-reader" style={{ width: "100%", maxWidth: 320 }} />
          <button
            style={styles.cancelBtn}
            onClick={() => setScanRequestId(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    minHeight: "100vh",
    padding: 16,
    background: "linear-gradient(135deg,#fff7ed,#fef3c7)",
  },
  heading: {
    textAlign: "center",
    marginBottom: 20,
    color: "#b45309",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: 16,
    maxWidth: 1100,
    margin: "auto",
  },
  card: {
    position: "relative",
    background: "#fff",
    borderRadius: 16,
    padding: 16,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },
  meta: { fontSize: 13, opacity: 0.7 },
  actions: {
    marginTop: 12,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  primaryBtn: {
    width: "100%",
    background: "#f59e0b",
    border: "none",
    borderRadius: 12,
    padding: 10,
    cursor: "pointer",
  },
  outlineBtn: {
    width: "100%",
    border: "2px solid #f59e0b",
    background: "transparent",
    borderRadius: 12,
    padding: 10,
    cursor: "pointer",
  },
  scanBtn: {
    width: "100%",
    background: "#22c55e",
    border: "none",
    borderRadius: 12,
    padding: 10,
    cursor: "pointer",
  },
  dangerBtn: {
    width: "100%",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: 10,
    cursor: "pointer",
  },
  qrBox: {
    display: "flex",
    justifyContent: "center",
  },
  overlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(15,23,42,0.85)",
    borderRadius: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: 700,
  },
  scannerWrap: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    zIndex: 1000,
    padding: 16,
  },
  cancelBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: 14,
    padding: "10px 18px",
    cursor: "pointer",
  },
};
