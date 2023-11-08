import { useEffect, useReducer, ReactNode } from "react";
import Header from "./components/Header";
import Display from "./components/Display";
import Buttons from "./components/Buttons";
import styles from "./styles/App.module.css";

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

export interface State {
  previous: string;
  current: string;
}

interface Action {
  type: "addDigit" | "addOperator" | "clear";
  value: string;
}

export interface ButtonDef {
  content: string;
  icon?: ReactNode;
  style: "function" | "operator" | "number";
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  doubleWidth: boolean;
}

const DIGITS_REGEX = /[1234567890\.]/;
const OPERATORS_REGEX = /[\+\-\*\/%]/;

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "addDigit": {
      return {
        ...state,
        current: state.current + action.value,
      };
    }
    case "addOperator": {
      let newCurrent = state.current;
      if (OPERATORS_REGEX.test(newCurrent.slice(-1))) {
        newCurrent = newCurrent.slice(0, -1);
      }
      newCurrent += action.value;
      return {
        ...state,
        current: newCurrent,
      };
    }
    case "clear": {
      return {
        ...state,
        current: "",
      };
    }
  }
}

const doNothing = () => {};

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    previous: "45+45",
    current: "90",
  });

  function handleKeyDown(e: KeyboardEvent) {
    const button = document.getElementById(e.key.toUpperCase());
    if (button) {
      button.click();
    }
    // const key = e.key;
    // const actionType = DIGITS_REGEX.test(key)
    //   ? "addDigit"
    //   : OPERATORS_REGEX.test(key)
    //   ? "addOperator"
    //   : key === "c" || key === "C"
    //   ? "clear"
    //   : null;
    // if (actionType) {
    //   dispatch({ type: actionType, value: key });
    // }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className={styles.App}>
      <Header />
      <Display state={state} />
      <Buttons
        buttonDefs={[
          {
            content: "C",
            style: "function",
            onClick: () => dispatch({ type: "clear", value: "" }),
            doubleWidth: false,
          },
          {
            content: "+-",
            icon: <FontAwesomeIcon icon={faPlusMinus} />,
            style: "function",
            onClick: doNothing,
            doubleWidth: false,
          },
          {
            content: "%",
            icon: <FontAwesomeIcon icon={faPercent} />,
            style: "function",
            onClick: () => dispatch({ type: "addOperator", value: "%" }),
            doubleWidth: false,
          },
          {
            content: "/",
            icon: <FontAwesomeIcon icon={faDivide} />,
            style: "operator",
            onClick: () => dispatch({ type: "addOperator", value: "/" }),
            doubleWidth: false,
          },
          {
            content: "7",
            style: "number",
            onClick: () => dispatch({ type: "addDigit", value: "7" }),
            doubleWidth: false,
          },
          {
            content: "8",
            style: "number",
            onClick: () => dispatch({ type: "addDigit", value: "8" }),
            doubleWidth: false,
          },
          {
            content: "9",
            style: "number",
            onClick: () => dispatch({ type: "addDigit", value: "9" }),
            doubleWidth: false,
          },
          {
            content: "*",
            icon: <FontAwesomeIcon icon={faTimes} />,
            style: "operator",
            onClick: () => dispatch({ type: "addOperator", value: "*" }),
            doubleWidth: false,
          },
          {
            content: "4",
            style: "number",
            onClick: () => dispatch({ type: "addDigit", value: "4" }),
            doubleWidth: false,
          },
          {
            content: "5",
            style: "number",
            onClick: () => dispatch({ type: "addDigit", value: "5" }),
            doubleWidth: false,
          },
          {
            content: "6",
            style: "number",
            onClick: () => dispatch({ type: "addDigit", value: "6" }),
            doubleWidth: false,
          },
          {
            content: "-",
            icon: <FontAwesomeIcon icon={faMinus} />,
            style: "operator",
            onClick: () => dispatch({ type: "addOperator", value: "-" }),
            doubleWidth: false,
          },
          {
            content: "1",
            style: "number",
            onClick: () => dispatch({ type: "addDigit", value: "1" }),
            doubleWidth: false,
          },
          {
            content: "2",
            style: "number",
            onClick: () => dispatch({ type: "addDigit", value: "2" }),
            doubleWidth: false,
          },
          {
            content: "3",
            style: "number",
            onClick: () => dispatch({ type: "addDigit", value: "3" }),
            doubleWidth: false,
          },
          {
            content: "+",
            icon: <FontAwesomeIcon icon={faPlus} />,
            style: "operator",
            onClick: () => dispatch({ type: "addOperator", value: "+" }),
            doubleWidth: false,
          },
          {
            content: "0",
            style: "number",
            onClick: () => dispatch({ type: "addDigit", value: "0" }),
            doubleWidth: true,
          },
          {
            content: ".",
            style: "number",
            onClick: () => dispatch({ type: "addDigit", value: "." }),
            doubleWidth: false,
          },
          {
            content: "=",
            icon: <FontAwesomeIcon icon={faEquals} />,
            style: "operator",
            onClick: doNothing,
            doubleWidth: false,
          },
        ]}
      />
    </main>
  );
}
