import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { config } from 'dotenv';
config();

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_APP_API_KEY,
  authDomain: process.env.VITE_FIREBASE_APP_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_APP_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_APP_ID,
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDb = getFirestore(FirebaseApp);
