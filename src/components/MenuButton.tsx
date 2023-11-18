import { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/MenuButton.module.css";

type MenuButtonProps = {
  setModalsState: Dispatch<SetStateAction<ModalsStateType>>;
};

export default function MenuButton({ setModalsState }: MenuButtonProps) {
  return (
    <button
      className={styles.menuButton}
      onClick={(e) => {
        e.stopPropagation(); // to prevent click triggering handleOutsideClick in Menu
        setModalsState((previous) => ({
          ...previous,
          isMenuOpen: !previous.isMenuOpen,
        }));
      }}
    >
      <FontAwesomeIcon icon={faEllipsisVertical} />
    </button>
  );
}
