import { ButtonDef } from "../App";
import styles from "../styles/Button.module.css";

export default function Button({
  content,
  style,
  onClick,
  doubleWidth,
}: ButtonDef) {
  return (
    <button
      className={`${styles.button} ${styles[style]} ${
        doubleWidth ? styles.doubleWidth : ""
      }`}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
