"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Email from "../(components)/email";
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
      <Email
        handleForm={handleForm}
        handleEmailChange={setEmail}
        loading={loading}
        error={error}
        success={message}
        submitText={"Reset Password"}
      />
      <div>
        <Link href="/login">Login</Link>
      </div>
      <div>
        Need an account? <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
