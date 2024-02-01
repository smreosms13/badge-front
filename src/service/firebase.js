
import { initializeApp } from "firebase/app";
import { connectStorageEmulator, getStorage, ref } from "firebase/storage";
import { getFirestore, collection, getDocs, connectFirestoreEmulator } from "firebase/firestore";

import {
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
  signInWithCustomToken,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  ConfirmationResult,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  createUserWithEmailAndPassword
} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAeW5Y4ghExnVi_HzhZgurN9XlBW2mL3zw",
  authDomain: "openbadges-537a3.firebaseapp.com",
  projectId: "openbadges-537a3",
  storageBucket: "openbadges-537a3.appspot.com",
  messagingSenderId: "833394091620",
  appId: "1:833394091620:web:e859294852701e89682171"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();
const auth = getAuth(app);
const db = getFirestore(app);

// to be removed in production
/*connectFirestoreEmulator(db, '127.0.0.1', 8080);
connectAuthEmulator(auth, "http://127.0.0.1:9099");
connectStorageEmulator(storage, "127.0.0.1", 9199);*/


export { auth, db, storage, ref }
