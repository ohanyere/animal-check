import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

const signInWithGoogle = async () => {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Check if user exists before proceeding
    if (!user) {
      throw new Error("Google sign-in failed: No user returned.");
    }
    console.log(user, "now user");
    console.log(user, "user ewoo");
    
    const docRef = doc(db, "users", user.uid);
    const userSnapshot = await getDoc(docRef);
    
    if (!userSnapshot.exists()) {
      await setDoc(docRef, {
        name: user.displayName,
        email: user.email,
        timeStamp: serverTimestamp()
      });
    }
    const userDetail = {
      email: user.email ?? "",
      name: user.displayName ?? ""
    };

    
    
    return userDetail

  } catch (error) {
    console.error("Google sign-in error:", error);
    
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred during Google sign-in.");
    }
  }
};

const Oauth = {
  signInWithGoogle
};

export default Oauth;