import { useContext, useEffect, useRef } from "react";
import { ModalsContext } from "../contexts/Modals";
import Overlay from "./Overlay";
import styles from "../styles/Menu.module.css";

export default function Menu() {
  const menuRef = useRef<HTMLDivElement>(null);
  const { setModalsState } = useContext(ModalsContext);

  function handleSettingsClick(e: React.MouseEvent) {
    e.stopPropagation();
    setModalsState({ isMenuOpen: false, isSettingsOpen: true });
  }

  function handleOutsideClick(e: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setModalsState((previous) => {
        return { ...previous, isMenuOpen: false };
      });
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
          <li>
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
