import { ButtonDef } from "../App";
import styles from "../styles/Button.module.css";

export default function Button ({ content, style: type, onClick, doubleWidth: isDoubleWidth }: ButtonDef) {
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