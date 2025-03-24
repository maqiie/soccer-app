// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase Config (replace with your actual config)
const firebaseConfig = {
  apiKey: "AIzaSyACSy2gYdHJ6vK1nM34jUQqLyDflcAkiGc",
  authDomain: "soccer-games-app.firebaseapp.com",
  projectId: "soccer-games-app",
  storageBucket: "soccer-games-app.firebasestorage.app",
  messagingSenderId: "566261523066",
  appId: "1:566261523066:android:1f9e8d7ba97947ab8791c3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
