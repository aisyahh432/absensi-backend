// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCecrW-xygGeYBvSAM581-yw_u8mMPPTHE",
  authDomain: "push-notification-a5a02.firebaseapp.com",
  databaseURL: "https://push-notification-a5a02-default-rtdb.firebaseio.com",
  projectId: "push-notification-a5a02",
  storageBucket: "push-notification-a5a02.firebasestorage.app",
  messagingSenderId: "168530552984",
  appId: "1:168530552984:web:88aedebdcd9eb5a53ec8ed",
  measurementId: "G-JH4R0P8B6F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db };