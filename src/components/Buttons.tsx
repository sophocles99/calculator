import styles from "../styles/Buttons.module.css";
import Button from "./Button";
import buttonDefs, { ButtonProps } from "../buttonDefs";

const Buttons = () => {
  return (
    <section className={styles.buttons}>
      {buttonDefs.map((buttonDef: ButtonProps, index) => {
        return <Button key={index} {...buttonDef} />;
      })}
    </section>
  );
};

export default Buttons;
