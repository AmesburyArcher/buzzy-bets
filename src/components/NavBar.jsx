"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./NavBarStyle.module.css";

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
    <nav className={styles.navbar}>
      <h1 className={styles.title}>Buzzy Bets</h1>
      <ul className={styles.links}>
        {currentUser ? (
          <>
            <button type="button" onClick={handleLogOut}>
              Log Out
            </button>
            <Link className={styles.link} href="/update-profile">
              Update Profile
            </Link>
          </>
        ) : (
          <>
            <Link className={styles.link} href="/signup">
              Sign Up
            </Link>
            <Link className={styles.link} href="/login">
              Log In
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
}
