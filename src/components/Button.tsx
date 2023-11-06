import { ReactNode } from "react";
import styles from "../styles/Button.module.css";

export type ButtonProps = {
  content: ReactNode;
  type: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  isDoubleWidth: boolean;
};

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
