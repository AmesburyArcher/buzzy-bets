"use client";

import { useContext, createContext, useState, useEffect } from "react";
import signUp, { auth } from "@/firebase/auth/signup";
import signIn from "@/firebase/auth/signin";
import logout from "@/firebase/auth/logout";
import resetPassword from "@/firebase/auth/resetPassword";
import authenticate from "@/firebase/auth/reauthenticate";
import { updatePassword, updateEmail } from "@/firebase/auth/updateProfile";
import LoadingScreen from "../components/LoadingScreen";
import { UserCredential } from "firebase/auth";

const AuthContext = createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unSubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    signIn,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    authenticate,
  };

  return (
    <AuthContext.Provider value={value}>
      {loading ? <LoadingScreen /> : children}
    </AuthContext.Provider>
  );
}
