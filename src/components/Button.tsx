import { ButtonProps } from "../buttonDefs";
import styles from "../styles/Button.module.css";

const Button = ({ content, type, onClick, isDoubleWidth }: ButtonProps) => {
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

export default Button;
