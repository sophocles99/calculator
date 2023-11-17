import { useContext, useEffect, useRef } from "react";
import { ModalsContext } from "../contexts/Modals";
import Overlay from "./Overlay";
import Switch from "./Switch";
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
          <h2>Settings</h2>
          <Switch
            name="theme"
            title="Theme"
            uncheckedLabel="Dark"
            checkedLabel="Light"
            isChecked={true}
            onChange={() => {}}
          />
          <Switch
            name="sound-effects"
            title="Sound Effects"
            uncheckedLabel="Off"
            checkedLabel="On"
            isChecked={true}
            onChange={() => {}}
          />
        </div>
      </div>
    </Overlay>
  );
}
