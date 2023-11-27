import { useContext } from "react";
import { SettingsContext } from "../contexts/Settings";
import { CalculatorContext } from "../contexts/Calculator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDeleteLeft,
  faPlusMinus,
  faDivide,
  faTimes,
  faMinus,
  faPlus,
  faEquals,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Button.module.css";

const icons = {
  back: faDeleteLeft,
  "+-": faPlusMinus,
  "/": faDivide,
  "*": faTimes,
  "-": faMinus,
  "+": faPlus,
  "=": faEquals,
};

const clickSounds = Array(5).fill(new Audio("clickSound.wav"));
const equalsSounds = Array(5).fill(new Audio("equalsSound.wav"));
let clickSoundIndex = 0;
let equalsSoundIndex = 0;

const playClick = () => {
  clickSounds[clickSoundIndex].play();
  clickSoundIndex = (clickSoundIndex + 1) % 5;
};

const playEquals = () => {
  equalsSounds[equalsSoundIndex].play();
  equalsSoundIndex = (equalsSoundIndex + 1) % 5;
};

const playSound = (value: string) => {
  if (value === "=") playEquals();
  else playClick();
};

export default function Button({ value, type, icon, double }: ButtonDefType) {
  const { dispatch } = useContext(CalculatorContext);
  const {
    settingsState: { sound },
  } = useContext(SettingsContext);

  return (
    <button
      id={value}
      className={`${styles.button} ${styles[type]} ${
        double ? styles.doubleWidth : ""
      }`}
      onClick={() => {
        sound === "on" && playSound(value);
        dispatch({ type, payload: value });
      }}
    >
      {icon ? <FontAwesomeIcon icon={icons[value]} /> : value}
    </button>
  );
}
