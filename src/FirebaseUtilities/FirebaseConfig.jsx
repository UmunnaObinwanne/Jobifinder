import { initializeApp } from "firebase/app";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase configuration (replace with your own config)
const firebaseConfig = {
  apiKey: "AIzaSyCrIBefg4NRgx7yWPzowmrypfIIp9WucbA",
  authDomain: "jobifinder-18aca.firebaseapp.com",
  projectId: "jobifinder-18aca",
  storageBucket: "jobifinder-18aca.appspot.com",
  messagingSenderId: "84465194653",
  appId: "1:84465194653:web:90c9de53eab21793cba674",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.log("Failed to enable offline persistence. Multiple tabs open?");
  } else if (err.code === "unimplemented") {
    console.log("Offline persistence is not supported by the current browser.");
  }
});

export { auth, db };
