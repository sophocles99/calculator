import Header from "./components/Header";
import Display from "./components/Display";
import Buttons from "./components/Buttons";
import styles from "./styles/App.module.css";
import { useState } from "react";

export type calcState = {
  expression: string,
  answer: string
}

const App = () => {
  const [calcState, setCalcState] = useState({
    expression: "45+45",
    answer: "90"
})

  return (
    <main className={styles.App}>
      <Header />
      <Display calcState={calcState} />
      <Buttons />
    </main>
  );
};

export default App;
