import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { firebase_app } from "../config";

const auth = getAuth(firebase_app);

export default async function resetPassword(email) {
  return await sendPasswordResetEmail(auth, email);
}
