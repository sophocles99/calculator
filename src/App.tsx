import Display from "./components/Display";
import Header from "./components/Header";
import styles from "./styles/App.module.css";

const App = () => {
  return <main className={styles.App}>
    <Header />
    <Display />
  </main>;
};

export default App;
