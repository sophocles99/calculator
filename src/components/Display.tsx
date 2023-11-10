import { State } from "../App";
import styles from "../styles/Display.module.css";

type DisplayProps = {
  state: State;
};

export default function Display({ state }: DisplayProps) {
  const { expression, answer, error } = state;
  let displayExpression = expression.replaceAll("/", "\u00F7");
  displayExpression = displayExpression.replaceAll("*", "\u00d7");

  return (
    <section className={styles.display}>
      <p className={styles.expression}>{displayExpression}</p>
      <p className={`${styles.answer} ${error ? styles.error : ""}`}>
        {error ? "Format error" : answer}
      </p>
    </section>
  );
}
