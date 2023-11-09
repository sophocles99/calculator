import { Dispatch } from "react";
import { Action, ButtonDefType } from "../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusMinus,
  faPercent,
  faDivide,
  faTimes,
  faMinus,
  faPlus,
  faEquals,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Button.module.css";

type ButtonProps = ButtonDefType & { dispatch: Dispatch<Action> };

const icons = {
  "+-": faPlusMinus,
  "%": faPercent,
  "/": faDivide,
  "*": faTimes,
  "-": faMinus,
  "+": faPlus,
  "=": faEquals,
};

export default function Button({
  value,
  type,
  icon,
  double,
  dispatch,
}: ButtonProps) {
  return (
    <button
      id={value}
      className={`${styles.button} ${styles[type]} ${
        double ? styles.doubleWidth : ""
      }`}
      onClick={() => dispatch({ type, value })}
    >
      {icon ? <FontAwesomeIcon icon={icons[value]} /> : value}
    </button>
  );
}
