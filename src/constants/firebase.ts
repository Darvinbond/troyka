// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDslQD1V9BgJu6T43iniRL2IG-CYMFK_Lg",
  authDomain: "padlec-4efa5.firebaseapp.com",
  databaseURL:
    "https://padlec-4efa5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "padlec-4efa5",
  storageBucket: "padlec-4efa5.appspot.com",
  messagingSenderId: "995300215257",
  appId: "1:995300215257:web:ea9fdfb82fbd56c078f1c8",
  measurementId: "G-361ZREZG36",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
