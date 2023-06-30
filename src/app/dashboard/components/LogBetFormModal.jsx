"use client";

import { useRef } from "react";
import LogBetForm from "./LogBetForm";
import styles from "../Dashboard.module.css";

export default function LogBetFormModal() {
  const formModal = useRef();
  return (
    <div>
      <button
        className={styles.log__bet__button}
        onClick={function () {
          formModal.current.showModal();
        }}
      >
        + Log Bet
      </button>
      <dialog ref={formModal} className={styles.modal}>
        <LogBetForm modalRef={formModal} />
      </dialog>
    </div>
  );
}
