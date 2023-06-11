import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { firebase_app } from "../config";

export default async function authenticate(password) {
  const auth = getAuth(firebase_app);
  const currentUser = auth.currentUser;
  const cred = EmailAuthProvider.credential(currentUser.email, password);

  try {
    await reauthenticateWithCredential(currentUser, cred);
  } catch (e) {
    throw e;
  }
}
