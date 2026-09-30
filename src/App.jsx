import "./App.css";
import Magnet from "./Magnet";

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
  // Letters - FABIANA
  {
    id: "F",
    src: "/src/assets/F.png",
    fx: 500,
    fy: 346,
    fw: 62,
    fh: 98,
    rotate: 17.9,
  },
  {
    id: "A1",
    src: "/src/assets/A1.png",
    fx: 589,
    fy: 352,
    fw: 65,
    fh: 83,
    rotate: 0.8,
  },
  {
    id: "B1",
    src: "/src/assets/B1.png",
    fx: 688,
    fy: 363,
    fw: 60,
    fh: 83,
    rotate: -6.3,
  },
  {
    id: "I1",
    src: "/src/assets/I1.png",
    fx: 764,
    fy: 350,
    fw: 24,
    fh: 84,
    rotate: 9.5,
  },
  {
    id: "A2",
    src: "/src/assets/A2.png",
    fx: 826,
    fy: 345,
    fw: 65,
    fh: 83,
    rotate: 0.8,
  },
  {
    id: "N",
    src: "/src/assets/N.png",
    fx: 993,
    fy: 347,
    fw: 65,
    fh: 83,
    rotate: 18.9,
  },
  {
    id: "A3",
    src: "/src/assets/A3.png",
    fx: 933,
    fy: 357,
    fw: 60,
    fh: 84,
    rotate: -13.6,
  },

  // Letters - BARRIOS
  {
    id: "B2",
    src: "/src/assets/B2.png",
    fx: 839,
    fy: 491,
    fw: 60,
    fh: 83,
    rotate: 0,
  },
  {
    id: "A4",
    src: "/src/assets/A4.png",
    fx: 922,
    fy: 483,
    fw: 65,
    fh: 83,
    rotate: 0,
  },
  {
    id: "R1",
    src: "/src/assets/R1.png",
    fx: 1028,
    fy: 477,
    fw: 61,
    fh: 82,
    rotate: -12.8,
  },
  {
    id: "R2",
    src: "/src/assets/R2.png",
    fx: 1103,
    fy: 483,
    fw: 61,
    fh: 82,
    rotate: 10.8,
  },
  {
    id: "I2",
    src: "/src/assets/I2.png",
    fx: 1209,
    fy: 471,
    fw: 24,
    fh: 84,
    rotate: 0,
  },
  {
    id: "O",
    src: "/src/assets/O.png",
    fx: 1264,
    fy: 480,
    fw: 68,
    fh: 83,
    rotate: 0,
  },
  {
    id: "S",
    src: "/src/assets/S.png",
    fx: 1347,
    fy: 465,
    fw: 55,
    fh: 85,
    rotate: 12.6,
  },

  // Travel stickers & magnets
  {
    id: "venezuela",
    src: "/src/assets/venezuela.png",
    fx: 177,
    fy: 105,
    fw: 92,
    fh: 86,
    rotate: 27.6,
  },
  {
    id: "portugal",
    src: "/src/assets/portugal.png",
    fx: 405,
    fy: 250,
    fw: 93,
    fh: 161,
    rotate: -13.6,
  },
  {
    id: "london",
    src: "/src/assets/london.png",
    fx: 756,
    fy: 38,
    fw: 120,
    fh: 200,
    rotate: -15.4,
  },
  {
    id: "madrid",
    src: "/src/assets/madrid.png",
    fx: 846,
    fy: 218,
    fw: 164,
    fh: 137,
    rotate: 22.8,
  },
  {
    id: "lasvegas",
    src: "/src/assets/lasvegas.png",
    fx: 963,
    fy: 44,
    fw: 241,
    fh: 173,
    rotate: 9.6,
  },
  {
    id: "star",
    src: "/src/assets/star.png",
    fx: 1343,
    fy: 98,
    fw: 78,
    fh: 77,
    rotate: 0,
  },
  {
    id: "malta",
    src: "/src/assets/malta.png",
    fx: 1354,
    fy: 305,
    fw: 95,
    fh: 98,
    rotate: 0,
  },
  {
    id: "me",
    src: "/src/assets/me.png",
    fx: 1197,
    fy: 77,
    fw: 200,
    fh: 267,
    rotate: -16.7,
  },
  {
    id: "mexico",
    src: "/src/assets/mexico.png",
    fx: 229,
    fy: 443,
    fw: 116,
    fh: 115,
    rotate: 9.0,
  },
  {
    id: "abudhabi",
    src: "/src/assets/abudhabi.png",
    fx: 732,
    fy: 637,
    fw: 137,
    fh: 120,
    rotate: 11.2,
  },
  {
    id: "button",
    src: "/src/assets/button.png",
    fx: 1233,
    fy: 622,
    fw: 64,
    fh: 64,
    rotate: 18.1,
  },
  {
    id: "dublin",
    src: "/src/assets/dublin.png",
    fx: 610,
    fy: 840,
    fw: 131,
    fh: 127,
    rotate: 20.8,
  },
  {
    id: "smiley",
    src: "/src/assets/smiley.png",
    fx: 193,
    fy: 895,
    fw: 63,
    fh: 62,
    rotate: -1.3,
  },
  {
    id: "singapore",
    src: "/src/assets/singapore.png",
    fx: 1289,
    fy: 800,
    fw: 156,
    fh: 152,
    rotate: -9.2,
  },
  {
    id: "switzerland",
    src: "/src/assets/switzerland.png",
    fx: 973,
    fy: 800,
    fw: 191,
    fh: 129,
    rotate: -1.0,
  },
  {
    id: "arsenal",
    src: "/src/assets/arsenal.png",
    fx: 1251,
    fy: 648,
    fw: 133,
    fh: 168,
    rotate: 23.9,
  },
  {
    id: "paperclip",
    src: "/src/assets/paperclip.png",
    fx: 605,
    fy: 491,
    fw: 35,
    fh: 85,
    rotate: 4.9,
  },

  // Photos & film
  {
    id: "photostrip",
    src: "/src/assets/photostrip.png",
    fx: 264,
    fy: 488,
    fw: 255,
    fh: 374,
    rotate: -9.2,
  },
  {
    id: "postit",
    src: "/src/assets/postit.png",
    fx: 413,
    fy: 738,
    fw: 210,
    fh: 133,
    rotate: 28.1,
  },
  {
    id: "concert",
    src: "/src/assets/concert ticket.png",
    fx: 310,
    fy: 50,
    fw: 371,
    fh: 203,
    rotate: 0,
  },

  // Project cards
  {
    id: "trencadis",
    src: "/src/assets/trencadis.png",
    fx: 213,
    fy: 238,
    fw: 180,
    fh: 182,
    rotate: 15.5,
  },
  {
    id: "brose",
    src: "/src/assets/brose.png",
    fx: 598,
    fy: 523,
    fw: 186,
    fh: 182,
    rotate: -5.1,
  },
  {
    id: "fbf",
    src: "/src/assets/fbf.png",
    fx: 1096,
    fy: 612,
    fw: 187,
    fh: 182,
    rotate: -5.1,
  },
  {
    id: "royallib",
    src: "/src/assets/royallib.png",
    fx: 802,
    fy: 703,
    fw: 189,
    fh: 182,
    rotate: 18.8,
  },
];

function App() {
  return (
    <div className="fridge-container">
      {MAGNETS.map((m) => (
        <Magnet
          key={m.id}
          src={m.src}
          startX={px(m.fx)}
          startY={py(m.fy)}
          width={pw(m.fw)}
          height={ph(m.fh)}
          rotate={m.rotate}
        />
      ))}
    </div>
  );
}

export default App;
