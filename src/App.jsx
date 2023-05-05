import React, { useState } from "react";
import "./styles.css";

const entries = [
  "Entry 1",
  "Entry 2",
  "Entry 3",
  "Entry 4",
  "Entry 5",
  "Entry 6",
  "Entry 7",
  "Entry 8",
  "Entry 9",
  "Entry 10"
];

export default function App() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");

  const spinWheel = () => {
    setSpinning(true);
    const randomIndex = Math.floor(Math.random() * entries.length);
    setTimeout(() => {
      setResult(entries[randomIndex]);
      setSpinning(false);
    }, 5000);
  };

  return (
    <>
    <h1>layla - Spinwheel</h1>
    <div className="App">
      <h1>Spinning Wheel</h1>
      <div className={`wheel ${spinning ? "spinning" : ""}`}>
        {entries.map((entry, index) => (
          <div key={index} className="entry">{entry}</div>
        ))}
      </div>
      <button onClick={spinWheel} disabled={spinning}>Spin</button>
      {result && <h2>{result}</h2>}
    </div>
    </>
    
  );
}
