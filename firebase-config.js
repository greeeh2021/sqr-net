
// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAcAWhXFy24-QHPDjk4wd-mFReeqSzF7VM",
  authDomain: "saqr-shat.firebaseapp.com",
  databaseURL: "https://saqr-shat-default-rtdb.firebaseio.com",
  projectId: "saqr-shat",
  storageBucket: "saqr-shat.appspot.com",
  messagingSenderId: "756978861022",
  appId: "1:756978861022:web:c7fa8be0961bbb7381d34f",
  measurementId: "G-LGLP6CPJ1M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { app, database, auth };
