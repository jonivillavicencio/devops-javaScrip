// src/App.test.js
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

describe("Semáforo React", () => {
  test("muestra las 3 luces", () => {
    render(<App />);
    const redLight = screen.getByTestId("light-red");
    const yellowLight = screen.getByTestId("light-yellow");
    const greenLight = screen.getByTestId("light-green");

    expect(redLight).toBeInTheDocument();
    expect(yellowLight).toBeInTheDocument();
    expect(greenLight).toBeInTheDocument();
  });

  test("la luz roja está activa al inicio", () => {
    render(<App />);
    const redLight = screen.getByTestId("light-red");
    expect(redLight).toHaveStyle("background-color: red");
  });

  test("cambia a verde al presionar el botón verde", () => {
    render(<App />);
    const greenButton = screen.getByTestId("button-green");
    fireEvent.click(greenButton);

    const greenLight = screen.getByTestId("light-green");
    expect(greenLight).toHaveStyle("background-color: green");
  });

  test("botón automático alterna las luces automáticamente", () => {
    jest.useFakeTimers();
    render(<App />);
    const autoButton = screen.getByTestId("auto-button");
    fireEvent.click(autoButton);

    // Avanzamos 2 segundos (el intervalo de cambio)
    jest.advanceTimersByTime(2000);

    const yellowLight = screen.getByTestId("light-yellow");
    expect(yellowLight).toHaveStyle("background-color: yellow");

    jest.useRealTimers();
  });
});
