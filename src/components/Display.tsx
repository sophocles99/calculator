import styles from "../styles/Display.module.css";
import Expression from "./Expression";

type DisplayProps = {
  state: State;
};

export default function Display({ state }: DisplayProps) {
  const { expression, answer, error } = state;
  let displayExpression = expression.replaceAll("/", "\u00F7");
  displayExpression = displayExpression.replaceAll("*", "\u00d7");

  return (
    <section className={styles.display}>
      <Expression>{displayExpression}</Expression>
      <p className={`${styles.answer} ${error ? styles.error : ""}`}>
        {error ? "Format error" : answer}
      </p>
    </section>
  );
}
