import { useState, useEffect } from "react";

export default function ProjectPanel({ close }) {
  const [view, setView] = useState("grid");
  const [current, setCurrent] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "Senpaiyaa",
      video: "/senpaiya.mp4",
      desc: "Platform connecting juniors with seniors using role-based system.",
      tech: ["React", "Node", "MongoDB", "JWT"],
      live: "https://senpaiya.vercel.app/",
      github: "https://github.com/siddharth-rishabh/Senpaiya"
    },
    {
      id: 2,
      title: "UniXchange",
      video: "/unixchange.mp4",
      desc: "College platform with Firebase auth and resource exchange.",
      tech: ["React", "Node", "Firebase"],
      live: "https://uni-xchange-seven.vercel.app/",
      github: "https://github.com/siddharth-rishabh/uniXchange"
    },
    {
      id: 3,
      title: "Portfolio",
      video: "/cafe.mp4",
      desc: "Immersive portfolio with interactive UI.",
      tech: ["React", "Tailwind"],
      live: "#",
      github: "#"
    }
  ];

  return (
    <div className="browser-wrapper" onClick={close}>
      <div className="browser" onClick={(e) => e.stopPropagation()}>

        {/* 🔝 BROWSER TOP */}
        <div className="browser-top">
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="url">localhost:3000/projects</div>
        </div>

        {/* 🔽 CONTENT */}
        <div className="browser-body">

          {/* GRID VIEW */}
          {view === "grid" && (
            <div className="grid-view">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="card"
                  onClick={() => {
                    setCurrent(proj);
                    setView("player");
                  }}
                >
                  <video
                    src={proj.video}
                    muted
                    loop
              
                  />

                  <div className="overlay">
                    <p>{proj.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PLAYER VIEW */}
         {view === "player" && current && (
  <div className="player-view">

    {/* LEFT SIDE */}
    <div className="player-left">
      <video
        src={current.video}
        controls
        autoPlay
       
  
        className="main-video"
      />

      <div className="info">
        <h2>{current.title}</h2>
        <p>{current.desc}</p>

        <div className="links">
          <a href={current.live} target="_blank">Live</a>
          <a href={current.github} target="_blank">GitHub</a>
        </div>

        <div className="tags">
          {current.tech.map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>

        <button onClick={() => setView("grid")}>
          ← Back
        </button>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="player-right">
      {projects.map((proj) => (
        <div
          key={proj.id}
          className="recommend-card"
          onClick={() => setCurrent(proj)}
        >
          <video src={proj.video} muted loop autoPlay  preload="none"
  />
          <p>{proj.title}</p>
        </div>
      ))}
    </div>

  </div>
)}

        </div>
      </div>
    </div>
  );
}