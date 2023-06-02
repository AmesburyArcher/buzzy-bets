"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import SignUp from "../(components)/signup";
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
      <SignUp
        handleForm={handleForm}
        handleEmailChange={setEmail}
        handlePassOneChange={setPassword}
        handlePassTwoChange={setConfirmPassword}
        error={error}
        loading={loading}
        submitText={"Sign Up"}
      />
      <div>
        Already have an account? <Link href="/login">Log In</Link>
      </div>
    </div>
  );
}
