import Header from "./components/Header";
import Display from "./components/Display";
import Buttons from "./components/Buttons";
import styles from "./styles/App.module.css";

const App = () => {
  return (
    <main className={styles.App}>
      <Header />
      <Display />
      <Buttons />
    </main>
  );
};

export default App;
