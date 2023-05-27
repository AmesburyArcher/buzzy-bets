"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="login__form__wrapper">
      <form onSubmit={handleForm} className="login__form">
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
        <button type="submit" disabled={loading}>
          Log In
        </button>
      </form>
      <div>
        Need an account? <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
