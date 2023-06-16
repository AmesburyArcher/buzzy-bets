import firebase_app from "../config";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";

export const db = getFirestore(firebase_app);

export const addUserToDB = async function (user, userInfo) {
  await setDoc(doc(db, `users/${user.uid}`), userInfo);
};
