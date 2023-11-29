import addCommaSeparators from "../utils/addCommaSeparators";
import formatExpression from "../utils/formatExpression";
import styles from "../styles/History.module.css";

export default function History() {
  let storedHistory: string[] = [];
  const storedHistoryJSON = localStorage.getItem("history");
  if (storedHistoryJSON) {
    storedHistory = JSON.parse(storedHistoryJSON);
  }
  return (
    <div className={styles.historyContainer}>
      {storedHistory.map(([expression, answer], index) => (
        <p className={styles.historyLine} key={index}>
          {formatExpression(expression)} = {addCommaSeparators(answer)}
        </p>
      ))}
    </div>
  );
}
