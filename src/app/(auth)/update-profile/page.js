"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function UpdateUserProfile() {
  const [email, setEmail] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);
  const [passMatch, setPassMatch] = useState(false);
  const router = useRouter();
  const { currentUser, authenticate } = useAuth();

  const dialogRef = useRef(null);

  const handleFormEmail = async (e) => {
    e.preventDefault();

    setConfirmPass(true);
    dialogRef.current.showModal();

    // if (password != confirmPassword) {
    //   return setError("Passwords do not match!");
    // }

    // try {
    //   setError("");
    //   setLoading(true);

    //   setLoading(false);
    //   router.push("/");
    // } catch (error) {
    //   switch (error) {
    //     case "auth/email-already-exists":
    //       setError("Email has already been registered.");
    //       break;
    //     case "auth/invalid-password":
    //       setError("Password must contain at least 6 characters.");
    //       break;
    //     default:
    //       setError("An error has occurred please try again.");
    //   }
    //   setLoading(false);
    // }
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
          <form
            onSubmit={function (e) {
              e.preventDefault();
              try {
                authenticate(currPassword);
                dialogRef.current.close();
                setCurrPassword("");
              } catch (e) {
                console.log(e);
              }
            }}
            className="flex flex-col"
          >
            <label htmlFor="password_current" className="flex gap-2">
              Current Password:
              <input
                onChange={(e) => setCurrPassword(e.target.value)}
                value={currPassword}
                type="password"
                name="password_current"
                id="password_current"
                placeholder="current password"
                autoComplete="new-password"
                className="border-b-2"
              />
            </label>
            <button>Confirm</button>
          </form>
        </div>
      </dialog>
      <form onSubmit={handleFormEmail} className="signup__form">
        <h2>Update Profile</h2>
        {error && <h1>{error}</h1>}
        <label htmlFor="email">
          Email
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            defaultValue={currentUser.email}
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
            autoComplete="new-username"
          />
        </label>
        <button type="submit" disabled={loading}>
          Update Email
        </button>
      </form>
      <form onSubmit={function () {}} className="update__password__form">
        <label htmlFor="password">
          Password
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            autoComplete="new-password"
          />
        </label>
        <label htmlFor="confirm_password">
          Confirm Password
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            name="confirm_password"
            id="confirm_password"
            placeholder="confirm password"
          />
        </label>
        <button type="submit" disabled={loading}>
          Update Password
        </button>
      </form>
      <div>
        Cancel <Link href="/">Cancel</Link>
      </div>
    </div>
  );
}
