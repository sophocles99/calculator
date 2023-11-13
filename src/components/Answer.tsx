import { useContext } from "react";
import { CalculatorLogicContext } from "../contexts/CalculatorLogic";
import styles from "../styles/Display.module.css";

export default function Answer() {
  const { state } = useContext(CalculatorLogicContext);
  const { answer, error } = state;

  return (
    <p className={`${styles.answer} ${error ? styles.error : ""}`}>
      {error ? "Format error" : answer}
    </p>
  );
}
