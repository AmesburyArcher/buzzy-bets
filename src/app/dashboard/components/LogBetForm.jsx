"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "@/contexts/AuthContext";
import styles from "../Dashboard.module.css";
import formStyles from "../../(auth)/(components)/AuthComponents.module.css";
import CurrentBet from "./CurrentBet";

export default function LogBetForm() {
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
  const [earngings, setEarngings] = useState("");

  const handleAddNewBet = function () {
    const bet = {
      betType,
      odds,
      wager,
      team: teamBet,
      result,
      earngings,
    };
    setBetType("");
    setOdds("");
    setWager("");
    setTeamBet("");
    setResult("");
    setEarngings("");

    setCurrentBets([...currentBets, bet]);
    console.log(currentBets);
  };

  return (
    <form className={styles.form__container}>
      <div className={styles.form__container__left}>
        <div className={formStyles.input_container}>
          <label>Sport Selection</label>
          <select
            value={sport}
            onChange={function (e) {
              setSport(e.target.value);
            }}
          >
            <option value="Hockey">Hockey</option>
            <option value="Soccer">Soccer</option>
            <option value="Football">Football</option>
            <option value="Basketball">Basketball</option>
            <option value="Baseball">Baseball</option>
            <option value="Tennis">Tennis</option>
            <option value="Golf">Golf</option>
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
              key={uuidv4}
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
            type="text"
            className={formStyles.input}
            placeholder="150"
            value={odds}
            onChange={function (e) {
              setOdds(e.target.value);
            }}
          />
          <label>Wager</label>
          <input
            type="text"
            className={formStyles.input}
            placeholder="$150"
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
            type="text"
            className={formStyles.input}
            placeholder="+$375"
            value={earngings}
            onChange={function (e) {
              setEarngings(e.target.value);
            }}
          />
        </div>
        <button type="button" onClick={handleAddNewBet}>
          Add Another Play
        </button>
      </div>
      <button formMethod="dialog">Cancel Bet</button>
      <button>Submit Bet</button>
    </form>
  );
}
