"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { doc, setDoc, collection, writeBatch } from "firebase/firestore";
import {
  db,
  queryUser,
  queryAllBetLogs,
} from "../../../firebase/firestore/firestore";
import { useAuth } from "@/contexts/AuthContext";
import styles from "../Dashboard.module.css";
import formStyles from "../../(auth)/(components)/AuthComponents.module.css";
import CurrentBet from "./CurrentBet";
import { sportsData } from "../../../dataObjects/sportsData"

export default function LogBetForm({ modalRef }) {
  const [sport, setSport] = useState("");
  const [league, setLeague] = useState("");
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [bookMaker, setBookMaker] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [bets, setBets] = useState([]);

  const [currentBets, setCurrentBets] = useState([]);
  const [betType, setBetType] = useState("");
  const [odds, setOdds] = useState("");
  const [wager, setWager] = useState("");
  const [teamBet, setTeamBet] = useState("");
  const [result, setResult] = useState("");
  const [earnings, setEarnings] = useState("");

  const [error, setError] = useState("");
  const [sportError, setSportError] = useState("");

  const { currentUser } = useAuth();

  const resetFields = function () {
    setSport("");
    setLeague("");
    setTeam1("");
    setTeam2("");
    setBookMaker("");
    setDate("");
    setNotes("");
    setBetType("");
    setOdds("");
    setWager("");
    setTeamBet("");
    setResult("");
    setEarnings("");
    setCurrentBets([]);
  };

  const handleAddNewBet = function () {
    const bet = {
      betType: betType.toLowerCase(),
      odds,
      wager,
      team: teamBet.toLowerCase(),
      result: result.toLowerCase(),
      earnings:
        earnings > 0 && result.toLowerCase() === "loss" ? -earnings : earnings,
    };
    setBetType("");
    setOdds("");
    setWager("");
    setTeamBet("");
    setResult("");
    setEarnings("");

    setCurrentBets([...currentBets, bet]);
  };

  const handleForm = async function (e) {
    e.preventDefault();

    if (currentBets.length === 0) {
      setError("Please add a leg to your bet");
      return;
    }

    if (sport === "Choose Sport") {
      setSportError("Please select a valid sport");
      return;
    }

    try {
      const uidForBet = uuidv4();

      const betData = {
        sport: sport.toLowerCase(),
        league: league.toLowerCase(),
        team1: team1.toLowerCase(),
        ...(team2 && { team2: team2.toLowerCase() }),
        bookMaker: bookMaker.toLowerCase(),
        date,
        notes,
        uid: uidForBet,
        userID: currentUser.uid,
      };
      const batch = writeBatch(db);

      const docRef = doc(db, "users", currentUser.uid, "bets", uidForBet);
      batch.set(docRef, betData);

      currentBets.forEach((bet) => {
        const betID = uuidv4();
        const curBetsRef = doc(
          db,
          "users",
          currentUser.uid,
          "bets",
          uidForBet,
          "bets_placed",
          betID
        );
        const curBet = {
          ...bet,
          uid: betID,
          userID: currentUser.uid,
        };
        batch.set(curBetsRef, curBet);
      });
      await batch.commit();
      resetFields();
      modalRef.current.close();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.form__container} onSubmit={handleForm}>
      {error && <div>{error}</div>}
      <div className={styles.form__container__left}>
        <div className={formStyles.input_container}>
          <label>Sport Selection</label>
          <select
            value={sport}
            onChange={function (e) {
              setSport(e.target.value);
            }}
          >
            {sportsData.map(sport => <option value={sport}>{sport}</option>)}
            {/* <option value="Choose Sport">Choose Sport</option>
            <option value="Hockey">Hockey</option>
            <option value="Soccer">Soccer</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Baseball">Baseball</option>
            <option value="Tennis">Tennis</option>
            <option value="Golf">Golf</option> */}
          </select>
        </div>
        <div className={formStyles.input_container}>
          <label>League</label>
          <input
            type="text"
            className={formStyles.input}
            value={league}
            onChange={function (e) {
              setLeague(e.target.value);
            }}
            placeholder="NHL"
          />
        </div>
        <div className={formStyles.input_container}>
          <label>Teams</label>
          <input
            type="text"
            className={formStyles.input}
            value={team1}
            onChange={function (e) {
              setTeam1(e.target.value);
            }}
            placeholder="Boston Bruins"
          />
          <input
            type="text"
            className={formStyles.input}
            value={team2}
            onChange={function (e) {
              setTeam2(e.target.value);
            }}
            placeholder="Toronto Maple Leafs"
          />
        </div>
        <div className={formStyles.input_container}>
          <label>Book Maker</label>
          <input
            type="text"
            className={formStyles.input}
            value={bookMaker}
            onChange={function (e) {
              setBookMaker(e.target.value);
            }}
            placeholder="Bet365"
          />
        </div>
        <div className={formStyles.input_container}>
          <label>Date</label>
          <input
            type="date"
            className={formStyles.input}
            value={date}
            onChange={function (e) {
              setDate(e.target.value);
            }}
          />
        </div>
        <div className={formStyles.input_container}>
          <label>Notes</label>
          <textarea
            value={notes}
            onChange={function (e) {
              setNotes(e.target.value);
            }}
            placeholder="Never fade the bruins"
          />
        </div>
      </div>
      <div className={styles.form__container__right}>
        {currentBets.length > 0 &&
          currentBets.map((bet) => (
            <CurrentBet
              key={uuidv4()}
              betType={bet.betType}
              team={bet.team}
              wager={bet.wager}
              result={bet.result}
            />
          ))}
        <div className={formStyles.input_container}>
          <label>Bet Type</label>
          <input
            type="text"
            className={formStyles.input}
            placeholder="Moneyline"
            value={betType}
            onChange={function (e) {
              setBetType(e.target.value);
            }}
          />
          <label>Odds</label>
          <input
            type="number"
            className={formStyles.input}
            placeholder="150"
            value={odds}
            onChange={function (e) {
              setOdds(e.target.value);
            }}
          />
          <label>Wager</label>
          <input
            type="number"
            className={formStyles.input}
            placeholder="150"
            value={wager}
            onChange={function (e) {
              setWager(e.target.value);
            }}
          />
          <label>Team</label>
          <input
            type="text"
            className={formStyles.input}
            placeholder="Boston Bruins"
            value={teamBet}
            onChange={function (e) {
              setTeamBet(e.target.value);
            }}
          />
          <label>Result</label>
          <input
            type="text"
            className={formStyles.input}
            placeholder="Win"
            value={result}
            onChange={function (e) {
              setResult(e.target.value);
            }}
          />
          <label>Earnings</label>
          <input
            type="number"
            className={formStyles.input}
            placeholder="375"
            value={earnings}
            onChange={function (e) {
              setEarnings(e.target.value);
            }}
          />
        </div>
        <button type="button" onClick={handleAddNewBet}>
          Add Bet To Log
        </button>
      </div>
      <button
        type="button"
        onClick={function () {
          resetFields();
          modalRef.current.close();
        }}
      >
        Cancel Bet
      </button>
      <button formMethod="dialog">Submit Bet</button>
    </form>
  );
}
