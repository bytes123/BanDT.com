// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA666p3WTQYPHEio6t3VwOB9bFmN2jVNvk",
  authDomain: "fir-ac740.firebaseapp.com",
  projectId: "fir-ac740",
  storageBucket: "fir-ac740.appspot.com",
  messagingSenderId: "312843540547",
  appId: "1:312843540547:web:beef94d4ccc9debe9a1cf6",
  measurementId: "G-M51W6K1TFP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);