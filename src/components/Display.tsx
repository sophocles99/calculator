import { useContext } from "react";
import { HistoryContext } from "../contexts/History";
import Answer from "./Answer";
import Expression from "./Expression";
import History from "./History";
import styles from "../styles/Display.module.css";

export default function Display() {
  const { isHistoryOpen } = useContext(HistoryContext);

  return (
    <section className={styles.display}>
      {isHistoryOpen ? (
        <History />
      ) : (
        <>
          <Expression />
          <Answer />
        </>
      )}
    </section>
  );
}
