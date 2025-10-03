import {
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  setDoc,
  doc,
  serverTimestamp,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase.config";

const auth = getAuth();

export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  const docRef = doc(db, "users", user.uid);
  const snapshot = await getDoc(docRef);

  if (!snapshot.exists()) {
    throw new Error("User profile does not exist in Firestore");
  }

  const data = snapshot.data();

  return {
    email: user.email ?? "",
    name: data?.name ?? user.displayName ?? "",
  };
};

export const logOut = () => {
  auth.signOut();
};

export type UserData = {
  name: string;
  email: string;
  createdAt: Timestamp;
};

export const registerUser = async (
  email: string,
  password: string,
  name: string
): Promise<{ name: string; email: string }> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;

  await updateProfile(user, { displayName: name });

  const docRef = doc(db, "users", user.uid);
  await setDoc(docRef, {
    name,
    email: user.email,
    createdAt: serverTimestamp(),
  });

  return {
    name: user.displayName ?? name,
    email: user.email ?? email,
  };
};
