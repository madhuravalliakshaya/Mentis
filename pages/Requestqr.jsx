import React from "react";
import QRCode from "qrcode.react";

export default function RequestQR({ request }) {

  const qrData = JSON.stringify({
    type: "request",
    requestId: request.id,
  });

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Scan to Borrow</h3>
      <QRCode value={qrData} size={220} />
    </div>
  );
}
