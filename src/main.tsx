import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import CalculatorProvider from "./contexts/Calculator.tsx";
import HistoryContextProvider from "./contexts/History.tsx";
import SettingsContextProvider from "./contexts/Settings.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SettingsContextProvider>
      <HistoryContextProvider>
        <CalculatorProvider>
          <App />
        </CalculatorProvider>
      </HistoryContextProvider>
    </SettingsContextProvider>
  </React.StrictMode>
);
