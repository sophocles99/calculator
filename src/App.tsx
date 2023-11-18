import { useContext, useEffect } from "react";
import { CalculatorLogicContext } from "./contexts/CalculatorLogic";
import { handleKeyDownDispatch, handleKeyUp } from "./utils/handleKeyEvents";
import Header from "./components/Header";
import Display from "./components/Display";
import Buttons from "./components/Buttons";
import styles from "./App.module.css";
import { SettingsContext } from "./contexts/Settings";

export default function App() {
  const { dispatch } = useContext(CalculatorLogicContext);
  const { settingsState } = useContext(SettingsContext);
  const { theme } = settingsState;

  function handleKeyDown(e: KeyboardEvent) {
    handleKeyDownDispatch(e, dispatch);
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <main className={`${styles.App} ${styles[theme]}`}>
      <Header />
      <Display />
      <Buttons />
    </main>
  );
}
