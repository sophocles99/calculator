import { useContext } from "react";
import { ModalsContext } from "../contexts/Modals";
import MenuButton from "./MenuButton";
import Menu from "./Menu";
import Settings from "./Settings";
import styles from "../styles/Nav.module.css";

export default function Nav() {
  const { modalsState, setModalsState } = useContext(ModalsContext);
  const { isMenuOpen, isSettingsOpen } = modalsState;

  return (
    <nav className={styles.nav}>
      <MenuButton setModalsState={setModalsState} />
      {isMenuOpen && <Menu />}
      {isSettingsOpen && <Settings />}
    </nav>
  );
}
