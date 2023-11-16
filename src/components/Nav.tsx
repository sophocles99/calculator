import { useState } from "react";
import Menu from "./Menu";
import Settings from "./Settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Nav.module.css";

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <button
        className={styles.menuButton}
        onClick={() => setIsMenuOpen((previous: boolean) => !previous)}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </button>
      {isMenuOpen && (
        <Menu setIsMenuOpen={setIsMenuOpen} setIsSettingsOpen={setIsSettingsOpen} />
      )}
      {isSettingsOpen && <Settings />}
    </nav>
  );
}
