import { State } from "../App";
import styles from "../styles/Display.module.css";

type DisplayProps = {
  state: State;
};

export default function Display({ state }: DisplayProps) {
  let displayPrevious = state.previous.replaceAll("/", "\u00F7");
  displayPrevious = displayPrevious.replaceAll("*", "\u00d7");
  let displayCurrent = state.current.replaceAll("/", "\u00F7");
  displayCurrent = displayCurrent.replaceAll("*", "\u00d7");

  return (
    <section className={styles.display}>
      <p className={styles.previous}>{displayPrevious}</p>
      <p className={styles.current}>{displayCurrent}</p>
    </section>
  );
}
