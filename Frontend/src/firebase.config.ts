// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  
  authDomain: "livestock-disease-detector.firebaseapp.com",
  projectId: "livestock-disease-detector",
  storageBucket: "livestock-disease-detector.firebasestorage.app",
  messagingSenderId: "558281924219",
  appId: "1:558281924219:web:e7a59a4a4a896f8902ccde"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const  auth  = getAuth()
export const db = getFirestore()

