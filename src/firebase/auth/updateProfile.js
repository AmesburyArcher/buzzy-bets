import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { firebase_app } from "../config";

export async function updateEmailNew(email) {
  const auth = getAuth(firebase_app);
  const currentUser = auth.currentUser;
  await updateEmail(currentUser, email);
}

export async function updatePasswordNew(password) {
  const auth = getAuth(firebase_app);
  const currentUser = auth.currentUser;
  await updatePassword(currentUser, password);
}
