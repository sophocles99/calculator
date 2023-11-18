import { useState } from "react";
import styles from "../styles/Switch.module.css";

type SwitchProps = {
  name: string;
  title: string;
  uncheckedLabel: string;
  checkedLabel: string;
  isChecked: boolean;
  onChange: (newValue: boolean) => void;
};

export default function Switch({
  name,
  title,
  uncheckedLabel,
  checkedLabel,
  isChecked,
  onChange,
}: SwitchProps) {
  const [checked, setChecked] = useState(isChecked);

  const handleChange = () => {
    setChecked(previous => {
      onChange(!previous)
      return !previous
    })
  }

  return (
    <label htmlFor={name} className={styles.switchContainer}>
      <h3 className={styles.switchName}>
        {title}
      </h3>
      <input
        type="checkbox"
        id={name}
        className={styles.switchInput}
        checked={checked}
        onChange={handleChange}
      />
      <div className={styles.switchRow}>
        {uncheckedLabel}
        <div className={styles.switchFill}></div>
        {checkedLabel}
      </div>
    </label>
  );
}
