"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import styles from "../(components)/AuthComponents.module.css";
import pageStyles from "./ForgotPassword.module.css";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { resetPassword } = useAuth();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your inbox for password reset instructions!");
    } catch (error) {
      switch (error) {
        default:
          setError("An error has occurred please try again.");
          console.log(error);
      }
      setLoading(false);
    }
  };

  return (
    <div className={pageStyles.page}>
      <h1>Forgot Password</h1>
      <form onSubmit={handleForm} className={styles.form}>
        <h2>Confirm Email</h2>
        {error && <h1>{error}</h1>}
        {message && <h1>{message}</h1>}
        <div className={styles.input_container}>
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => handleEmailChange(e.target.value)}
            required
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
          Send Reset Email
        </button>
      </form>
      <div>
        <Link href="/login">Login</Link>
      </div>
      <div>
        Need an account? <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
