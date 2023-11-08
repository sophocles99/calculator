import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Display from "./components/Display";
import Buttons from "./components/Buttons";
import styles from "./styles/App.module.css";

type Icon = "+-" | "%" | "/" | "*" | "-" | "+" | "=";

type ButtonType = "number" | "operator" | "function";

type ButtonDefIcon = {
  value: Icon;
  type: ButtonType;
  icon: true;
  double: boolean;
};

type ButtonDefNoIcon = {
  value: string;
  type: ButtonType;
  icon: false;
  double: boolean;
};

export type ButtonDef = ButtonDefIcon | ButtonDefNoIcon;

export type State = {
  previous: string;
  current: string;
};

export type Action = {
  type: ButtonType;
  value: string;
};

const DIGITS_REGEX = /[1234567890\.]/;
const OPERATORS_REGEX = /[\+\-\*\/%]/;

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "number": {
      // if (action.value === "." && state.current.includes(".")) return;
      return {
        ...state,
        current: state.current + action.value,
      };
    }
    case "operator": {
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
    case "function": {
      return {
        ...state,
        current: "",
      };
    }
  }
}

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
        dispatch={dispatch}
        buttonDefs={[
          {
            value: "C",
            type: "function",
            icon: false,
            double: false,
          },
          {
            value: "+-",
            type: "function",
            icon: true,
            double: false,
          },
          {
            value: "%",
            type: "function",
            icon: true,
            double: false,
          },
          {
            value: "/",
            type: "operator",
            icon: true,
            double: false,
          },
          {
            value: "7",
            type: "number",
            icon: false,
            double: false,
          },
          {
            value: "8",
            type: "number",
            icon: false,
            double: false,
          },
          {
            value: "9",
            type: "number",
            icon: false,
            double: false,
          },
          {
            value: "*",
            type: "operator",
            icon: true,
            double: false,
          },
          {
            value: "4",
            type: "number",
            icon: false,
            double: false,
          },
          {
            value: "5",
            type: "number",
            icon: false,
            double: false,
          },
          {
            value: "6",
            type: "number",
            icon: false,
            double: false,
          },
          {
            value: "-",
            type: "operator",
            icon: false,
            double: false,
          },
          {
            value: "1",
            type: "number",
            icon: false,
            double: false,
          },
          {
            value: "2",
            type: "number",
            icon: false,
            double: false,
          },
          {
            value: "3",
            type: "number",
            icon: false,
            double: false,
          },
          {
            value: "+",
            type: "operator",
            icon: true,
            double: false,
          },
          {
            value: "0",
            type: "number",
            icon: false,
            double: true,
          },
          {
            value: ".",
            type: "number",
            icon: false,
            double: false,
          },
          {
            value: "=",
            type: "operator",
            icon: true,
            double: false,
          },
        ]}
      />
    </main>
  );
}
