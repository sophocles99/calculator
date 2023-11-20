import { default as buttonStyles } from "../styles/Button.module.css";

const keyMap: { [index: string]: string } = {
  " ": "=",
  Backspace: "back",
  c: "C",
  Enter: "=",
  Escape: "C",
};

export function handleKeyDownDispatch(e: KeyboardEvent) {
  let key = e.key;
  if (Object.keys(keyMap).includes(key)) {
    key = keyMap[key];
  }

  const button = document.getElementById(key);
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

  const button = document.getElementById(key);
  if (button) {
    e.preventDefault();
    button.classList.remove(buttonStyles.active);
  }
}
