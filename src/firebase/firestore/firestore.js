import { firebase_app } from "../config";
import {
  collection,
  doc,
  getFirestore,
  query,
  setDoc,
  where,
  getDocs,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore";

export const db = getFirestore(firebase_app);

export async function getValidatedUser() {
  const auth = getAuth(firebase_app);
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user);
      unsubscribe();
      return resolve(user);
    });
  });
}

export const addUserToDB = async function (user, userInfo) {
  await setDoc(doc(db, `users/${user.uid}`), userInfo);
};

export const queryUser = async function () {
  return query(collection(db, "users")), where("uid", "==", user.uid);
};

export const queryAllBetLogs = function (user) {
  return useCollection(collection(db, "users", user.uid, "bets"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
};
