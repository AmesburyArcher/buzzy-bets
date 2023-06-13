"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  updatePasswordNew,
  updateEmailNew,
} from "../../../firebase/auth/updateProfile";
import { verifyEmail, verifyPassword } from "@/helpers/verification";
import styles from "../(components)/AuthComponents.module.css";
import pageStyles from "./UpdatePage.module.css";

import Link from "next/link";

export default function UpdateUserProfile() {
  const [success, setSuccess] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [validated, setValidated] = useState(false);
  const [validatedError, setValidatedError] = useState("");

  const router = useRouter();
  const { currentUser, authenticate } = useAuth();

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
    setSuccess("");
    setError("");

    const validEmail = verifyEmail(email);
    if (!validEmail)
      return setEmailError("Please enter a valid email address.");

    try {
      setLoading(true);
      await updateEmailNew(email);
      setEmailError("");
      setSuccess("Email successfully updated!");
    } catch (error) {
      switch (error) {
        default:
          if (error.code === "auth/invalid-email")
            setError("Please enter a valid email address.");
          else setError("An error has occurred please try again.");
      }
      setLoading(false);
    }
  };

  const handleFormPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validPass = verifyPassword(password);
    if (validPass.length > 0) return setError("Please enter a valid password.");
    if (password != confirmPassword)
      return setError("Password provided do not match.");

    try {
      setLoading(true);
      await updatePasswordNew(password);
      setPasswordError("");
      setSuccess("Password successfully updated!");
    } catch (error) {
      switch (error) {
        default:
          setError("An error has occurred please try again.");
      }
      setLoading(false);
    }
  };

  const handlePasswordMatch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authenticate(currPassword);
      setValidated(true);
      setValidatedError("");
    } catch (e) {
      if (e.code === "auth/wrong-password")
        setValidatedError("Incorrect password for currently signed in user.");
    }
    setLoading(false);
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
              placeholder="verify password"
              autoComplete="new-password"
              className={styles.input}
            />
            {validatedError && (
              <div className={styles.error__span}>
                <span>{validatedError}</span>
              </div>
            )}
          </div>
          <button disabled={loading} className={styles.submit__button}>
            Confirm
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className={pageStyles.page}>
      {error && <h1>{error}</h1>}
      <form onSubmit={handleFormEmail} className={styles.form}>
        <h2>Update Email</h2>
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
          {emailError && (
            <div className={styles.error__span}>
              <span>{emailError}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.submit__button}
        >
          Update Email
        </button>
      </form>
      <form onSubmit={handleFormPassword} className={styles.form}>
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
