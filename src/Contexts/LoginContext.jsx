import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../FirebaseUtilities/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  Timestamp,
  query,
  orderBy,
} from "firebase/firestore";

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

  const postJob = async (jobData) => {
    console.log("postJob function started");
    try {
      const jobWithMetadata = {
        ...jobData,
        userId: currentUser.uid, // Add userId to job data
        createdAt: Timestamp.now(), // Add createdAt timestamp
      };
      await addDoc(collection(db, "jobPostings"), jobWithMetadata);
      console.log("Job posted successfully");
      alert("Job posted successfully");
    } catch (error) {
      console.error("Error posting job:", error);
      alert("Error posting job");
    }
  };

  const fetchJobs = async () => {
    console.log("fetchJobs function started");
    try {
      const q = query(
        collection(db, "jobPostings"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const jobs = [];
      querySnapshot.forEach((doc) => {
        jobs.push({ id: doc.id, ...doc.data() });
      });
      console.log("Jobs fetched successfully");
      return jobs;
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentUserRole,
        loading,
        signUp,
        logIn,
        logOut,
        postJob,
        fetchJobs,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
