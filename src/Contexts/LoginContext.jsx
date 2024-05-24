import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  enableIndexedDbPersistence,
} from "firebase/firestore";

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

// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          setCurrentUserRole(userDoc.data()?.role);
        } catch (error) {
          console.error("Error fetching user role:", error);
        }
      } else {
        setCurrentUserRole(null);
      }
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = async (username, email, password, fullname, role) => {
    console.log("signUp function started");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created with email and password");
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      console.log("User profile updated");

      console.log("Setting user document in Firestore");
      await setDoc(doc(db, "users", user.uid), {
        fullname: fullname,
        role: role,
      });
      console.log("User document set in Firestore");

      return user;
    } catch (error) {
      console.error("Error during sign up:", error.message);
      throw error;
    }
  };

  const logIn = async (email, password) => {
    console.log("logIn function started");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in with email and password");
      const user = userCredential.user;

      console.log("Fetching user document from Firestore");
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        console.log("User document fetched from Firestore");
        setCurrentUserRole(userDoc.data()?.role);
      } else {
        console.log("No user document found in Firestore");
        setCurrentUserRole(null);
      }

      return user;
    } catch (error) {
      console.error("Error during login:", error.message);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setCurrentUserRole(null);
    } catch (error) {
      console.error("Error during logout:", error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, currentUserRole, loading, signUp, logIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
