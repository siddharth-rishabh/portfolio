// import { useState } from "react";

export default function Photos({ setScene }) {

  const photos = [
    "/p1.webp",
    "/p2.webp",
    "/p3.webp",
    "/p4.webp",
    "/p5.webp",
  ];

  return (
    <div className="photos-scene">

      <h1 className="photos-title">Moments</h1>
        <div className="photo-blob orange"></div>
<div className="photo-blob blue"></div>
      <div className="photos-container">
        {photos.map((src, i) => (
          <div key={i} className={`photo-card card-${i}`}>
            <img src={src} alt="memory" />
          </div>
        ))}
      </div>

      <button className="back-btn-2" onClick={() => setScene("wall2")}>
        ← Back
      </button>

    </div>
  );
}