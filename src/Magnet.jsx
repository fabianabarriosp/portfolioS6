import { useState, useEffect, useRef } from "react";
import SmileyExplosion from "./SmileyExplosion";

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
