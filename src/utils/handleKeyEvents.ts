import { Dispatch } from "react";
import { default as buttonStyles } from "../styles/Button.module.css";

const keyMap: { [index: string]: string } = {
  Enter: "=",
  Spacebar: "=",
  Escape: "C",
};

export function handleKeyDownDispatch(
  e: KeyboardEvent,
  dispatch: Dispatch<ActionType>
) {
  let key = e.key;
  if (Object.keys(keyMap).includes(key)) {
    key = keyMap[key];
  }

  if (key === "Backspace") {
    dispatch({ type: "function", payload: "back" });
    e.preventDefault();
    return;
  }

  const button = document.getElementById(key.toUpperCase());
  if (button) {
    e.preventDefault();
    button.click();
    if (e.type === "keydown") {
      button.classList.add(buttonStyles.active);
    }
  }
}

export function handleKeyUp(e: KeyboardEvent) {
  let key = e.key;
  if (Object.keys(keyMap).includes(key)) {
    key = keyMap[key];
  }

  const button = document.getElementById(key.toUpperCase());
  if (button) {
    e.preventDefault();
    button.classList.remove(buttonStyles.active);
  }
}
