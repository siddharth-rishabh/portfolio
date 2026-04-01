import { useEffect, useState } from "react";

export default function Achievements({ setScene }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  // 🎯 Mouse Parallax
  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // ⏳ Floating animation timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.03);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // 🏆 YOUR ACHIEVEMENTS (from resume)
  const achievements = [
  {
    title: "Smart India Hackathon Finalist",
    meta: "2023 & 2024 • National Level",
    desc: "Selected among top teams in the college to represent at the national-level hackathon, showcasing innovative problem-solving and teamwork."
  },
  {
    title: "Patent Recognition",
    meta: "2 Projects • Innovation",
    desc: "Received patentability status for two projects involving hardware-software integration, demonstrating originality and technical depth."
  },
  {
    title: "Published Research Paper",
    meta: "GHUMO.in • Research",
    desc: "Published research on tourism and cultural exchange platforms, with another paper currently under peer review."
  },
  {
    title: "President - Electronics Club",
    meta: "Leadership • 37 Members",
    desc: "Led a cross-functional team and organized a fest for 800+ participants, managing technical and cultural events efficiently."
  }
];

  return (
    <div className="achievements-scene">

      {/* 🔥 BACKGROUND BLOBS */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      {/* 🎯 CARDS */}
      <div className="achievements-container">

        {achievements.map((item, index) => {
          const float = Math.sin(time + index) * 10;

          return (
            <div
              key={item.id}
              className={`achievement-card card-${index}`}
              style={{
                transform: `
                  translate(${mouse.x * (index + 1) * 0.2}px, ${mouse.y * (index + 1) * 0.2 + float}px)
                `,
              }}
            >
              <h3>{item.title}</h3>
              <div className="meta">{item.meta}</div>
              <p>{item.desc}</p>
            </div>
          );
        })}

      </div>

      {/* ⬅️ BACK BUTTON */}
      <button className="back-btn-2" onClick={() => setScene("wall2")}>
        ← Back
      </button>

    </div>
  );
}