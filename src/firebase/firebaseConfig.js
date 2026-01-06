// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLf01_reA3ucejoW-diOy9n6Xb1Wlo-FY",
  authDomain: "mentis-1a555.firebaseapp.com",
  projectId: "mentis-1a555",
  storageBucket: "mentis-1a555.firebasestorage.app",
  messagingSenderId: "25229223200",
  appId: "1:25229223200:web:56da761954781475a2e345"
};


const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
 const auth = getAuth(app);
 export {db,auth};