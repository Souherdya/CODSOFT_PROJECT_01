// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getAuth} from "firebase/auth";
import "firebase/firestore";
import {getFirestore} from "firebase/firestore";
import firebase from "firebase/compat/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBwPMf3tAh7ts3rHElqEj1sRN10F8tqTd0",
  authDomain: "learndrive-7a4aa.firebaseapp.com",
  projectId: "learndrive-7a4aa",
  storageBucket: "learndrive-7a4aa.appspot.com",
  messagingSenderId: "68198788976",
  appId: "1:68198788976:web:7ce498504657736ea0a9b5",
  measurementId: "G-H20GX67VJE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const auth = getAuth(app)
const db = getFirestore(app);
export {auth,db,storage};