"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import EmailAndPassword from "../(components)/emailAndPassword";
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
      <EmailAndPassword
        handleForm={handleForm}
        handleEmailChange={setEmail}
        handlePasswordChange={setPassword}
        error={error}
        loading={loading}
        submitText={"Log In"}
      />
      <div>
        <Link href="/forgot-password">Forgot Password?</Link>
      </div>
      <div>
        Need an account? <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
