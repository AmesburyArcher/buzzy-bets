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
import { getAuth, getIdToken } from "firebase/auth";

export const db = getFirestore(firebase_app);

function getValidatedUser() {
  const auth = getAuth(firebase_app);
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        console.log(user);
        unsubscribe();
        resolve(user);
      },
      reject // pass up any errors attaching the listener
    );
  });
}

export const addUserToDB = async function (user, userInfo) {
  await setDoc(doc(db, `users/${user.uid}`), userInfo);
};

export const queryUser = async function () {
  return query(collection(db, "users")), where("uid", "==", user.uid);
};

export const queryAllBetLogs = async function () {
  try {
    const currentUser = await getValidatedUser();
    const token = getIdToken(currentUser);
    console.log(currentUser);
    if (!currentUser) {
      console.log(currentUser);
    }
    return getDocs(
      query(collection(db, "users", currentUser.user.uid, "bets"))
    );
  } catch (error) {
    console.log(error);
  }
};
