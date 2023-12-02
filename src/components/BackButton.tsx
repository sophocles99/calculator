import { useContext } from "react";
import { HistoryContext } from "../contexts/History";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/BackButton.module.css";

export default function BackButton() {
  const { historyDispatch } = useContext(HistoryContext);

  return (
    <button
      className={styles.backButton}
      onClick={() => {
        historyDispatch({ type: "function", payload: { value: "close" } });
      }}
    >
      <FontAwesomeIcon icon={faAngleLeft} />
    </button>
  );
}
