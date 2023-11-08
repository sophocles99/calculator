import { ButtonDef } from "../App";
import styles from "../styles/Button.module.css";

export default function Button ({ content, type, onClick, isDoubleWidth }: ButtonDef) {
  return (
    <button
      className={`${styles.button} ${styles[type]} ${
        isDoubleWidth ? styles.doubleWidth : ""
      }`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};