import DashboardNav from "./components/DashboardNav";
import styles from "./Dashboard.module.css";

export default function DashboardLayout({ children }) {
  return (
    <div className={styles.dashboard__container}>
      <DashboardNav />
      {children}
    </div>
  );
}
