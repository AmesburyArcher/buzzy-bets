import { queryAllBetLogs } from "../../../firebase/firestore/firestore";
import { useAuth } from "@/contexts/AuthContext";
import RecentBetCard from "./RecentBetCard";

export default async function RecentBets() {
  const querySnapshot = await queryAllBetLogs();

  console.log(querySnapshot);
  return (
    <li>
      {querySnapshot &&
        querySnapshot.map((q) => {
          const data = q.data();
          <RecentBetCard
            sport={data.sport}
            league={data.league}
            team1={data.team1}
            team2={data.team2}
            date={data.date}
          />;
        })}
    </li>
  );
}
