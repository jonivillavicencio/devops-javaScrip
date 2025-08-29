import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useEffect, useState } from "react";

export default function App() {
  const [color, setColor] = useState("red");
  const [autoMode, setAutoMode] = useState(false);

  const order = ["red", "yellow", "green"];

  useEffect(() => {
    let interval;
    if (autoMode) {
      interval = setInterval(() => {
        setColor((prev) => {
          const index = order.indexOf(prev);
          return order[(index + 1) % order.length];
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [autoMode]);

  const handleChange = (newColor) => {
    if (newColor !== color) {
      setColor(newColor);
    }
  };

  // estilo común para las luces
  const lightStyle = (c) => ({
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: color === c ? c : "gray",
    boxShadow: color === c ? `0 0 20px 5px ${c}` : "none",
  });

  return (
    <div
      style={{
        minHeight: "50vh",
        padding: "0",
        margin: "0",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "50px",
        backgroundColor: "#082cf7ff",
      }}
    >
      <h1 style={{ fontSize: "100px", fontWeight: "bold" }}>Semáforo en React</h1>

      {/* Caja vertical del semáforo */}
      <div
        style={{
          backgroundColor: "black",
          padding: "20px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Luces */}
        <div data-testid="light-red" style={lightStyle("red")}></div>
        <div data-testid="light-yellow" style={lightStyle("yellow")}></div>
        <div data-testid="light-green" style={lightStyle("green")}></div>
      </div>

      {/* Botones de control */}
      <div style={{ display: "flex", gap: "15px" }}>
      <button
        data-testid="button-red"
        onClick={() => handleChange("red")}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "red",
          opacity: color === "red" ? 0.5 : 1,
        }}
      ></button>

      <button
        data-testid="button-yellow"
        onClick={() => handleChange("yellow")}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "yellow",
          opacity: color === "yellow" ? 0.5 : 1,
        }}
      ></button>

      <button
        data-testid="button-green"
        onClick={() => handleChange("green")}
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          backgroundColor: "green",
          opacity: color === "green" ? 0.5 : 1,
        }}
      ></button>

      </div>

      {/* Botón automático */}
      <button
        data-testid="auto-button"
        onClick={() => setAutoMode((m) => !m)}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          borderRadius: "10px",
          fontWeight: "bold",
          backgroundColor: autoMode ? "black" : "#ddd",
          color: autoMode ? "white" : "black",
        }}
      >
        {autoMode ? "Detener Automático" : "Iniciar Automático"}
      </button>

    </div>
  );
}
