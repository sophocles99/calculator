import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react";
import Overlay from "./Overlay";
import Switch from "./Switch";
import styles from "../styles/Settings.module.css";
import { SettingsContext } from "../contexts/Settings";

type SettingsProps = {
  setModalsState: Dispatch<SetStateAction<ModalsStateType>>;
};

export default function Settings({ setModalsState }: SettingsProps) {
  const settingsRef = useRef<HTMLDivElement>(null);
  const { settingsState, setSettingsState } = useContext(SettingsContext);

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

  function handleThemeChange(isLightTheme: boolean) {
    setSettingsState((previous) => ({
      ...previous,
      theme: isLightTheme ? "light" : "dark",
    }));
  }

  function handleSoundChange(isSoundOn: boolean) {
    setSettingsState((previous) => ({
      ...previous,
      sound: isSoundOn ? "on" : "off",
    }));
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
            isChecked={settingsState.theme === "light" ? true : false}
            onChangeCallback={handleThemeChange}
          />
          <Switch
            name="sound-effects"
            title="Sound Effects"
            uncheckedLabel="Off"
            checkedLabel="On"
            isChecked={settingsState.sound === "on" ? true : false}
            onChangeCallback={handleSoundChange}
          />
        </div>
      </div>
    </Overlay>
  );
}
