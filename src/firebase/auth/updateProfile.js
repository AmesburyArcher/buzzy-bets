import { getAuth } from "firebase/auth";
import { firebase_app } from "../config";

const auth = getAuth(firebase_app);
const currentUser = auth.currentUser;

export async function updateEmail(email) {
  currentUser.updateEmail(email);
}

export async function updatePassword(password) {
  currentUser.updatePassword(password);
}
