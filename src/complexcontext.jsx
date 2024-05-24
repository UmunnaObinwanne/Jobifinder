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
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase configuration (make sure to replace this with your own config)
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

// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = async (username, email, password, fullname, role) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });

      // Save user details in Firestore
      const userDoc = doc(db, "users", user.uid);
      await setDoc(userDoc, {
        username: username,
        email: email,
        role: role,
        fullName: fullname,
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  const logIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, signUp, logIn, logOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
