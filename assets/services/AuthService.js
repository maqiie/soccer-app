import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { auth, db } from "./firebaseConfig"; // Ensure Firestore is imported

// Sign Up Function (Registers user and saves details in Firestore)
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Create user document in Firestore
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "",
      photoURL: user.photoURL || "",
      favoriteTeam: "",
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    console.error("Sign Up Error:", error.message);
    throw error;
  }
};

// Sign In Function (Retrieves user data from Firestore)
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Retrieve user data from Firestore
    const userDocRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userDocRef);

    if (userSnap.exists()) {
      return { ...user, ...userSnap.data() };
    } else {
      console.warn("User data not found in Firestore!");
      return user;
    }
  } catch (error) {
    console.error("Sign In Error:", error.message);
    throw error;
  }
};
