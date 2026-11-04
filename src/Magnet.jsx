import { useState, useEffect, useRef } from "react";
import SmileyExplosion from "./SmileyExplosion";
import { createPortal } from "react-dom";

function Magnet({
  id,
  src,
  startX,
  startY,
  width,
  height,
  rotate,
  zIndexOverride,
}) {
  const [pos, setPos] = useState({ x: startX, y: startY });
  const [dragging, setDragging] = useState(false);
  const [wasLastDragged, setWasLastDragged] = useState(false);
  const [exploding, setExploding] = useState(false);
  const [confetti, setConfetti] = useState(null);
  const [smoke, setSmoke] = useState(false);
  const [photo, setPhoto] = useState(0);
  const [clicks, setClicks] = useState(0);
  const wrapRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const lastPosRef = useRef({ x: startX, y: startY });
  const posRef = useRef({ x: startX, y: startY });
  const animRef = useRef(null);
  const isDraggingRef = useRef(false);
  const mouseStartRef = useRef({ x: 0, y: 0 });

  const isSmiley = id === "smiley";

  // Reset position on resize
  useEffect(() => {
    if (!isDraggingRef.current) {
      setPos({ x: startX, y: startY });
      posRef.current = { x: startX, y: startY };
    }
  }, [startX, startY]);

  function onMouseDown(e) {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    setDragging(true);
    isDraggingRef.current = true;
    setWasLastDragged(true);
    mouseStartRef.current = { x: e.clientX, y: e.clientY };
    offsetRef.current = {
      x: e.clientX - posRef.current.x,
      y: e.clientY - posRef.current.y,
    };
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    velocityRef.current = { x: 0, y: 0 };
  }

  useEffect(() => {
    function onMouseMove(e) {
      if (!dragging) return;
      velocityRef.current = {
        x: e.clientX - lastPosRef.current.x,
        y: e.clientY - lastPosRef.current.y,
      };
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      const newPos = {
        x: e.clientX - offsetRef.current.x,
        y: e.clientY - offsetRef.current.y,
      };
      posRef.current = newPos;
      setPos(newPos);
    }
    function onMouseUp(e) {
      if (!dragging) return;
      setDragging(false);
      isDraggingRef.current = false;

      // A click (mouse barely moved) on the smiley = explosion
      const moved = Math.hypot(
        e.clientX - mouseStartRef.current.x,
        e.clientY - mouseStartRef.current.y,
      );
      if (id === "me" && moved < 5) {
        setPhoto((n) => (n + 1) % 3);
        setClicks((n) => n + 1);
        return;
      }
      if (id === "venezuela" && moved < 5) {
        setSmoke(true);
        setTimeout(() => setSmoke(false), 4200);
        return;
      }
      if (id === "arsenal" && moved < 5) {
        const r = wrapRef.current.getBoundingClientRect();
        setConfetti({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
        setTimeout(() => setConfetti(null), 1800);
        return;
      }
      if (isSmiley && moved < 5) {
        setExploding(true);
        return;
      }

      let vx = velocityRef.current.x * 1.6;
      let vy = velocityRef.current.y * 1.6;
      function bounce() {
        vx *= 0.88;
        vy *= 0.88;
        const newX = posRef.current.x + vx;
        const newY = posRef.current.y + vy;
        const maxX = window.innerWidth - (width || 100);
        const maxY = window.innerHeight - (height || width || 100);
        const clampedX = Math.max(0, Math.min(newX, maxX));
        const clampedY = Math.max(0, Math.min(newY, maxY));
        if (newX < 0 || newX > maxX) vx *= -0.5;
        if (newY < 0 || newY > maxY) vy *= -0.5;
        posRef.current = { x: clampedX, y: clampedY };
        setPos({ x: clampedX, y: clampedY });
        if (Math.abs(vx) > 0.3 || Math.abs(vy) > 0.3)
          animRef.current = requestAnimationFrame(bounce);
      }
      animRef.current = requestAnimationFrame(bounce);
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging]);

  const zIndex = dragging ? 999 : wasLastDragged ? 50 : (zIndexOverride ?? 1);

  return (
    <>
      <div
        ref={wrapRef}
        onMouseDown={onMouseDown}
        style={{
          position: "absolute",
          left: pos.x,
          top: pos.y,
          width: width || 100,
          height: height || "auto",
          cursor: dragging ? "grabbing" : "grab",
          userSelect: "none",
          zIndex,
        }}
      >
        <img
          src={src}
          className={isSmiley ? "wiggle" : undefined}
          style={{
            display: "block",
            opacity: id === "me" ? 0 : 1,
            width: "100%",
            height: "100%",
            willChange: "transform",
            transform: dragging
              ? `scale(1.1) rotate(${rotate || 0}deg)`
              : `scale(1) rotate(${rotate || 0}deg)`,
            transition: dragging ? "transform 0.1s" : "transform 0.3s",
            filter: dragging
              ? "drop-shadow(0px 10px 15px rgba(0,0,0,0.35))"
              : "drop-shadow(0px 2px 4px rgba(0,0,0,0.15))",
          }}
          alt=""
          draggable={false}
        />
        {id === "me" &&
          ["/assets/me.png", "/assets/me2.png", "/assets/me3.png"].map(
            (photoSrc, i) => (
              <img
                key={photoSrc}
                src={photoSrc}
                alt=""
                draggable={false}
                className={photo === i ? "photo-fade on" : "photo-fade"}
                style={{
                  transform: `${dragging ? "scale(1.1)" : "scale(1)"} rotate(${rotate || 0}deg)`,
                  scale: i === 0 ? "1" : "1.08",
                }}
              />
            ),
          )}
        {smoke && (
          <div className="smoke" aria-hidden="true">
            <div className="smoke-words">
              {"where I'm from".split("").map((letter, i, all) => (
                <span
                  key={i}
                  style={{
                    "--from": (all.length - 1) / 2 - i,
                    animationDelay: i * 0.06 + "s",
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </div>
            <div className="smoke-wisps">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}

        {isSmiley && (
          <div className="contact-label" aria-hidden="true">
            {"contact me!".split("").map((letter, i, all) => (
              <span
                key={i}
                className="contact-letter"
                style={{
                  transform: `rotate(${-55 + i * (110 / (all.length - 1))}deg)`,
                }}
              >
                <span
                  className="contact-letter-inner"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  {letter === " " ? " " : letter}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>

      {confetti &&
        createPortal(
          <div
            className="confetti"
            style={{ left: confetti.x, top: confetti.y }}
          >
            {Array.from({ length: 60 }).map((_, i) => {
              const angle = Math.random() * Math.PI * 2;
              const dist = 80 + Math.random() * 220;
              return (
                <span
                  key={i}
                  style={{
                    "--dx": Math.cos(angle) * dist + "px",
                    "--dy": Math.sin(angle) * dist - 60 + "px",
                    "--r": Math.random() * 720 - 360 + "deg",
                    background: i % 3 === 0 ? "#ffffff" : "#EF0107",
                    animationDelay: Math.random() * 0.15 + "s",
                  }}
                />
              );
            })}
          </div>,
          document.body,
        )}
      {exploding && (
        <SmileyExplosion
          startX={pos.x + (width || 100) / 2}
          startY={pos.y + (height || width || 100) / 2}
          onClose={() => setExploding(false)}
        />
      )}
    </>
  );
}

export default Magnet;
