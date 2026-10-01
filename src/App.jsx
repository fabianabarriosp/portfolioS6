import { useState, useEffect } from "react";
import "./App.css";
import Magnet from "./Magnet";
import ProjectCard from "./ProjectCard";

const FW = 1512;
const FH = 982;

function px(figmaX) {
  return (figmaX / FW) * window.innerWidth;
}
function py(figmaY) {
  return (figmaY / FH) * window.innerHeight;
}
function pw(figmaW) {
  return (figmaW / FW) * window.innerWidth;
}
function ph(figmaH) {
  return (figmaH / FH) * window.innerHeight;
}

const MAGNETS = [
  {
    id: "F",
    src: "/src/assets/F.png",
    fx: 545,
    fy: 315,
    fw: 66,
    fh: 98,
    rotate: -6,
  },
  {
    id: "A1",
    src: "/src/assets/A1.png",
    fx: 620,
    fy: 322,
    fw: 62,
    fh: 80,
    rotate: 0.8,
  },
  {
    id: "B1",
    src: "/src/assets/B1.png",
    fx: 697,
    fy: 350,
    fw: 60,
    fh: 80,
    rotate: 2.3,
  },
  {
    id: "I1",
    src: "/src/assets/I1.png",
    fx: 765,
    fy: 330,
    fw: 30,
    fh: 80,
    rotate: -4.5,
  },
  {
    id: "A2",
    src: "/src/assets/A2.png",
    fx: 813,
    fy: 330,
    fw: 63,
    fh: 83,
    rotate: 0.8,
  },
  {
    id: "N",
    src: "/src/assets/N.png",
    fx: 890,
    fy: 327,
    fw: 65,
    fh: 83,
    rotate: 7,
  },
  {
    id: "A3",
    src: "/src/assets/A3.png",
    fx: 960,
    fy: 305,
    fw: 67,
    fh: 84,
    rotate: -1.6,
  },
  {
    id: "B2",
    src: "/src/assets/B2.png",
    fx: 849,
    fy: 471,
    fw: 56,
    fh: 83,
    rotate: -3,
  },
  {
    id: "A4",
    src: "/src/assets/A4.png",
    fx: 930,
    fy: 456,
    fw: 65,
    fh: 83,
    rotate: 1,
  },
  {
    id: "R1",
    src: "/src/assets/R1.png",
    fx: 1015,
    fy: 450,
    fw: 67,
    fh: 90,
    rotate: 9,
  },
  {
    id: "R2",
    src: "/src/assets/R2.png",
    fx: 1097,
    fy: 453,
    fw: 65,
    fh: 88,
    rotate: -2,
  },
  {
    id: "I2",
    src: "/src/assets/I2.png",
    fx: 1188,
    fy: 451,
    fw: 20,
    fh: 80,
    rotate: 0,
  },
  {
    id: "O",
    src: "/src/assets/O.png",
    fx: 1232,
    fy: 465,
    fw: 65,
    fh: 83,
    rotate: 2,
  },
  {
    id: "S",
    src: "/src/assets/S.png",
    fx: 1307,
    fy: 445,
    fw: 70,
    fh: 95,
    rotate: 2,
  },
  {
    id: "venezuela",
    src: "/src/assets/venezuela.png",
    fx: 200,
    fy: 55,
    fw: 99,
    fh: 109,
    rotate: -5,
  },
  {
    id: "portugal",
    src: "/src/assets/portugal.png",
    fx: 410,
    fy: 286,
    fw: 97,
    fh: 161,
    rotate: 0,
  },
  {
    id: "london",
    src: "/src/assets/london.png",
    fx: 750,
    fy: 23,
    fw: 130,
    fh: 200,
    rotate: 1,
  },
  {
    id: "madrid",
    src: "/src/assets/madrid.png",
    fx: 893,
    fy: 140,
    fw: 170,
    fh: 147,
    rotate: 15,
  },
  {
    id: "malta",
    src: "/src/assets/malta.png",
    fx: 1350,
    fy: 305,
    fw: 95,
    fh: 105,
    rotate: 0,
  },
  {
    id: "me",
    src: "/src/assets/me.png",
    fx: 1137,
    fy: 100,
    fw: 227,
    fh: 295,
    rotate: 7,
  },
  {
    id: "star",
    src: "/src/assets/star.png",
    fx: 1330,
    fy: 133,
    fw: 70,
    fh: 72,
    rotate: -5,
  },
  {
    id: "lasvegas",
    src: "/src/assets/lasvegas.png",
    fx: 1027,
    fy: 14,
    fw: 241,
    fh: 173,
    rotate: -2.6,
  },
  {
    id: "abudhabi",
    src: "/src/assets/abudhabi.png",
    fx: 700,
    fy: 615,
    fw: 137,
    fh: 120,
    rotate: -6.2,
  },
  {
    id: "dublin",
    src: "/src/assets/dublin.png",
    fx: 605,
    fy: 800,
    fw: 155,
    fh: 159,
    rotate: -10.8,
  },
  {
    id: "smiley",
    src: "/src/assets/smiley.png",
    fx: 204,
    fy: 870,
    fw: 80,
    fh: 82,
    rotate: -1.3,
  },
  {
    id: "singapore",
    src: "/src/assets/singapore.png",
    fx: 1249,
    fy: 780,
    fw: 180,
    fh: 175,
    rotate: 9.2,
  },
  {
    id: "switzerland",
    src: "/src/assets/switzerland.png",
    fx: 963,
    fy: 800,
    fw: 181,
    fh: 129,
    rotate: -1.0,
  },
  {
    id: "arsenal",
    src: "/src/assets/arsenal.png",
    fx: 1258,
    fy: 560,
    fw: 160,
    fh: 212,
    rotate: 1.9,
  },
  {
    id: "paperclip",
    src: "/src/assets/paperclip.png",
    fx: 577,
    fy: 461,
    fw: 35,
    fh: 85,
    rotate: 4.9,
  },
  {
    id: "concert",
    src: "/src/assets/concert ticket.png",
    fx: 320,
    fy: 30,
    fw: 391,
    fh: 213,
    rotate: 5,
  },
  {
    id: "button",
    src: "/src/assets/button.png",
    fx: 1235,
    fy: 578,
    fw: 64,
    fh: 64,
    rotate: 18.1,
  },
  {
    id: "photostrip",
    src: "/src/assets/photostrip.png",
    fx: 254,
    fy: 500,
    fw: 255,
    fh: 374,
    rotate: 1.3,
  },
  {
    id: "mexico",
    src: "/src/assets/mexico.png",
    fx: 259,
    fy: 460,
    fw: 114,
    fh: 125,
    rotate: -7.0,
  },
  {
    id: "postit",
    src: "/src/assets/postit.png",
    fx: 425,
    fy: 698,
    fw: 220,
    fh: 133,
    rotate: 0,
  },
];

function App() {
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const onResize = () => forceUpdate((n) => n + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="fridge-container">
      <ProjectCard
        src="/src/assets/musicbox.png"
        startX={px(210)}
        startY={py(180)}
        width={pw(240)}
        height={ph(262)}
        rotate={-3}
        projectId="musicbox"
      />
      <ProjectCard
        src="/src/assets/brose.mov"
        startX={px(558)}
        startY={py(493)}
        width={pw(186)}
        height={ph(182)}
        rotate={5.1}
        projectId="brose"
      />
      <ProjectCard
        src="/src/assets/fbf.gif"
        startX={px(1075)}
        startY={py(577)}
        width={pw(187)}
        height={ph(182)}
        rotate={3.1}
        projectId="fbf"
      />
      <ProjectCard
        src="/src/assets/royallib.png"
        startX={px(759)}
        startY={py(605)}
        width={pw(225)}
        height={ph(209)}
        rotate={-2}
        projectId="royallib"
      />

      {MAGNETS.map((m) => (
        <Magnet
          key={m.id}
          src={m.src}
          startX={px(m.fx)}
          startY={py(m.fy)}
          width={pw(m.fw)}
          height={ph(m.fh)}
          rotate={m.rotate}
          zIndexOverride={5}
        />
      ))}
    </div>
  );
}

export default App;
