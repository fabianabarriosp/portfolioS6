import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PROJECTS = {
  musicbox: {
    title: "Trencadís: AR Filter Tribute to Gaudí",
    description:
      "An AR filter inspired by Gaudí's trencadís mosaic technique. Built as a tribute to his iconic stained glass and ceramic work.",
    color: "#f5f0e8",
  },
  brose: {
    title: "Forging Brosé",
    description:
      "A 3D exploration and landing page for Brosé — a medieval-meets-rosé wine brand with a griffin crest and knight aesthetic.",
    color: "#ffe4e4",
  },
  fbf: {
    title: "Frame by Frame — Character Animation",
    description:
      "A character animation project exploring frame-by-frame illustration and motion.",
    color: "#e4f0ff",
  },
  royallib: {
    title: "Royal Library — Amexio",
    description:
      "An industry project with Amexio and the Royal Library, focused on engaging diverse audiences through modern design.",
    color: "#e4ffe8",
  },
};

function ProjectPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const project = PROJECTS[id];

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  function goBack() {
    setVisible(false);
    setTimeout(() => navigate("/"), 500);
  }

  if (!project) return <div>Project not found</div>;

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: project.color,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transform: visible
          ? "perspective(1200px) rotateY(0deg)"
          : "perspective(1200px) rotateY(-90deg)",
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        transformOrigin: "left center",
      }}
    >
      <button
        onClick={goBack}
        style={{
          position: "absolute",
          top: 32,
          left: 32,
          background: "white",
          border: "none",
          borderRadius: 24,
          padding: "10px 24px",
          fontSize: 16,
          cursor: "pointer",
          fontWeight: 600,
          boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
        }}
      >
        ← Back to fridge
      </button>

      <h1
        style={{
          fontSize: 48,
          fontWeight: 800,
          textAlign: "center",
          maxWidth: 700,
          marginBottom: 24,
          color: "#1a1a1a",
        }}
      >
        {project.title}
      </h1>

      <p
        style={{
          fontSize: 20,
          textAlign: "center",
          maxWidth: 600,
          color: "#444",
          lineHeight: 1.6,
        }}
      >
        {project.description}
      </p>
    </div>
  );
}

export default ProjectPage;
