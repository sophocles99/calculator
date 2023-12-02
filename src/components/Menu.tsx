import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import { HistoryContext } from "../contexts/History";
import Overlay from "./Overlay";
import styles from "../styles/Menu.module.css";

type MenuProps = {
  setModalsState: Dispatch<SetStateAction<ModalsStateType>>;
};

export default function Menu({ setModalsState }: MenuProps) {
  const { historyDispatch } = useContext(HistoryContext);
  const menuRef = useRef<HTMLDivElement>(null);

  function handleHistoryClick(e: React.MouseEvent) {
    e.stopPropagation();
    setModalsState((previous) => ({ ...previous, isMenuOpen: false }));
    historyDispatch({
      type: "function",
      payload: { value: "toggleHistoryIsOpen" },
    });
  }

  function handleSettingsClick(e: React.MouseEvent) {
    e.stopPropagation();
    setModalsState({ isMenuOpen: false, isSettingsOpen: true });
  }

  function handleOutsideClick(e: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setModalsState((previous) => ({ ...previous, isMenuOpen: false }));
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <Overlay>
      <div ref={menuRef} className={styles.menu}>
        <ul>
          <li onClick={handleHistoryClick}>
            <p>History</p>
          </li>
          <li onClick={handleSettingsClick}>
            <p>Settings</p>
          </li>
        </ul>
      </div>
    </Overlay>
  );
}
