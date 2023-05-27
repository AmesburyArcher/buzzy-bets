"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signUp } = useAuth();

  const handleForm = async (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(email, password);
      setLoading(false);
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

  return (
    <div className="signup__form__wrapper">
      <form onSubmit={handleForm} className="signup__form">
        {error && <h1>{error}</h1>}
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
        <label htmlFor="password">
          Password
          <input
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            name="password"
            id="password"
            placeholder="password"
            autoComplete="new-password"
          />
        </label>
        <label htmlFor="confirm__password">
          Confirm Password
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="confirm password"
          />
        </label>
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
