import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCtwDvmGK5u3eo4aqDYHorqkWzcM_JvjjA",
  authDomain: "lamsat-nawaem-25fee.firebaseapp.com",
  projectId: "lamsat-nawaem-25fee",
  storageBucket: "lamsat-nawaem-25fee.firebasestorage.app",
  messagingSenderId: "1021776320705",
  appId: "1:1021776320705:web:e9889ce537a59c00fd9c40",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;