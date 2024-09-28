// Import the functions you need from the SDKs you need
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // For Authentication
import { getFirestore } from "firebase/firestore"; // For Firestore
// Import other Firebase services as needed
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwVAXSxGaMfrh4Zl_5yFHmY4ghaGa1yOE",
  authDomain: "quizapp-55b51.firebaseapp.com",
  projectId: "quizapp-55b51",
  storageBucket: "quizapp-55b51.appspot.com",
  messagingSenderId: "1075475210761",
  appId: "1:1075475210761:web:b8a0425cbff58eb1688ed8",
  measurementId: "G-MSDPE9BQMB"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider(); // For Firestore

export default app;