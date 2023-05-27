import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

export const auth = getAuth(firebase_app);

// export default async function signUp(email: string, pass: string) {
//   let result = null;
//   let error = null;
//   try {
//     result = await createUserWithEmailAndPassword(auth, email, pass);
//   } catch (e) {
//     error = e;
//   }

//   return { result, error };
// }

export default async function signUp(email, pass) {
  return await createUserWithEmailAndPassword(auth, email, pass);
}
