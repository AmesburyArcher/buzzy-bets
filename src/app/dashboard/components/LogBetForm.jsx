"use client";
import { useState } from "react";
import styles from "../Dashboard.module.css";
import formStyles from "../../(auth)/(components)/AuthComponents.module.css";

export default function LogBetForm() {
  const [sport, setSport] = useState("");
  const [league, setLeague] = useState("");
  const [team1, setTeam1] = useState("");
  const [team2, setTeam2] = useState("");
  const [bookMaker, setBookMaker] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [bets, setBets] = useState([]);

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
            <label>Bet Type</label>
            <input
              type="text"
              className={formStyles.input}
              placeholder="Moneyline"
            />
            <label>Odds</label>
            <input type="text" className={formStyles.input} placeholder="150" />
            <label>Wager</label>
            <input
              type="text"
              className={formStyles.input}
              placeholder="$150"
            />
            <label>Team</label>
            <input
              type="text"
              className={formStyles.input}
              placeholder="Boston Bruins"
            />
            <label>Result</label>
            <input type="text" className={formStyles.input} placeholder="Win" />
            <label>Earnings</label>
            <input
              type="text"
              className={formStyles.input}
              placeholder="+$375"
            />
          </div>
          <button type="button">Add Another Play</button>
        </div>
        <button formMethod="dialog">Cancel Bet</button>
        <button>Submit Bet</button>
      </form>
    </div>
  );
}
