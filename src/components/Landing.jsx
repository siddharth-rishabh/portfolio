import { useState, useEffect, useRef } from "react";

export default function Landing({ setScene, enterCafe, startExperience, hasEntered  }) {
  const [scrollY, setScrollY] = useState(0);
  const [entering, setEntering] = useState(false);
  const audioRef = useRef(null);
  const [showContact, setShowContact] = useState(false);

  const textOpacity = Math.max(1 - scrollY / 200, 0);
  const shakeX = Math.sin(scrollY * 0.05) * 0.5;
  const shakeY = Math.cos(scrollY * 0.05) * 0.5;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollProgress =
    scrollY / (document.body.scrollHeight - window.innerHeight);

  const isNearDoor = scrollProgress > 0.92;

  return (
     <div className="h-[140vh]">
      {!hasEntered && (
  <div className="overlay-entry ">
    <button className="enter-experience-btn" onClick={startExperience}>
      Tap to enter experience
    </button>
  </div>
)}
      <div className="sticky top-0 h-screen overflow-hidden">
      <video
        src="/cafe.mp4"
        autoPlay
        loop
        muted
         preload="none"
        className="absolute w-full h-full object-cover"
        style={{
          transform: `
            scale(${1 + scrollY * 0.001})
            translate(${shakeX}px, ${shakeY}px)
          `,
          transformOrigin: "20% 100%",
         
        }}
      />

      {entering && <div className="flash"></div>}

      <div
  className="absolute bottom-10 w-full text-center text-white"
  style={{
    opacity: textOpacity,
      transform: `translateY(${scrollY * 0.2}px)`,
    transition: "opacity 0.3s ease"
  }}
>
        <h1 className="landing-title text-4xl md:text-3xl font-bold tracking-wide">
  Siddharth Karn
</h1>

<p className="opacity-90 text-m md:text-m mt-2">
Full Stack Developer | 
crafting digital experiences
</p>

<p className="opacity-70 text-sm md:text-s mt-1">
  Scroll to enter ↓
</p>
      </div>
        <div
  className="plus contact-plus"
  onClick={() => setShowContact(true)}
>
  +
</div>
{showContact && (
  <div className="contact-overlay" onClick={() => setShowContact(false)}>
    
    <div
      className="contact-panel"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="contact-close"
        onClick={() => setShowContact(false)}
      >
        ✕
      </button>

      <h2>Contact Me</h2>

      <div className="contact-links">
        <a href="https://www.linkedin.com/in/siddharth-k-a8a18b274/" target="_blank">LinkedIn</a>
        <a href="mailto:siddharthrishabh019@gmail.com">Email</a>
        <a href="tel:8409787231">Phone</a>
        <a href="https://github.com/siddharth-rishabh" target="_blank">GitHub</a>
      </div>
    </div>

  </div>
)}

      {isNearDoor && (
        <button
          className="enter-btn absolute left-[25%] top-[40%]"
          onClick={() => {
            enterCafe(); 
            setEntering(true);
            setTimeout(() =>{ setScene("interior"); }, 800);
            audioRef.current?.play();
          }}
        >
          Enter →
        </button>
      )}
       <audio ref={audioRef} src="/click.mp3" />
    </div>
</div>
  );
}