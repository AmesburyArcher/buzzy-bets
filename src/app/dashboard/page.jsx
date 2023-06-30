import styles from "./Dashboard.module.css";
import LogBetForm from "./components/LogBetForm";
import { queryAllBetLogs } from "@/firebase/firestore/firestore";
import RecentBets from "./components/RecentBets";
import LogBetFormModal from "./components/LogBetFormModal";

export default function Dashboard() {
  return (
    <div className={styles.main__dashboard}>
      <div className={styles.dashboard__header}>
        <h1>Dashboard Hub</h1>
        <LogBetFormModal />
      </div>
      <div className={styles.widgets__container}>
        <div className={styles.left__widgets__container}>
          <div className={styles.left__widget}>Graph Overall Line Graph</div>
          <div className={styles.left__widget}>
            Graph Different Sports Bar Graph
          </div>
        </div>
        <div className={styles.right__widgets__container}>
          <div className={styles.right__widget}>{/* <RecentBets /> */}</div>
          <div className={styles.right__widget}>Right Bottom</div>
        </div>
      </div>
    </div>
  );
}
