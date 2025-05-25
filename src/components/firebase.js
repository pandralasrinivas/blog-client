// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3mf5ZA1KlC7WwGS0uZK0RzIj4j8Wcet8",
  authDomain: "blogs-1e1b7.firebaseapp.com",
  projectId: "blogs-1e1b7",
  storageBucket: "blogs-1e1b7.firebasestorage.app",
  messagingSenderId: "75226397715",
  appId: "1:75226397715:web:f9364aef874703956893e6",
  measurementId: "G-2RX37GX5JE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();