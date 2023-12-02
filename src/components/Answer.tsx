import { useContext } from "react";
import { CalculatorContext } from "../contexts/Calculator";
import addCommaSeparators from "../utils/addCommaSeparators";
import styles from "../styles/Answer.module.css";

export default function Answer() {
  const { calculatorState } = useContext(CalculatorContext);
  const { answer, error } = calculatorState;
  const answerFormatted = addCommaSeparators(answer);

  return (
    <div className={styles.answerContainer}>
      <p className={`${styles.answer} ${error ? styles.error : ""}`}>
        {error ? error : answer ? answerFormatted : ""}
      </p>
    </div>
  );
}
