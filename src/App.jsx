import "./App.css";
import Magnet from "./Magnet";

function App() {
  return (
    <div className="fridge-container">
      <Magnet
        src="/src/assets/london.png"
        startX={600}
        startY={100}
        width={80}
      />
    </div>
  );
}

export default App;
