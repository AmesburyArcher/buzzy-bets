import { firebase_app } from "../config";
import {
  collection,
  doc,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const db = getFirestore(firebase_app);

export const addUserToDB = async function (user, userInfo) {
  await setDoc(doc(db, `users/${user.uid}`), userInfo);
};

export const queryUser = async function () {
  return query(collection(db, "users")), where("uid", "==", user.uid);
};

export const queryAllBetLogs = async function () {
  const auth = getAuth(firebase_app);
  const currentUser = auth.currentUser;
  console.log(currentUser);
  return query(collection(db, "users", currentUser.uid, "bets"));
};
