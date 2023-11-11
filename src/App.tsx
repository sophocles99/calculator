import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Display from "./components/Display";
import Buttons from "./components/Buttons";
import calculatorReducer from "./utils/calculatorReducer";
import styles from "./styles/App.module.css";
import { default as buttonStyles } from "./styles/Button.module.css";

const keyMap: { [index: string]: string } = {
  Enter: "=",
  Spacebar: "=",
  Escape: "C",
};

export default function App() {
  const [state, dispatch] = useReducer(calculatorReducer, {
    expression: "",
    answer: "",
    overwrite: false,
    error: false,
  });

  function handleKeyDown(e: KeyboardEvent) {
    let key = e.key;
    if (Object.keys(keyMap).includes(key)) {
      key = keyMap[key];
    }
    if (key === "Backspace") {
      dispatch({ type: "function", value: "back" });
      e.preventDefault();
      return;
    }

    const button = document.getElementById(key.toUpperCase());
    if (button) {
      e.preventDefault();
      button.click();
      button.classList.add(buttonStyles.active);
      setTimeout(() => {
        button?.classList.remove(buttonStyles.active);
      }, 200);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className={styles.App}>
      <Header />
      <Display state={state} />
      <Buttons dispatch={dispatch} />
    </main>
  );
}
