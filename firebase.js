// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjmdOJ4ROrDakZ2nTRc89AC7BnvW7P9uY",
  authDomain: "fir-9d371.firebaseapp.com",
  projectId: "fir-9d371",
  storageBucket: "fir-9d371.appspot.com",
  messagingSenderId: "638757494568",
  appId: "1:638757494568:web:0b8b757fbf24d79ac0fa1d",
  measurementId: "G-8G4KKPY1PD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
