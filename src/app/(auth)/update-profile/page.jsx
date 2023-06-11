"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  updatePasswordNew,
  updateEmailNew,
} from "../../../firebase/auth/updateProfile";
import styles from "../(components)/AuthComponents.module.css";
import pageStyles from "./UpdatePage.module.css";

import Link from "next/link";

export default function UpdateUserProfile() {
  const [email, setEmail] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [validated, setValidated] = useState(false);

  const router = useRouter();
  const { currentUser, authenticate } = useAuth();

  const dialogRef = useRef(null);

  useEffect(() => {
    if (currentUser == null) {
      router.push("/login");
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  const handleFormEmail = async (e) => {
    e.preventDefault();

    if (password != currPassword) {
      return setError("Passwords do not match!");
    }

    try {
      setError("");
      setLoading(true);
      updateEmailNew(email);
      setLoading(false);
    } catch (error) {
      switch (error) {
        default:
          setError("An error has occurred please try again.");
      }
      setLoading(false);
      setCurrPassword("");
    }
  };

  const handlePasswordMatch = async (e) => {
    e.preventDefault();
    try {
      await authenticate(currPassword);
      setValidated(true);
    } catch (e) {
      console.log(e.code);
    }
  };

  return !validated ? (
    <div className={pageStyles.page}>
      <div>
        <h1 className={pageStyles.confirm__heading}>
          You must confirm your password to edit your information
        </h1>
        <form onSubmit={handlePasswordMatch} className={styles.form}>
          <div className={styles.input_container}>
            <label htmlFor="password_current">Current Password</label>
            <input
              onChange={(e) => setCurrPassword(e.target.value)}
              value={currPassword}
              type="password"
              name="password_current"
              id="password_current"
              placeholder="current password"
              autoComplete="new-password"
              className={styles.input}
            />
          </div>
          <button disabled={loading} className={styles.submit__button}>
            Confirm
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className={pageStyles.page}>
      <form onSubmit={handleFormEmail} className={styles.form}>
        <h2>Update Email</h2>
        {error && <h1>{error}</h1>}
        {emailSuccess && <h1>{emailSuccess}</h1>}
        <div className={styles.input_container}>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            defaultValue={currentUser.email}
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            autoComplete="new-username"
            className={styles.input}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.submit__button}
        >
          Update Email
        </button>
      </form>
      <form
        onSubmit={function () {
          handleForm;
        }}
        className={styles.form}
      >
        <h2>Update Password</h2>
        <div className={styles.input_container}>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            autoComplete="new-password"
            className={styles.input}
          />
        </div>

        <div className={styles.input_container}>
          <label htmlFor="confirm_password">Confirm Password</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="confirm password"
            className={styles.input}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.submit__button}
        >
          Update Password
        </button>
      </form>
      <div>
        <Link href="/">Cancel</Link>
      </div>
    </div>
  );
}
