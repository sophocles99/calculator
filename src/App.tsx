import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Display from "./components/Display";
import Buttons from "./components/Buttons";
import styles from "./styles/App.module.css";
import {default as buttonStyles} from './styles/Button.module.css'

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
  error: boolean;
};

export type Action = {
  type: ButtonType;
  value: string;
};

const OPERATORS_REGEX = /[\+\-\*\/%]/;

function containsTwoTerms(localExpression: string) {
  const terms = localExpression.split(OPERATORS_REGEX);
  console.log("containsTwoTerms, terms: ", terms);
  return terms.length >= 2 && terms[0] && terms[1];
}

function evaluate(localExpression: string) {
  if (OPERATORS_REGEX.test(localExpression.slice(-1))) {
    localExpression = localExpression.slice(0, -1);
  }
  try {
    return eval(localExpression).toString();
  } catch (error) {
    console.log(error);
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
      if (state.overwrite) {
        return {
          ...state,
          expression: action.value,
          answer: "",
          overwrite: false,
          error: false,
        };
      } else {
        const newExpression = state.expression + action.value;
        const newAnswer = containsTwoTerms(newExpression)
          ? evaluate(newExpression)
          : "";
        return {
          ...state,
          expression: newExpression,
          answer: newAnswer,
          error: false,
        };
      }
    }

    case "operator": {
      if (action.value === "=") {
        if (containsTwoTerms(state.expression)) {
          const evaluatedExpression = evaluate(state.expression);
          if (evaluatedExpression === "") {
            return {
              ...state,
              error: true,
            };
          } else {
            return {
              ...state,
              expression: evaluatedExpression,
              answer: "",
              overwrite: true,
            };
          }
        }
        return state;
      }
      if (OPERATORS_REGEX.test(state.expression.slice(-1))) {
        state.expression = state.expression.slice(0, -1);
      }
      return {
        ...state,
        expression: state.expression + action.value,
        overwrite: false,
      };
    }
    case "function": {
      switch (action.value) {
        case "C": {
          return {
            ...state,
            expression: "",
            answer: "",
            error: false,
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
    error: false,
  });

  function handleKeyDown(e: KeyboardEvent) {
    let key = e.key;
    if (key === "Backspace") {
      dispatch({ type: "function", value: "back" });
      return;
    }
    if (key === "Escape") {
      key = "C"
    }
    if (key === "Enter" || key === " ") {
      key = "="
    }

    const button = document.getElementById(key.toUpperCase());
    if (button) {
      button.click();
      button.classList.add(buttonStyles.active);
      setTimeout(() => {
        button?.classList.remove(buttonStyles.active);
      }, 200);
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
