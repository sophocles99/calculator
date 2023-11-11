import styles from "../styles/Display.module.css";
import Expression from "./Expression";

type DisplayProps = {
  state: State;
};

export default function Display({ state }: DisplayProps) {
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
