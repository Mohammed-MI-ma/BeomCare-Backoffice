// Import the functions you need from the SDKs you need
// firebase-init.js
import firebase from "firebase/compat/app";
import "firebase/compat/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtoZA4wdYLxJxkEEXSydYG6NObGrRFM4I",
  authDomain: "beomecare-bacoffice.firebaseapp.com",
  projectId: "beomecare-bacoffice",
  storageBucket: "beomecare-bacoffice.appspot.com",
  messagingSenderId: "461051106876",
  appId: "1:461051106876:web:e911ec9f95dd5353f75539",
  measurementId: "G-7TPQNCN3S7",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const messaging = firebase.messaging();
