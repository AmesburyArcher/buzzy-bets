"use client";
import { useState } from "react";
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

    setCurrentBets([...currentBets, bet]);
  };

  const displayCurrentBets = function () {
    currentBets.forEach();
  };

  return (
    <div>
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
              placeholder="NHL"
            />
          </div>
          <div className={formStyles.input_container}>
            <label>Teams</label>
            <input
              type="text"
              className={formStyles.input}
              value={team1}
              placeholder="Boston Bruins"
            />
            <input
              type="text"
              className={formStyles.input}
              value={team2}
              placeholder="Toronto Maple Leafs"
            />
          </div>
          <div className={formStyles.input_container}>
            <label>Book Maker</label>
            <input
              type="text"
              className={formStyles.input}
              value={bookMaker}
              placeholder="Bet365"
            />
          </div>
          <div className={formStyles.input_container}>
            <label>Date</label>
            <input type="date" className={formStyles.input} value={date} />
          </div>
          <div className={formStyles.input_container}>
            <label>Notes</label>
            <textarea value={notes} placeholder="Never fade the bruins" />
          </div>
        </div>
        <div className={styles.form__container__right}>
          <div className={formStyles.input_container}>
            {currentBets.length > 0 ? displayCurrentBets() : ""}
            <label>Bet Type</label>
            <input
              type="text"
              className={formStyles.input}
              placeholder="Moneyline"
              value={betType}
            />
            <label>Odds</label>
            <input
              type="text"
              className={formStyles.input}
              placeholder="150"
              value={odds}
            />
            <label>Wager</label>
            <input
              type="text"
              className={formStyles.input}
              placeholder="$150"
              value={wager}
            />
            <label>Team</label>
            <input
              type="text"
              className={formStyles.input}
              placeholder="Boston Bruins"
              value={teamBet}
            />
            <label>Result</label>
            <input
              type="text"
              className={formStyles.input}
              placeholder="Win"
              value={result}
            />
            <label>Earnings</label>
            <input
              type="text"
              className={formStyles.input}
              placeholder="+$375"
              value={earngings}
            />
          </div>
          <button type="button" onClick={handleAddNewBet}>
            Add Another Play
          </button>
        </div>
        <button formMethod="dialog">Cancel Bet</button>
        <button>Submit Bet</button>
      </form>
    </div>
  );
}
