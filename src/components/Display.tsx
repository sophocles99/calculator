import { useContext } from "react";
import styles from "../styles/Display.module.css";
import Expression from "./Expression";
import { CalculatorLogicContext } from "../contexts/CalculatorLogic";

export default function Display() {
  const { state } = useContext(CalculatorLogicContext);
  const { expression, answer, error } = state;

  return (
    <section className={styles.display}>
      <Expression expression={expression} />
      <p className={`${styles.answer} ${error ? styles.error : ""}`}>
        {error ? "Format error" : answer}
      </p>
    </section>
  );
}
