import { Dispatch, MouseEvent, SetStateAction, useEffect, useRef } from "react";
import styles from "../styles/Menu.module.css";

type MenuProps = {
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function Menu({ setIsMenuOpen, setIsSettingsOpen }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  function handleOutsideClick(event: MouseEventInit) {
    const e = event as unknown as MouseEvent;
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsMenuOpen(false);
    }
  }

  function handleSettingsClick() {
    setIsSettingsOpen(true);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    setTimeout(() => {
      document.addEventListener("click", handleOutsideClick);
    }, 0);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.menuOverlay}>
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
    </div>
  );
}
