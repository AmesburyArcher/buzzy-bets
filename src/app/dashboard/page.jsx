"use client";

import styles from "./Dashboard.module.css";
import LogBetForm from "./components/LogBetForm";
import { useRef } from "react";
import { queryAllBetLogs } from "@/firebase/firestore/firestore";
import RecentBets from "./components/RecentBets";

export default function Dashboard() {
  const formModal = useRef();

  return (
    <div className={styles.main__dashboard}>
      <div className={styles.dashboard__header}>
        <h1>Dashboard Hub</h1>
        <button
          className={styles.log__bet__button}
          onClick={function () {
            formModal.current.showModal();
          }}
        >
          + Log Bet
        </button>
      </div>
      <div className={styles.widgets__container}>
        <div className={styles.left__widgets__container}>
          <div className={styles.left__widget}>Graph Overall Line Graph</div>
          <div className={styles.left__widget}>
            Graph Different Sports Bar Graph
          </div>
        </div>
        <div className={styles.right__widgets__container}>
          <div className={styles.right__widget}>{/* <RecentBets /> */}</div>
          <div className={styles.right__widget}>Right Bottom</div>
        </div>
      </div>
      <dialog ref={formModal} className={styles.modal}>
        <LogBetForm modalRef={formModal} />
      </dialog>
    </div>
  );
}
