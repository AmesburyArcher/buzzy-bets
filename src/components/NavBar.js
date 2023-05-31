"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [error, setError] = useState();
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  async function handleLogOut() {
    setError("");
    try {
      await logout();
      router.push("/");
    } catch (error) {
      setError("Failed to log out.");
      console.log(error);
    }
  }

  return (
    <nav>
      <h1>Buzzy Bets</h1>
      <ul>
        {currentUser ? (
          <>
            <button type="button" onClick={handleLogOut}>
              Log Out
            </button>
            <Link href="/update-profile">Update Profile</Link>
          </>
        ) : (
          <>
            <Link href="/signup">Sign Up</Link>
            <Link href="/login">Log In</Link>
          </>
        )}
      </ul>
    </nav>
  );
}
