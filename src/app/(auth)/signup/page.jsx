"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { verifyPassword } from "../../../helpers/verification";
import { TriangleAlert } from "../../../helpers/svgIcons";
import Link from "next/link";
import styles from "../(components)/AuthComponents.module.css";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [emailRequired, setEmailRequired] = useState(false);
  const [userName, setUsername] = useState("");
  const [userNameRequired, setUsernameRequired] = useState(false);
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
    if (
      email === "" ||
      userName === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      if (email === "") setEmailRequired(true);
      if (userName === "") setUsernameRequired(true);
      if (password === "") setPasswordRequired(true);
      if (confirmPassword === "") confirmPasswordRequired(true);
      return;
    }
    if (passwordError.length > 0) {
      return setError(
        "Password provided does not meet requirements. Read below to see what is required"
      );
    }
    if (password != confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(email, password);
      setLoading(false);
      setPasswordError([]);
      setEmailRequired(false);
      setUsernameRequired(false);
      setPasswordRequired(false);
      setConfirmPasswordRequired(false);
      router.push("/");
    } catch (error) {
      switch (error) {
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

  return (
    <div className="signup__form__wrapper">
      <form onSubmit={handleForm} className={styles.form}>
        {error && <h1>{error}</h1>}
        <div className={styles.input_container}>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            autoComplete="new-username"
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="username">Username</label>
          <input
            onChange={(e) => setUsername(e.target.value)}
            required
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
        </div>
        <div className={styles.input_container}>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            onBlur={handlePasswordIntegrity}
            required
            type="password"
            name="password"
            id="password"
            placeholder="password"
            autoComplete="new-password"
          />
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
            required
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="confirm password"
          />
        </div>
        <button type="submit" disabled={loading}>
          Sign Up
        </button>
      </form>
      <div>
        Already have an account? <Link href="/login">Log In</Link>
      </div>
    </div>
  );
}
