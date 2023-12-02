import { useEffect, useState } from "react";
import styles from "../styles/Switch.module.css";

type SwitchProps = {
  name: string;
  title: string;
  uncheckedLabel: string;
  checkedLabel: string;
  isChecked: boolean;
  onChangeCallback: (newValue: boolean) => void;
};

export default function Switch({
  name,
  title,
  uncheckedLabel,
  checkedLabel,
  isChecked,
  onChangeCallback,
}: SwitchProps) {
  const [checked, setChecked] = useState(isChecked);

  useEffect(() => {
    onChangeCallback(checked);
  }, [checked]);

  return (
    <label htmlFor={name} className={styles.switchContainer}>
      <h3 className={styles.switchName}>{title}</h3>
      <input
        type="checkbox"
        id={name}
        className={styles.switchInput}
        checked={checked}
        onChange={() => {
          setChecked((previous) => !previous);
        }}
      />
      <div className={styles.switchRow}>
        {uncheckedLabel}
        <div className={styles.switchFill}></div>
        {checkedLabel}
      </div>
    </label>
  );
}
