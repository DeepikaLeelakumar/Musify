import { initializeApp } from "firebase/app";

import {  getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAl9Xqw-Q_-WVHbA4PH7lCXPL6MN10YHi0",
  authDomain: "musify-27edd.firebaseapp.com",
  projectId: "musify-27edd",
  storageBucket: "musify-27edd.firebasestorage.app",
  messagingSenderId: "1075668962351",
  appId: "1:1075668962351:web:4a0d3bf1c8a6ff9c9e8ada"
};

export const app = initializeApp(firebaseConfig);

export let _Auth = getAuth(app)
export let _DB = getFirestore(app)