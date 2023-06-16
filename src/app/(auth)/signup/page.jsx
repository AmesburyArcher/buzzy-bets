"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { verifyPassword, verifyEmail } from "../../../helpers/verification";
import { TriangleAlert } from "../../../helpers/svgIcons";
import { addUserToDB } from "../../../firebase/firestore/firestore";
import Link from "next/link";
import styles from "../(components)/AuthComponents.module.css";
import pageStyles from "./SignUpPage.module.css";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailRequired, setEmailRequired] = useState(false);
  const [userName, setUsername] = useState("");
  const [usernameRequired, setUsernameRequired] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [passwordError, setPasswordError] = useState([]);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordRequired, setConfirmPasswordRequired] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  const handleForm = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      return setError("Passwords do not match!");
    }
    if (passwordError.length > 0) {
      return setError(
        "Password provided does not meet requirements. Read below to see what is required"
      );
    }

    try {
      setError("");
      setLoading(true);
      const user = await signUp(email, password);

      const userInfo = {
        email: user.user.email,
        username: userName,
        uuid: user.user.uid,
      };

      await addUserToDB(user.user, userInfo);

      setLoading(false);
      setPasswordError([]);
      setEmailRequired(false);
      setUsernameRequired(false);
      setPasswordRequired(false);
      setConfirmPasswordRequired(false);
      router.push("/");
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case "auth/email-already-exists":
          setError("Email has already been registered.");
          break;
        case "auth/invalid-password":
          setError("Password must contain at least 6 characters.");
          break;
        default:
          setError("An error has occurred please try again.");
      }
      setLoading(false);
    }
  };

  const handlePasswordIntegrity = function () {
    if (password === "") return setPasswordError([]);
    const errors = verifyPassword(password);
    if (errors.length > 0) {
      setPasswordError(errors);
    } else {
      setPasswordError([]);
    }
  };

  const handleEmailIntegrity = function () {
    const valid = verifyEmail(email);
    if (!valid) setEmailError("Please enter valid email address.");
  };

  const checkEmptyFields = function () {
    if (
      email === "" ||
      userName === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      if (email === "") setEmailRequired(true);
      if (userName === "") setUsernameRequired(true);
      if (password === "") setPasswordRequired(true);
      if (confirmPassword === "") setConfirmPasswordRequired(true);
      return;
    }
  };

  return (
    <div className={pageStyles.page}>
      <h1>Register for BuzzyBets!</h1>
      <form onSubmit={handleForm} className={styles.form}>
        {error && <h1>{error}</h1>}
        <div className={styles.input_container}>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            onClick={() => setEmailRequired(false)}
            onBlur={handleEmailIntegrity}
            required
            value={email}
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            autoComplete="new-username"
            className={styles.input}
          />
          <span
            className={emailRequired ? styles.required : styles.not__required}
          >
            <TriangleAlert />
            Required
          </span>
          {emailError && (
            <div>
              <span>{emailError}</span>
            </div>
          )}
        </div>
        <div className={styles.input_container}>
          <label htmlFor="username">Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            onClick={() => setUsernameRequired(false)}
            required
            value={userName}
            type="text"
            name="username"
            id="username"
            placeholder="BuzzyGuy99"
            className={styles.input}
          />
          <span
            className={
              usernameRequired ? styles.required : styles.not__required
            }
          >
            <TriangleAlert />
            Required
          </span>
        </div>
        <div className={styles.input_container}>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            onClick={() => setPasswordRequired(false)}
            onBlur={handlePasswordIntegrity}
            required
            value={password}
            type="password"
            name="password"
            id="password"
            placeholder="*******"
            autoComplete="new-password"
            className={styles.input}
          />
          <span
            className={
              passwordRequired ? styles.required : styles.not__required
            }
          >
            <TriangleAlert />
            Required
          </span>
          {passwordError.length > 0 && (
            <div>
              <span>
                <TriangleAlert />
              </span>
              <ul>
                {passwordError.map((err, i) => {
                  return <li key={i}>{err}</li>;
                })}
              </ul>
            </div>
          )}
        </div>
        <div className={styles.input_container}>
          <label htmlFor="confirm__password">Confirm Password</label>
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            onClick={() => setConfirmPasswordRequired(false)}
            required
            value={confirmPassword}
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="*******"
            className={styles.input}
            disabled={passwordError.length > 0}
          />
          <span
            className={
              confirmPasswordRequired ? styles.required : styles.not__required
            }
          >
            <TriangleAlert />
            Required
          </span>
          {passwordError.length > 0 && (
            <div>
              <span>Fix issues with password</span>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          onClick={checkEmptyFields}
          className={styles.submit__button}
        >
          Sign Up
        </button>
      </form>
      <div>
        Already have an account? <Link href="/login">Log In</Link>
      </div>
    </div>
  );
}
