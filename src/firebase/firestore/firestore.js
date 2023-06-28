import firebase_app from "../config";
import {
  collection,
  doc,
  getFirestore,
  query,
  setDoc,
  where,
} from "firebase/firestore";

export const db = getFirestore(firebase_app);

export const addUserToDB = async function (user, userInfo) {
  await setDoc(doc(db, `users/${user.uid}`), userInfo);
};

export const queryUser = async function (user) {
  query(collection(db, "users")), where("uid", "==", user.uid);
};
