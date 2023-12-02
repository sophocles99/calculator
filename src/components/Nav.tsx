import { useContext, useState } from "react";
import { HistoryContext } from "../contexts/History";
import BackButton from "./BackButton";
import MenuButton from "./MenuButton";
import Menu from "./Menu";
import Settings from "./Settings";
import styles from "../styles/Nav.module.css";

export default function Nav() {
  const {
    historyState: { historyIsOpen },
  } = useContext(HistoryContext);

  const initialModalsState: ModalsStateType = {
    isMenuOpen: false,
    isSettingsOpen: false,
  };
  const [modalsState, setModalsState] = useState(initialModalsState);
  const { isMenuOpen, isSettingsOpen } = modalsState;

  return (
    <nav className={styles.nav}>
      {historyIsOpen ? <BackButton /> : <span></span>}
      <MenuButton setModalsState={setModalsState} />
      {isMenuOpen && <Menu setModalsState={setModalsState} />}
      {isSettingsOpen && <Settings setModalsState={setModalsState} />}
    </nav>
  );
}
