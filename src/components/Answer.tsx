import { useContext, useRef } from "react";
import { CalculatorLogicContext } from "../contexts/CalculatorLogic";
import formatAnswer from "../utils/formatAnswer";
import styles from "../styles/Display.module.css";

export default function Answer() {
  const { state } = useContext(CalculatorLogicContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const container = containerRef.current;

  const { answer, error } = state;
  let answerFormatted = "";

  if (answer && container) {
    answerFormatted = formatAnswer(answer, container);
  }

  return (
    <div ref={containerRef} className={styles.answerContainer}>
      <p className={`${styles.answer} ${error ? styles.error : ""}`}>
        {error ? "Format error" : answerFormatted}
      </p>
    </div>
  );
}
