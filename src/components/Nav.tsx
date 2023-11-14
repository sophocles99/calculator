import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <button className={styles.closeButton}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </button>
    </nav>
  );
}
