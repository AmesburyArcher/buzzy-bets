"use client";
import { useEffect, useState } from "react";
import { auth, queryAllBetLegs } from "../../../firebase/firestore/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import LoadingScreen from "@/components/LoadingScreen";

export default function RecordSummary() {
  const [user, loading, error] = useAuthState(auth);
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [processing, setProcessing] = useState(false);

  if (loading) return <div>LOADING</div>;
  if (error) return <div>ERROR</div>;

  const [value, loadingData, errorData] = queryAllBetLegs(user);

  const setData = function () {
    setProcessing(true);
    let wins = 0;
    let losses = 0;
    value.docs.forEach((val) => {
      const data = val.data();
      if (data.result === "Win") wins++;
      if (data.result === "Loss") losses++;
    });
    setWins(wins);
    setLosses(losses);
    setProcessing(false);
  };

  useEffect(() => {
    if (!loadingData && value) {
      setData();
    }
  }, [loadingData, value]);

  return (
    <div>
      {loadingData || (processing && <LoadingScreen />)}
      {errorData && <div>{JSON.stringify(errorData)}</div>}
      {value && (
        <div>
          <h4>Wins: {wins}</h4>
          <h4>Losses: {losses}</h4>
        </div>
      )}
    </div>
  );
}
