import { ButtonDef } from "../App";
import styles from "../styles/Button.module.css";

export default function Button({
  content,
  icon,
  style,
  onClick,
  doubleWidth,
}: ButtonDef) {
  return (
    <button
      id={content}
      className={`${styles.button} ${styles[style]} ${
        doubleWidth ? styles.doubleWidth : ""
      }`}
      onClick={onClick}
    >
      {icon ? icon : content}
    </button>
  );
}
