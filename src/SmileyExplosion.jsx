import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./explosion.css";

const EMAIL = "fabianabarriosp@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/fabianabarriospeña/";

const rand = (a, b) => a + Math.random() * (b - a);
new Image().src = "/assets/smiley-small.png";

function SmileyExplosion({ startX, startY, onClose }) {
  const layerRef = useRef(null);
  const partsRef = useRef([]);
  const phaseRef = useRef("open");
  const [showText, setShowText] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const layer = layerRef.current;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let W = window.innerWidth;
    let H = window.innerHeight;
    // same look as the prototype, just scaled up to the real screen
    const s = Math.max(0.6, W / 800);
    const count = 280;

    for (let i = 0; i < count; i++) {
      const img = document.createElement("img");
      img.src = "/assets/smiley-small.png";
      img.alt = "";
      img.className = "burst-smiley";
      const size = rand(18, 95) * s;
      img.style.width = size + "px";
      img.style.height = size + "px";
      layer.appendChild(img);
      // start on the smiley magnet, fly to a random spot on the screen
      const ox = startX - size / 2;
      const oy = startY - size / 2;
      const tx = rand(-size * 0.2, W - size * 0.8);
      const ty = rand(-size * 0.2, H - size * 0.8);
      partsRef.current.push({
        el: img,
        size,
        x: reduce ? tx : ox,
        y: reduce ? ty : oy,
        vx: reduce ? 0 : (tx - ox) * 0.064,
        vy: reduce ? 0 : (ty - oy) * 0.064,
        r: rand(0, 360),
        vr: rand(-14, 14),
        wobble: rand(0, 6.28),
      });
    }

    const textTimer = setTimeout(() => setShowText(true), 60);

    // keep smileys in the same place when the window changes size
    function onResize() {
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      partsRef.current.forEach((p) => {
        p.x = (p.x / W) * newW;
        p.y = (p.y / H) * newH;
      });
      W = newW;
      H = newH;
    }
    window.addEventListener("resize", onResize);

    let frame;
    let t = 0;
    function step() {
      t++;
      const closing = phaseRef.current === "closing";
      let allGone = true;
      for (const p of partsRef.current) {
        if (closing) {
          p.vy += 0.9 * s; // gravity: fall away
        } else {
          p.vx *= 0.94; // slow down
          p.vy *= 0.94;
          p.vr *= 0.95;
          if (p.x < -p.size * 0.3) {
            p.x = -p.size * 0.3;
            p.vx = Math.abs(p.vx) * 0.6;
          }
          if (p.x > W - p.size * 0.7) {
            p.x = W - p.size * 0.7;
            p.vx = -Math.abs(p.vx) * 0.6;
          }
          if (p.y < -p.size * 0.3) {
            p.y = -p.size * 0.3;
            p.vy = Math.abs(p.vy) * 0.6;
          }
          if (p.y > H - p.size * 0.7) {
            p.y = H - p.size * 0.7;
            p.vy = -Math.abs(p.vy) * 0.6;
          }
        }
        p.x += p.vx;
        p.y += p.vy;
        p.r += p.vr;
        if (p.y < H + 20) allGone = false;
        // the little shake
        const bob = reduce || closing ? 0 : Math.sin(t / 30 + p.wobble) * 3 * s;
        p.el.style.transform = `translate(${p.x}px, ${p.y + bob}px) rotate(${p.r}deg)`;
      }
      if (closing && (allGone || reduce)) {
        onClose();
        return;
      }
      frame = requestAnimationFrame(step);
    }
    frame = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(textTimer);
      window.removeEventListener("resize", onResize);
      partsRef.current.forEach((p) => p.el.remove());
      partsRef.current = [];
    };
  }, []);

  // close: smileys jump and fall off the screen
  function close() {
    if (phaseRef.current === "closing") return;
    phaseRef.current = "closing";
    setShowText(false);
    partsRef.current.forEach((p) => {
      p.vy = rand(-8, -2);
      p.vx = rand(-3, 3);
    });
  }

  // Esc closes it
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function copyEmail(e) {
    e.stopPropagation();
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return createPortal(
    <div
      className="explosion"
      onClick={close}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div ref={layerRef} className="explosion-layer" />
      <div className={showText ? "explosion-text show" : "explosion-text"}>
        <p className="explosion-email" onClick={(e) => e.stopPropagation()}>
          {EMAIL}
        </p>
        <div className="explosion-buttons" onClick={(e) => e.stopPropagation()}>
          <button className="explosion-btn" onClick={copyEmail}>
            {copied ? "Copied!" : "Copy email"}
          </button>
          <a
            className="explosion-btn ghost"
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
      <button
        className="explosion-close"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation();
          close();
        }}
      >
        ×
      </button>
    </div>,
    document.body,
  );
}

export default SmileyExplosion;
