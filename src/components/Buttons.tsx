import styles from "../styles/Buttons.module.css";
import Button from "./Button";
import { Dispatch } from "react";

type ButtonsProps = {
  buttonDefs: ButtonDefType[];
  dispatch: Dispatch<Action>;
};

export default function Buttons({ buttonDefs, dispatch }: ButtonsProps) {
  return (
    <section className={styles.buttons}>
      {buttonDefs.map((buttonDef, index) => {
        return <Button key={index} {...buttonDef} dispatch={dispatch} />;
      })}
    </section>
  );
}
