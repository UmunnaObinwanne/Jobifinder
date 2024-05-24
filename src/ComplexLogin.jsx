import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { useAuth } from "../Contexts/LoginContext";

const db = getFirestore();

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authMessge, setAuthMessage] = useState("");
  const [error, setError] = useState("");

  const { logIn } = useAuth();

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const user = await logIn(email, password);
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Logged in");
        const userRole = docSnap.data().role;
        console.log(userRole);
        if (userRole === "employer") {
          navigate("/");
        } else if (userRole === "job_seeker") {
          navigate("/");
        }
      }
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-credential":
          setError("Invalid Credential");
          break;
        default:
          // Handle other error cases if needed
          console.error("Unhandled error:", error);
      }
    }
  };

  const handleClosePopup = () => {
    navigate("/");
  };

  return (
    <div
      id="login-popup"
      tabIndex="-1"
      className="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative bg-white rounded-lg shadow">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
            onClick={handleClosePopup}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="#c6c7c7"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close popup</span>
          </button>
          <div className="p-5">
            <h3 className="text-2xl mb-0.5 font-medium"></h3>
            <p className="mb-4 text-sm font-normal text-gray-800"></p>
            <div className="text-center">
              <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                Login to your account
              </p>
              <p>{authMessge}</p>
              <p className="mt-2 text-sm leading-4 text-slate-600">
                You must be logged in to perform this action.
              </p>
            </div>
            <form onSubmit={handleSignIn} className="mt-7">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <p className="mb-3 mt-2 text-sm text-gray-500">
                <a
                  href="/forgot-password"
                  className="text-blue-800 hover:text-blue-600"
                >
                  Reset your password?
                </a>
              </p>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
              >
                Continue
              </button>
            </form>
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
            <div className="mt-6 text-center text-sm text-slate-600">
              Don't have an account? &nbsp;
              <Link to="/signup" className="font-medium text-[#4285f4]">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
