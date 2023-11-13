import { useContext } from "react";
import { CalculatorLogicContext } from "../contexts/CalculatorLogic";
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

const icons = {
  "+-": faPlusMinus,
  "%": faPercent,
  "/": faDivide,
  "*": faTimes,
  "-": faMinus,
  "+": faPlus,
  "=": faEquals,
};

export default function Button({ value, type, icon, double }: ButtonDefType) {
  const { dispatch } = useContext(CalculatorLogicContext);

  return (
    <button
      id={value}
      className={`${styles.button} ${styles[type]} ${
        double ? styles.doubleWidth : ""
      }`}
      onClick={() => dispatch({ type, payload: value })}
    >
      {icon ? <FontAwesomeIcon icon={icons[value]} /> : value}
    </button>
  );
}
