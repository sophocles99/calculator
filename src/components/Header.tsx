import Nav from "./Nav";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Nav />
      <p className={styles.title}>Calculator</p>
    </header>
  );
}
