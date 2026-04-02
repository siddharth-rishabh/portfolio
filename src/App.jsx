import { useState,useEffect, useRef } from "react";
import Landing from "./components/Landing";
import Interior from "./components/Interior";
import Wall2 from "./components/Wall2";
import Achievements from "./components/Achievements";
import Photos from "./components/Photos";
import Feedback from "./components/Feedback";

export default function App() {
  const [scene, setScene] = useState("landing");
  const [hasEntered, setHasEntered] = useState(false);
  const [musicOn, setMusicOn] = useState(true);
  const rainRef = useRef(null);
const lofiRef = useRef(null);

useEffect(() => {
  const rain = new Audio("/rain.mp3");
  const lofi = new Audio("/lofi.mp3");

  rain.preload = "auto";
  lofi.preload = "auto";

  rain.loop = true;
  lofi.loop = true;

  rain.volume = 1;
  lofi.volume = 0;

  rainRef.current = rain;
  lofiRef.current = lofi;

}, []);

const startExperience = async () => {
  setHasEntered(true);

  const rain = rainRef.current;

  if (!rain) return;

  try {
    await rain.play();
  } catch (e) {
    console.log("Audio blocked", e);
  }
};


const enterCafe = () => {
  const rain = rainRef.current;
  const lofi = lofiRef.current;

  if (!rain || !lofi) return;

  if (lofi.paused) {
    lofi.play().catch(() => {});
  }
  // 🔥 smooth transition
  fadeAudio(rain, 0.4, 1500);  // rain fade down
  fadeAudio(lofi, 0.8, 1500);  // lofi fade in
};

  const exitCafe = () => {
  const rain = rainRef.current;
  const lofi = lofiRef.current;

  if (!rain || !lofi) return;

  // start rain again
  rain.play().catch(() => {});

  // fade transition
  fadeAudio(lofi, 0, 1000);   // lofi fade out
  fadeAudio(rain, 0.8, 1000); // rain fade in
};

const fadeAudio = (audio, targetVolume, duration = 1000) => {
  if (!audio) return;

  const startVolume = audio.volume;
  const steps = 20;
  const stepTime = duration / steps;
  const volumeStep = (targetVolume - startVolume) / steps;

  let currentStep = 0;

  const interval = setInterval(() => {
    currentStep++;

    audio.volume = Math.min(
      1,
      Math.max(0, audio.volume + volumeStep)
    );

    if (currentStep >= steps) {
      audio.volume = targetVolume;
      clearInterval(interval);
    }
  }, stepTime);
};

const toggleMusic = () => {
  const lofi = lofiRef.current;

  if (!lofi) return;

  if (musicOn) {
    fadeAudio(lofi, 0, 800); // fade out
  } else {
    lofi.play().catch(() => {});
    fadeAudio(lofi, 0.4, 800); // fade in
  }

  setMusicOn(!musicOn);
};

const isMobile = window.innerWidth < 768;

if (isMobile) {
  return (
    <div className="mobile-block">
  <div className="mobile-card">
    <h1>Best experienced on a larger screen</h1>
    <p>
      This portfolio is designed as an immersive experience.<br />
      Please open it on a laptop or desktop.
    </p>
  </div>
</div>
  );
}
  return (
    <>
    
      {scene === "landing" && <Landing setScene={setScene}
  startExperience={startExperience}
  hasEntered={hasEntered}
   enterCafe={enterCafe} />}
      {scene === "interior" && <Interior setScene={setScene} enterCafe={enterCafe} />}
      {scene === "wall2" && <Wall2 setScene={setScene}
        exitCafe={exitCafe}
  toggleMusic={toggleMusic}
  musicOn={musicOn}/>}
      {scene === "achievements" && <Achievements setScene={setScene} />}
      {scene === "photos" && <Photos setScene={setScene} />}
      {scene === "feedback" && (
  <>
    <Wall2 setScene={setScene} />
    <Feedback setScene={setScene} />
  </>
)}
    </>
  );
}