import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/CloseButton.module.css";

type CloseButtonProps = {
  onClickCallback: () => void;
};

export default function CloseButton({ onClickCallback }: CloseButtonProps) {
  return (
    <div className={styles.closeButtonContainer}>
      <button className={styles.closeButton} onClick={onClickCallback}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
}
