import styles from "../styles/Buttons.module.css";
import Button from "./Button";
import { ButtonDef } from "../App";

interface ButtonsProps {
  buttonDefs: ButtonDef[]
}

export default function Buttons({buttonDefs}: ButtonsProps) {
  return (
    <section className={styles.buttons}>
      {buttonDefs.map((buttonDef, index) => {
        return <Button key={index} {...buttonDef} />;
      })}
    </section>
  );
}
