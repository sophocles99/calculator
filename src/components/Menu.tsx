import { Dispatch } from "react";
import styles from "../styles/Menu.module.css";

type MenuProps = {
  setOpenMenu: Dispatch<React.SetStateAction<boolean>>;
  setOpenSettings: Dispatch<React.SetStateAction<boolean>>;
};

export default function Menu({ setOpenMenu, setOpenSettings }: MenuProps) {
  function handleSettingsClick() {
    setOpenSettings(true);
    setOpenMenu(false);
  }

  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <p>History</p>
        </li>
        <li onClick={handleSettingsClick}>
          <p>Settings</p>
        </li>
      </ul>
    </div>
  );
}
