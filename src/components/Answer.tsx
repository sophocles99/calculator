import { useContext } from "react";
import { CalculatorLogicContext } from "../contexts/CalculatorLogic";
import addCommaSeparators from "../utils/addCommaSeparators";
import styles from "../styles/Answer.module.css";

export default function Answer() {
  const { state } = useContext(CalculatorLogicContext);
  const { answer, error } = state;
  const answerFormatted = addCommaSeparators(answer);

  return (
    <div className={styles.answerContainer}>
      <p className={`${styles.answer} ${error ? styles.error : ""}`}>
        {error ? error : answer ? answerFormatted : ""}
      </p>
    </div>
  );
}
