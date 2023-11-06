import styles from "../styles/Buttons.module.css";
import Button, { ButtonProps } from "./Button";
import buttonDefs from "./buttonDefs";

const Buttons = () => {
  return (
    <section className={styles.buttons}>
      {buttonDefs.map((buttonDef: ButtonProps) => {
        return <Button {...buttonDef} />;
      })}
    </section>
  );
};

export default Buttons;
