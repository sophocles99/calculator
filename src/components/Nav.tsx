import { useState } from "react";
import MenuButton from "./MenuButton";
import Menu from "./Menu";
import Settings from "./Settings";
import styles from "../styles/Nav.module.css";

export default function Nav() {
  const initialModalsState: ModalsStateType = {
    isMenuOpen: false,
    isSettingsOpen: false,
  };
  const [modalsState, setModalsState] = useState(initialModalsState);
  const { isMenuOpen, isSettingsOpen } = modalsState;

  return (
    <nav className={styles.nav}>
      <MenuButton setModalsState={setModalsState} />
      {isMenuOpen && <Menu setModalsState={setModalsState} />}
      {isSettingsOpen && <Settings setModalsState={setModalsState} />}
    </nav>
  );
}
