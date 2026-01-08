import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../src/firebase/firebaseConfig";

const getUserId = () => localStorage.getItem("userId");

export default function QRScanner() {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(
      async (decodedText) => {
        try {
          const data = JSON.parse(decodedText);

          if (data.type === "request") {
            await updateDoc(doc(db, "requests", data.requestId), {
              helperId: getUserId(),
              status: "in_progress",
            });

            alert("Book borrowing confirmed!");
            scanner.clear();
          }
        } catch (e) {
          alert("Invalid QR code");
        }
      },
      (err) => console.warn(err)
    );

    return () => scanner.clear();
  }, []);

  return (
    <div>
      <h3>Scan Request QR</h3>
      <div id="reader" style={{ width: 300 }} />
    </div>
  );
}
