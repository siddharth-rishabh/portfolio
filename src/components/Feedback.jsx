// import { useRef } from "react";

export default function Feedback({ setScene }) {

//   const trackRef = useRef(null);

  const feedbacks = [
    {
      name: "Shobha Chauhan",
      role: "@ Coding Ninja",
      text: "Exceptional leadership and dedication. Successfully led club activities and fostered collaboration."
    },
    {
      name: "Shyna Rani",
      role: "@ Nokia",
      text: "Strong technical expertise, innovation mindset, and leadership skills. Delivers scalable solutions."
    },
    {
      name: "Chinmay Anand",
      role: "@ Genpact",
      text: "Shows professionalism, eagerness to learn, and strong responsibility in work."
    },
    {
      name: "Saumya Karn",
      role: "@ Ideal Prepaid",
      text: "Exceptional individual, fast learner, and strong leadership presence with clarity and confidence."
    },
    {
      name: "Swati Mehta",
      role: "VLSI Engineer",
      text: "Highly dedicated, reliable, and consistently delivers quality work with a positive attitude."
    }
  ];

  // duplicate for smooth infinite loop
  const loopData = [...feedbacks, ...feedbacks];

  return (
    <div className="feedback-scene z-15">

      {/* 🔥 BLURRED BACKGROUND */}
      <div className="feedback-bg"></div>
         <div className="glass-layer"></div>
      {/* 🎬 CAROUSEL */}
      <div className="carousel-track">
        {loopData.map((f, i) => (
          <div key={i} className="feedback-card">

            <p className="text">“{f.text}”</p>

            <div className="meta">
              <span className="author">{f.name}</span>
              <span className="role">{f.role}</span>
            </div>

          </div>
        ))}
      </div>

      {/* ⬅ BACK */}
      <button className="back-btn-2" onClick={() => setScene("wall2")}>
        ← Back
      </button>

    </div>
  );
}