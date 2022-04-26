// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMH30LFF8cFtOq_HA9Wwrc76dFmikVdVk",
  authDomain: "homing-tnm.firebaseapp.com",
  projectId: "homing-tnm",
  storageBucket: "homing-tnm.appspot.com",
  messagingSenderId: "678719941023",
  appId: "1:678719941023:web:ccf53b7cc9b276eb6d35aa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
