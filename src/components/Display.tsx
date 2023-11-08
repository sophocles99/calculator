import { State } from "../App";
import styles from "../styles/Display.module.css";

type DisplayProps = {
  state: State;
};

export default function Display({ state }: DisplayProps) {
  return (
    <section className={styles.display}>
      <p>{state.previous}</p>
      <p className={styles.main}>{state.current}</p>
    </section>
  );
}
