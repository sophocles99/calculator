import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Display from "./components/Display";
import Buttons from "./components/Buttons";
import styles from "./styles/App.module.css";

type IconType = "+-" | "%" | "/" | "*" | "-" | "+" | "=";

type ButtonType = "number" | "operator" | "function";

type ButtonWithIconDefType = {
  value: IconType;
  type: ButtonType;
  icon: true;
  double: boolean;
};

type ButtonWithoutIconDefType = {
  value: string;
  type: ButtonType;
  icon: false;
  double: boolean;
};

export type ButtonDefType = ButtonWithIconDefType | ButtonWithoutIconDefType;

export type State = {
  expression: string;
  answer: string;
  overwrite: boolean;
};

export type Action = {
  type: ButtonType;
  value: string;
};

const DIGITS_REGEX = /[1234567890\.]/;
const OPERATORS_REGEX = /[\+\-\*\/%]/;

function evaluate(localExpression: string) {
  // Remove any trailing operator
  if (OPERATORS_REGEX.test(localExpression.slice(-1))) {
    localExpression = localExpression.slice(0, -1);
  }
  // Split into terms
  const terms = localExpression.split(OPERATORS_REGEX);
  // If at least two terms, evaluate
  if (terms.length >= 2) {
    return eval(localExpression).toString();
  } else {
  // Otherwise return empty string
    return "";
  }
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "number": {
      if (action.value === ".") {
        const terms = state.expression.split(OPERATORS_REGEX);
        const currentTerm = terms[terms.length - 1];
        if (currentTerm.includes(".")) {
          return state;
        }
      }
      const newExpression = state.expression + action.value;
      return {
        ...state,
        expression: newExpression,
        answer: evaluate(newExpression),
      };
    }
    case "operator": {
      if (action.value === "=") {
        if (state.expression) {
          return {
            ...state,
            expression: evaluate(state.expression),
            answer: "",
          };
        }
        return state;
      }
      if (OPERATORS_REGEX.test(state.expression.slice(-1))) {
        state.expression = state.expression.slice(0, -1);
      }
      return {
        ...state,
        expression: state.expression + action.value,
      };
    }
    case "function": {
      switch (action.value) {
        case "C": {
          return {
            ...state,
            expression: "",
            answer: "",
          };
        }
        case "back": {
          const newExpression = state.expression.slice(0, -1);
          return {
            ...state,
            expression: newExpression,
            answer: evaluate(newExpression),
          };
        }
      }
      return state;
    }
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, {
    expression: "",
    answer: "",
    overwrite: false,
  });

  function handleKeyDown(e: KeyboardEvent) {
    const key = e.key;
    if (key === "Backspace") {
      dispatch({ type: "function", value: "back" });
      return;
    }
    let button;
    if (key === "Enter" || key === " ") {
      button = document.getElementById("=");
    } else {
      button = document.getElementById(key.toUpperCase());
    }
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
