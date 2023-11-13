import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import CalculatorLogicProvider from "./contexts/CalculatorLogic.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CalculatorLogicProvider>
      <App />
    </CalculatorLogicProvider>
  </React.StrictMode>
);
