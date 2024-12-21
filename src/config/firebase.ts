import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRESTORE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIRESTORE_AUTH_DOMAIN as string,
  databaseURL: import.meta.env.VITE_FIRESTORE_DATABASE_URL as string,
  projectId: import.meta.env.VITE_FIRESTORE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIRESTORE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env.VITE_FIRESTORE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIRESTORE_APP_ID as string,
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider().setCustomParameters({ prompt: "select_account" });
