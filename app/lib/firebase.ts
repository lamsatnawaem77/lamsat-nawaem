import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCtwDvmGK5u3eo4aqDYHorqkWzcM_JvjjA",
  authDomain: "lamsat-nawaem-25fee.firebaseapp.com",
  projectId: "lamsat-nawaem-25fee",
  storageBucket: "lamsat-nawaem-25fee.appspot.com",
  messagingSenderId: "1021776320705",
  appId: "1:1021776320705:web:e9889ce537a59c00fd9c40",
};

// يمنع تكرار التهيئة
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// الخدمات اللي راح نستخدمها
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
