import { useReducer, ReactNode } from "react";
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
  type: "addChar" | "clear";
  value: string;
}

export interface ButtonDef {
  content: ReactNode;
  style: "function" | "operator" | "number";
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  doubleWidth: boolean;
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "addChar": {
      return {
        ...state,
        current: state.current + action.value,
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
            content: <FontAwesomeIcon icon={faPlusMinus} />,
            style: "function",
            onClick: doNothing,
            doubleWidth: false,
          },
          {
            content: <FontAwesomeIcon icon={faPercent} />,
            style: "function",
            onClick: () => dispatch({ type: "addChar", value: "%" }),
            doubleWidth: false,
          },
          {
            content: <FontAwesomeIcon icon={faDivide} />,
            style: "operator",
            onClick: () => dispatch({ type: "addChar", value: "/" }),
            doubleWidth: false,
          },
          {
            content: "7",
            style: "number",
            onClick: () => dispatch({ type: "addChar", value: "7" }),
            doubleWidth: false,
          },
          {
            content: "8",
            style: "number",
            onClick: () => dispatch({ type: "addChar", value: "8" }),
            doubleWidth: false,
          },
          {
            content: "9",
            style: "number",
            onClick: () => dispatch({ type: "addChar", value: "9" }),
            doubleWidth: false,
          },
          {
            content: <FontAwesomeIcon icon={faTimes} />,
            style: "operator",
            onClick: () => dispatch({ type: "addChar", value: "*" }),
            doubleWidth: false,
          },
          {
            content: "4",
            style: "number",
            onClick: () => dispatch({ type: "addChar", value: "4" }),
            doubleWidth: false,
          },
          {
            content: "5",
            style: "number",
            onClick: () => dispatch({ type: "addChar", value: "5" }),
            doubleWidth: false,
          },
          {
            content: "6",
            style: "number",
            onClick: () => dispatch({ type: "addChar", value: "6" }),
            doubleWidth: false,
          },
          {
            content: <FontAwesomeIcon icon={faMinus} />,
            style: "operator",
            onClick: () => dispatch({ type: "addChar", value: "-" }),
            doubleWidth: false,
          },
          {
            content: "1",
            style: "number",
            onClick: () => dispatch({ type: "addChar", value: "1" }),
            doubleWidth: false,
          },
          {
            content: "2",
            style: "number",
            onClick: () => dispatch({ type: "addChar", value: "2" }),
            doubleWidth: false,
          },
          {
            content: "3",
            style: "number",
            onClick: () => dispatch({ type: "addChar", value: "3" }),
            doubleWidth: false,
          },
          {
            content: <FontAwesomeIcon icon={faPlus} />,
            style: "operator",
            onClick: () => dispatch({ type: "addChar", value: "+" }),
            doubleWidth: false,
          },
          {
            content: "0",
            style: "number",
            onClick: () => dispatch({ type: "addChar", value: "0" }),
            doubleWidth: true,
          },
          {
            content: ".",
            style: "number",
            onClick: () => dispatch({ type: "addChar", value: "." }),
            doubleWidth: false,
          },
          {
            content: <FontAwesomeIcon icon={faEquals} />,
            style: "operator",
            onClick: doNothing,
            doubleWidth: false,
          },
        ]}
      />
    </main>
  );
}
