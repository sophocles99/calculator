import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import CalculatorProvider from "./contexts/Calculator.tsx";
import SettingsContextProvider from "./contexts/Settings.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SettingsContextProvider>
      <CalculatorProvider>
        <App />
      </CalculatorProvider>
    </SettingsContextProvider>
  </React.StrictMode>
);
