import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProjectCard({
  src,
  startX,
  startY,
  width,
  height,
  rotate,
  projectId,
}) {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    setClicked(true);
    setTimeout(() => navigate(`/project/${projectId}`), 600);
  }

  const isVideo =
    src.endsWith(".mov") || src.endsWith(".mp4") || src.endsWith(".webm");

  const sharedStyle = {
    position: "absolute",
    left: startX,
    top: startY,
    width: width,
    height: height,
    cursor: "pointer",
    userSelect: "none",
    borderRadius: 12,
    objectFit: "cover",
    transform: clicked
      ? "perspective(1200px) rotateY(-90deg) scale(1.1)"
      : `rotate(${rotate || 0}deg)`,
    transformOrigin: "left center",
    transition: clicked
      ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
      : "transform 0.3s",
    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.2))",
    zIndex: clicked ? 999 : 2,
  };

  if (isVideo) {
    return (
      <video
        src={src}
        onClick={handleClick}
        style={sharedStyle}
        autoPlay
        loop
        muted
        playsInline
        draggable={false}
      />
    );
  }

  return (
    <img
      src={src}
      onClick={handleClick}
      style={sharedStyle}
      alt=""
      draggable={false}
    />
  );
}

export default ProjectCard;
