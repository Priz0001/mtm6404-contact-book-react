// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBezkNVL6Q8HCWyt3vBupXxERY-zQ21O1A",
  authDomain: "contact-book-db.firebaseapp.com",
  projectId: "contact-book-db",
  storageBucket: "contact-book-db.firebasestorage.app",
  messagingSenderId: "854699118664",
  appId: "1:854699118664:web:5b0ccc7b532ec116a4887d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
