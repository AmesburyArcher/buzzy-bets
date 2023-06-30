import styles from "../Dashboard.module.css";

export default function RecentBetCard({ sport, league, team1, team2, date }) {
  return (
    <li className={styles.recent__bet__card}>
      <div>
        <h4>{sport}</h4>
        <h4>{team2 ? `${team1} vs ${team2}` : team1}</h4>
      </div>
      <div>
        <h4>{league}</h4>
        <h4>{date}</h4>
      </div>
    </li>
  );
}
