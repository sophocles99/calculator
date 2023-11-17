import { useContext, useEffect, useRef } from "react";
import { ModalsContext } from "../contexts/Modals";
import Overlay from "./Overlay";
import styles from "../styles/Settings.module.css";

export default function Settings() {
  const settingsRef = useRef<HTMLDivElement>(null);
  const { setModalsState } = useContext(ModalsContext);

  function handleOutsideClick(e: MouseEvent) {
    if (
      settingsRef.current &&
      !settingsRef.current.contains(e.target as Node)
    ) {
      setModalsState((previous) => {
        return { ...previous, isSettingsOpen: false };
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
      <div className={styles.settingsContainer}>
        <div ref={settingsRef} className={styles.settings}>
          <p>Theme</p>
          <p>Dark / Light</p>
          <p>Sound Effects</p>
          <p>On / Off</p>
        </div>
      </div>
    </Overlay>
  );
}
