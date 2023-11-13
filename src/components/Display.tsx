import styles from "../styles/Display.module.css";
import Expression from "./Expression";
import Answer from "./Answer";

export default function Display() {
  return (
    <section className={styles.display}>
      <Expression />
      <Answer />
    </section>
  );
}
