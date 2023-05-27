"use client";

import SignUpPage from "./signup/page";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { currentUser } = useAuth();
  return (
    <>
      <h1>Allo World</h1>
      <div className="user_info">
        {currentUser ? `Email: ${currentUser.email}` : "Log in please!"}
      </div>
    </>
  );
}
