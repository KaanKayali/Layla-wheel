// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQOVrCmRtdST6AIt92yFEQ2brcE8VAMx0",
  authDomain: "layla-wheel.firebaseapp.com",
  projectId: "layla-wheel",
  storageBucket: "layla-wheel.appspot.com",
  messagingSenderId: "736818495656",
  appId: "1:736818495656:web:bf689ea797b8d9acab029d",
  measurementId: "G-FTX7FCTPX9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);