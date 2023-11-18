import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import CalculatorLogicProvider from "./contexts/CalculatorLogic.tsx";
import SettingsContextProvider from "./contexts/Settings.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SettingsContextProvider>
      <CalculatorLogicProvider>
        <App />
      </CalculatorLogicProvider>
    </SettingsContextProvider>
  </React.StrictMode>
);
