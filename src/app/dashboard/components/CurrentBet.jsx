import styles from "../Dashboard.module.css";

export default function CurrentBet({ betType, team, wager, result }) {
  console.log("hit");
  return (
    <li className={styles.current__bet__item}>
      <div className={styles.current__bet__item__left}>
        <h2>{betType}</h2>
        <h2>{team}</h2>
      </div>
      <div className={styles.current__bet__item__right}>
        <h3>{wager}</h3>
        <h3>{result}</h3>
      </div>
    </li>
  );
}
