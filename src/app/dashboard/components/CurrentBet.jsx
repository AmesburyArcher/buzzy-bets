export default function CurrentBet({ betType, team, wager, result }) {
  console.log("hit");
  return (
    <div>
      <div>
        <h2>{betType}</h2>
        <h2>{team}</h2>
      </div>
      <div>
        <h3>{wager}</h3>
        <h3>{result}</h3>
      </div>
    </div>
  );
}
