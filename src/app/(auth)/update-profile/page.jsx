"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  updatePasswordNew,
  updateEmailNew,
} from "../../../firebase/auth/updateProfile";
import MultiPassword from "../(components)/multiPassword";
import Email from "../(components)/email";
import SinglePassword from "../(components)/singlePassword";

import Link from "next/link";

export default function UpdateUserProfile() {
  const [email, setEmail] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passMatch, setPassMatch] = useState(false);
  const router = useRouter();
  const { currentUser, authenticate } = useAuth();

  const dialogRef = useRef(null);

  useEffect(() => {
    if (currentUser == null) {
      router.push("/login");
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  const handleFormEmail = async (e) => {
    e.preventDefault();

    dialogRef.current.showModal();

    if (password != confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      setError("");
      setLoading(true);
      updateEmailNew(email);
      setLoading(false);
    } catch (error) {
      switch (error) {
        default:
          setError("An error has occurred please try again.");
      }
      setLoading(false);
    }
  };

  const handlePasswordMatch = async (e) => {
    e.preventDefault();
    try {
      authenticate(currPassword);
      dialogRef.current.close();
      setCurrPassword("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="signup__form__wrapper">
      <dialog ref={dialogRef} className="p-0">
        <div className="border-2 border-black p-4 flex flex-col">
          <button
            type="button"
            onClick={function () {
              dialogRef.current.close();
              setCurrPassword("");
            }}
            className="place-self-end"
          >
            Close
          </button>
          <SinglePassword
            handleForm={handlePasswordMatch}
            handlePasswordChange={setCurrPassword}
            pass={currPassword}
            loading={loading}
            error={error}
            submitText={"Confirm"}
          />
        </div>
      </dialog>
      <Email
        handleForm={handleFormEmail}
        handleEmailChange={setEmail}
        loading={loading}
        currentUser={currentUser}
        error={error}
        submitText={"Update Email"}
      />
      <MultiPassword
        handleForm={function () {}}
        handlePassOneChange={setPassword}
        handlePassTwoChange={setConfirmPassword}
        loading={loading}
        submitText={"Update Password"}
      />
      <div>
        <Link href="/">Cancel</Link>
      </div>
    </div>
  );
}
