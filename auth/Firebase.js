// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN30YV0sYDTqS6y-8k8uQh13CjXd9xuGo",
  authDomain: "audioapp-2100e.firebaseapp.com",
  projectId: "audioapp-2100e",
  storageBucket: "audioapp-2100e.appspot.com",
  messagingSenderId: "119550473629",
  appId: "1:119550473629:web:44722c23b089980fe62b74",
  measurementId: "G-8Z59M63KQF"
};

// Initialize Firebase
export const firebase_app = initializeApp(firebaseConfig);
export const firebase_auth = getAuth(firebase_app);
export const firestore_db = getFirestore(firebase_app);