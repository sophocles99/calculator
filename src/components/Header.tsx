import { useContext } from "react";
import { HistoryContext } from "../contexts/History";
import Nav from "./Nav";
import styles from "../styles/Header.module.css";

export default function Header() {
  const { historyState } = useContext(HistoryContext);
  const { historyIsOpen } = historyState;
  const title = historyIsOpen ? "History" : "Calculator";

  return (
    <header className={styles.header}>
      <Nav />
      <p className={styles.title}>{title}</p>
    </header>
  );
}
