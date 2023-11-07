import { calcState } from "../App";
import styles from "../styles/Display.module.css";

type DisplayProps = {
  calcState: calcState
}

const Display = ({calcState}: DisplayProps) => {
  return <section className={styles.display}>
    <p>{calcState.answer ? calcState.expression : ""}</p>
    <p className={styles.main}>{calcState.answer ? calcState.answer : calcState.expression}</p>
  </section>;
};

export default Display;
