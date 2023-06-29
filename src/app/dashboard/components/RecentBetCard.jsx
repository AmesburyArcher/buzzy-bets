export default function RecentBetCard({ sport, league, team1, team2, date }) {
  return (
    <li>
      <h1>
        {sport} -- {league}
      </h1>
      <h2>{team2 ? `${team1} vs ${team2}` : team1}</h2>
      <h2>{date}</h2>
    </li>
  );
}
