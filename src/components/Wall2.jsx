import { useEffect, useRef, useState } from "react";
import ProjectPanel from "./ProjectPanel";

export default function Wall2({ setScene, toggleMusic, musicOn, exitCafe}) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [showButtons, setShowButtons] = useState(false);
  const [showPlus, setShowPlus] = useState(false);
  const [time, setTime] = useState(0);
  const [showProjects, setShowProjects] = useState(false);

  const clickAudio = useRef(null);

  // 🔊 CLICK SOUND SETUP
  useEffect(() => {
    clickAudio.current = new Audio("/click.mp3");
    clickAudio.current.volume = 0.4;
  }, []);

   useEffect(() => {
  const timer = setTimeout(() => {
    setShowPlus(true);
  }, 800); // adjust timing if needed

  return () => clearTimeout(timer);
}, []); 

  const playClickSound = () => {
    if (!clickAudio.current) return;

    clickAudio.current.currentTime = 0;
    clickAudio.current.play().catch(() => {});
  };

  // ⏳ SHOW BUTTONS DELAY
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  // 🎯 MOUSE PARALLAX
  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;
      setMouse({ x, y });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // ⏳ FLOAT ANIMATION
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.05);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen bg-black overflow-hidden relative">

      {/* 🎥 BACKGROUND */}
      <img
        src="/wall2.webp"
        className="absolute w-full h-full object-cover pointer-events-none z-0"
        style={{
          transform: `
            translate(${mouse.x}px, ${mouse.y}px)
            scale(${1.05 + Math.sin(time) * 0.01})
          `,
        }}
      />

      {/* ➕ BUTTONS */}
      {showButtons && (
        <>
          <div
            className="plus laptop-plus z-10"
            onClick={() => {
              playClickSound();
              setShowProjects(true);
            }}
          >
            +
          </div>

          <div
            className="plus photo-plus z-10"
            onClick={() => {
              playClickSound();
              setScene("photos");
            }}
          >
            +
          </div>

          <div
            className="plus achievement-plus z-10"
            onClick={() => {
              playClickSound();
              setScene("achievements");
            }}
          >
            +
          </div>
<div
  className="plus radio-plus z-10"
  onClick={() => {
    toggleMusic();
  }}
>
  {musicOn ? "🔊" : "🔇"}
</div>
          <div
            className="plus feedback-plus z-10"
            onClick={() => {
              playClickSound();
              setScene("feedback");
            }}
          >
            +
          </div>
        </>
      )}

      {/* 📦 PROJECT PANEL */}
      {showProjects && (
        <ProjectPanel close={() => setShowProjects(false)} />
      )}

      {/* ⬅️ BACK */}
      <div
        className="back-hitbox z-20"
        onClick={() => setScene("interior")}
      ></div>

     {showPlus && (
  <div
    className="exit-hitbox"
    onClick={() => {
      exitCafe();        // 🔥 handle audio
      setScene("landing"); // 🔥 change scene
    }}
  ></div>
)}
    </div>
  );
}