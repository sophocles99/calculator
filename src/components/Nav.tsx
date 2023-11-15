import { useState } from "react";
import Menu from "./Menu";
import Settings from "./Settings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Nav.module.css";

export default function Nav() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <nav className={styles.nav}>
      <button
        className={styles.menuButton}
        onClick={() => setOpenMenu((previous: boolean) => !previous)}
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </button>
      {openMenu && (
        <Menu setOpenMenu={setOpenMenu} setOpenSettings={setOpenSettings} />
      )}
      {openSettings && <Settings />}
    </nav>
  );
}
