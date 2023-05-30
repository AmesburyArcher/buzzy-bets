"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
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
      setLoading(false);
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
    <div className="login__form__wrapper">
      <form onSubmit={handleForm} className="login__form">
        <h2>Password Reset</h2>
        {error && <h2>{error}</h2>}
        {message && <h2>{message}</h2>}
        <label htmlFor="email">
          Email
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            autoComplete="new-username"
          />
        </label>
        <button type="submit" disabled={loading}>
          Reset Password
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
