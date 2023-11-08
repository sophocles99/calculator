import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import styles from "../styles/Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <button className={styles.closeButton}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </button>
    </nav>
  );
}
