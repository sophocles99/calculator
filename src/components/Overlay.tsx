import styles from "../styles/Overlay.module.css";

export default function Overlay({ children }: ChildrenType) {
  return <div className={styles.overlay}>{children}</div>;
}
