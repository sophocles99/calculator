import styles from "../styles/Buttons.module.css";
import Button from "./Button";
import { Dispatch } from "react";
import buttonDefs from "../buttonDefs";

type ButtonsProps = {
  dispatch: Dispatch<Action>;
};

export default function Buttons({ dispatch }: ButtonsProps) {
  return (
    <section className={styles.buttons}>
      {buttonDefs.map((buttonDef, index) => {
        return <Button key={index} {...buttonDef} dispatch={dispatch} />;
      })}
    </section>
  );
}
