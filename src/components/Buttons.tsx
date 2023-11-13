import styles from "../styles/Buttons.module.css";
import Button from "./Button";
import buttonDefs from "../buttonDefs";

export default function Buttons() {
  return (
    <section className={styles.buttons}>
      {buttonDefs.map((buttonDef, index) => {
        return <Button key={index} {...buttonDef} />;
      })}
    </section>
  );
}
