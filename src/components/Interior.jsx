import { useState, useEffect, useRef } from "react";

export default function Interior({ setScene }) {
  const [showMenu, setShowMenu] = useState(false);
  const [activeSection, setActiveSection] = useState(null);
  const audioRef = useRef(null);
  const [showPlus, setShowPlus] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.05);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
  const timer = setTimeout(() => {
    setShowPlus(true);
  }, 800); // adjust timing if needed

  return () => clearTimeout(timer);
}, []);

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <img
        src="/interior.webp"
        className="absolute w-full h-full object-cover pointer-events-none"
        style={{
          transform: `
            translate(${mouse.x}px, ${mouse.y}px)
            scale(${1.05 + Math.sin(time) * 0.005})
          `,
        }}
      />
      <div
  className="menu-hitbox z-40"
  onClick={() => {
    setShowMenu(true);
    audioRef.current?.play();
  }}
></div>

{/* 🧾 ABOUT HITBOX (Billing Machine) */}
<div
  className="about-hitbox z-40"
  onClick={() => {
    setShowAbout(true);
    audioRef.current?.play();
  }}
></div>

      {/* MENU BUTTON */}
      {showPlus && (
      <div
        className="menu-plus z-50"
        onClick={() => {
          setShowMenu(true);
          audioRef.current?.play();
        }}
      >
        +
      </div>  
      )}

{/* ➕ ABOUT BUTTON (Billing Machine) */}
{showPlus && (
  <div
    className="plus about-plus z-50"
    onClick={() => {
      setShowAbout(true);
      audioRef.current?.play();
    }}
  >
    +
  </div>
)}
      {/* MENU POPUP */}
      {showMenu && (
       <div
  className="absolute inset-0 flex items-center justify-center z-50"
  onClick={() => setShowMenu(false)}
>
  <div
    className="menu-glass"
    onClick={(e) => e.stopPropagation()}
  >
    <button
      className="menu-close"
      onClick={() => setShowMenu(false)}
    >
      ✕
    </button>

    <h2 className="menu-title">Menu</h2>

    <div className="menu-content">

      <div
        className={`menu-item ${activeSection === "frontend" ? "active" : ""}`}
        onClick={() =>
          setActiveSection(activeSection === "frontend" ? null : "frontend")
        }
      >
        <h3>Frontend</h3>
        <div className="menu-details">
          HTML • CSS • JavaScript • React • Tailwind • Framer
        </div>
      </div>

      <div
        className={`menu-item ${activeSection === "backend" ? "active" : ""}`}
        onClick={() =>
          setActiveSection(activeSection === "backend" ? null : "backend")
        }
      >
        <h3>Backend</h3>
        <div className="menu-details">
          Node • Express • MongoDB • REST APIs • JWT
        </div>
      </div>

      <div
        className={`menu-item ${activeSection === "languages" ? "active" : ""}`}
        onClick={() =>
          setActiveSection(activeSection === "languages" ? null : "languages")
        }
      >
        <h3>Languages</h3>
        <div className="menu-details">
          Java • JavaScript • SQL • Python
        </div>
      </div>

      <div
        className={`menu-item ${activeSection === "devops" ? "active" : ""}`}
        onClick={() =>
          setActiveSection(activeSection === "devops" ? null : "devops")
        }
      >
        <h3>DevOps</h3>
        <div className="menu-details">
          Docker • Vercel • Render
        </div>
      </div>

      <div
        className={`menu-item ${activeSection === "tools" ? "active" : ""}`}
        onClick={() =>
          setActiveSection(activeSection === "tools" ? null : "tools")
        }
      >
        <h3>Tools</h3>
        <div className="menu-details">
          Git • GitHub • Postman • Figma • Firebase • Framer
        </div>
      </div>

    </div>
  </div>
</div>
      )}

      {showAbout && (
  <div
    className="absolute inset-0 flex items-center justify-center z-50"
    onClick={() => setShowAbout(false)}
  >
    <div
      className="menu-glass"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="menu-close"
        onClick={() => setShowAbout(false)}
      >
        ✕
      </button>

      <h2 className="about-name">Siddharth Karn</h2>

<p className="about-role">Full Stack Developer • Problem Solver • Builder</p>

<p className="about-desc">
  I’m a full-stack developer focused on building interactive and meaningful digital experiences.
  <br /><br />
  I’ve worked on platforms like Senpaiyaa and UniXchange, designing systems that connect people,
  improve communication, and solve real-world problems.
  <br /><br />
  Beyond development, I’ve led teams, contributed to large-scale college events,
  and explored innovation through hackathons, research, and patent-backed projects.
  <br /><br />
  I enjoy turning ideas into products that feel intuitive, immersive, and impactful.
</p>

<div className="about-actions">
  <a href="/resume.pdf" target="_blank" className="btn view">
    👁 View Resume
  </a>

  <a href="/resume.pdf" download className="btn download">
    ⬇ Download Resume
  </a>
</div>
    </div>
  </div>
)}

{/* ⬅️ BACK NAVIGATION */}
{showPlus && (
  <div
    className="back-hitbox"
    onClick={() => setScene("landing")} 
  ></div>
)}
      {/* GO TO WALL2 */}
     {/* ➡️ GO TO WALL2 */}
{showPlus && (
  <div
     className="exit-hitbox"
  onClick={() => setScene("wall2")}
  >
  </div>
)}

      <audio ref={audioRef} src="/click.mp3" />
    </div>
  );
}
