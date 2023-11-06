import Nav from "./Nav";
import styles from "../styles/Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <Nav />
      <p className={styles.title}>Calculator</p>
    </header>
  );
};

export default Header;
