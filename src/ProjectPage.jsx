import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./projectpage.css";

const PROJECTS = {
  musicbox: {
    title: "www.time-machine.com",
    description:
      "A tribute to the World Wide Web, built as an interactive time machine.",
    media: "/assets/timemachine.mp4",
    caption: "Time machine",
    tools: ["Figma", "React", "Vercel"],
    skills: ["Concept", "Interaction design", "Web development"],
  },
  brose: {
    title: "Forging Brosé",
    description:
      "A 3D logo and showcase landing page for Brosé, a wine brand where medieval knights meet rosé.",
    media: "/assets/brose.mp4",
    caption: "Brosé",
    tools: ["Figma", "Blender", "Vercel"],
    skills: [
      "Branding",
      "3D in Blender",
      "Web development",
      "User research",
      "Iterating on feedback",
    ],
  },
  fbf: {
    title: "Frame by Frame",
    description:
      "A character animation project exploring frame-by-frame illustration and motion.",
    media: "/assets/fbf.gif",
    caption: "Frame by frame",
    tools: ["FlipaClip"],
    skills: ["Animation", "Illustration", "Character design"],
  },
  royallib: {
    title: "KB Library × Amexio",
    description:
      "An industry project with Amexio, rethinking how the Royal Library can recommend books without users knowing exactly what they want.",
    media: "/assets/royallib.png",
    caption: "Royal Library",
    tools: ["Figma", "Miro"],
    skills: ["User research", "Concept development", "Stakeholder advice"],
  },
};

function isVideo(src) {
  return /\.(mp4|mov|webm)$/i.test(src);
}

function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const project = PROJECTS[id];

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  function goBack() {
    setVisible(false);
    setTimeout(() => navigate("/"), 500);
  }

  if (!project) return <div>Project not found</div>;

  return (
    <div className={visible ? "pp-page pp-visible" : "pp-page"}>
      <button className="pp-back" onClick={goBack}>
        <span className="pp-back-dot">←</span>
        Back
      </button>

      <article className="pp-sheet">
        <img className="pp-pin" src="/assets/star.png" alt="" />

        <div className="pp-head">
          <div className="pp-text">
            <h1 className="pp-title">{project.title}</h1>
            <p className="pp-desc">{project.description}</p>
          </div>

          <div className="pp-polaroid">
            <img className="pp-clip" src="/assets/paperclip.png" alt="" />
            <div className="pp-media">
              {isVideo(project.media) ? (
                <video src={project.media} autoPlay muted loop playsInline />
              ) : (
                <img src={project.media} alt={project.title} />
              )}
            </div>
            <span className="pp-caption">{project.caption}</span>
          </div>
        </div>

        <div className="pp-tools">
          <span className="pp-label">Tools</span>
          <span className="pp-tools-list">{project.tools.join(" · ")}</span>
        </div>

        <ul className="pp-tags">
          {project.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </article>
    </div>
  );
}

export default ProjectPage;
