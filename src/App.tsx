import { useReducer, useState, ReactNode } from "react";
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

export interface ButtonDef {
  content: ReactNode;
  type: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
  isDoubleWidth: boolean;
}

const doNothing = () => {};

export default function App() {
  const [state, setCalcState] = useState({
    previous: "45+45",
    current: "90",
  });

  return (
    <main className={styles.App}>
      <Header />
      <Display state={state} />
      <Buttons buttonDefs={[
         { content: "C", type: "function", onClick: doNothing, isDoubleWidth: false },
         {
           content: <FontAwesomeIcon icon={faPlusMinus} />,
           type: "function",
           onClick: doNothing,
           isDoubleWidth: false,
         },
         {
           content: <FontAwesomeIcon icon={faPercent} />,
           type: "function",
           onClick: doNothing,
           isDoubleWidth: false,
         },
         {
           content: <FontAwesomeIcon icon={faDivide} />,
           type: "operator",
           onClick: doNothing,
           isDoubleWidth: false,
         },
         { content: "7", type: "number", onClick: doNothing, isDoubleWidth: false },
         { content: "8", type: "number", onClick: doNothing, isDoubleWidth: false },
         { content: "9", type: "number", onClick: doNothing, isDoubleWidth: false },
         {
           content: <FontAwesomeIcon icon={faTimes} />,
           type: "operator",
           onClick: doNothing,
           isDoubleWidth: false,
         },
         { content: "4", type: "number", onClick: doNothing, isDoubleWidth: false },
         { content: "5", type: "number", onClick: doNothing, isDoubleWidth: false },
         { content: "6", type: "number", onClick: doNothing, isDoubleWidth: false },
         {
           content: <FontAwesomeIcon icon={faMinus} />,
           type: "operator",
           onClick: doNothing,
           isDoubleWidth: false,
         },
         { content: "1", type: "number", onClick: doNothing, isDoubleWidth: false },
         { content: "2", type: "number", onClick: doNothing, isDoubleWidth: false },
         { content: "3", type: "number", onClick: doNothing, isDoubleWidth: false },
         {
           content: <FontAwesomeIcon icon={faPlus} />,
           type: "operator",
           onClick: doNothing,
           isDoubleWidth: false,
         },
         { content: "0", type: "number", onClick: doNothing, isDoubleWidth: true },
         { content: ".", type: "number", onClick: doNothing, isDoubleWidth: false },
         {
           content: <FontAwesomeIcon icon={faEquals} />,
           type: "operator",
           onClick: doNothing,
           isDoubleWidth: false,
         },
      ]}/>
    </main>
  );
}
