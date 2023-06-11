"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import styles from "../(components)/AuthComponents.module.css";
import pageStyles from "./LoginPage.module.css";
import EmailAndPassword from "../(components)/emailAndPassword";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = "";
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signIn(email, password);
      setLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/email-already-exists":
          setError("Email has already been registered.");
          break;
        case "auth/invalid-password":
          setError("Password must contain at least 6 characters.");
          break;
        case "auth/user-not-found":
          setError("User could not be found with the provided credentials");
          break;
        default:
          setError("An error has occurred please try again.");
      }
      setLoading(false);
    }
  };

  return (
    <div className={pageStyles.page}>
      <h1>Log in to BuzzyBets!</h1>
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
            value={email}
            className={styles.input}
          />
          {emailError && (
            <div>
              <span>{emailError}</span>
            </div>
          )}
        </div>
        <div className={styles.input_container}>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            name="password"
            id="password"
            placeholder="password"
            autoComplete="new-password"
            value={password}
            className={styles.input}
          />
          {passwordError && (
            <div>
              <span>{passwordError}</span>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={loading}
          className={styles.submit__button}
        >
          Log In
        </button>
      </form>
      <div>
        <Link href="/forgot-password" className={styles.link}>
          Forgot Password?
        </Link>
      </div>
      <div>
        Need an account?{" "}
        <Link href="/signup" className={styles.link}>
          Sign Up
        </Link>
      </div>
    </div>
  );
}
