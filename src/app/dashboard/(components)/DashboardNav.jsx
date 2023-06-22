import Link from "next/link";
import styles from "../Dashboard.module.css";

export default function DashboardNav() {
  return (
    <nav className={styles.dashboard__nav}>
      <Link href="/update-profile">update profile link </Link>
    </nav>
  );
}
