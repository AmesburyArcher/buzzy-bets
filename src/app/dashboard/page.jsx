import styles from "./Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.main__dashboard}>
      <h1>Dashboard Hub</h1>
      <div className={styles.widgets__container}>
        <div className={styles.left__widgets__container}>
          <div className={styles.left__widget}>Graph Overall Line Graph</div>
          <div className={styles.left__widget}>
            Graph Different Sports Bar Graph
          </div>
        </div>
        <div className={styles.right__widgets__container}>
          <div className={styles.right__widget}>Right Top</div>
          <div className={styles.right__widget}>Right Bottom</div>
        </div>
      </div>
    </div>
  );
}
