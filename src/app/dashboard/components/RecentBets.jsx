"use client";

import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { queryAllBetLogs } from "@/firebase/firestore/firestore";
import firebase_app from "@/firebase/config";
import styles from "../Dashboard.module.css";
import RecentBetCard from "./RecentBetCard";
import LoadingScreen from "@/components/LoadingScreen";

export default function RecentBets() {
  const auth = getAuth(firebase_app);
  const [user, loading, error] = useAuthState(auth);

  if (loading) return <div>LOADING</div>;
  if (error) return <div>ERROR</div>;

  const [value, loadingData, errorData] = queryAllBetLogs(user);

  return (
    <ul className={styles.recent__bets__list}>
      {loadingData && <LoadingScreen />}
      {errorData && <div>ERROR data</div>}
      {value &&
        value.docs.map((q) => {
          const data = q.data();
          console.log(data);
          return (
            <RecentBetCard
              key={data.uid}
              sport={data.sport}
              league={data.league}
              team1={data.team1}
              team2={data.team2}
              date={data.date}
            />
          );
        })}
    </ul>
  );
}
