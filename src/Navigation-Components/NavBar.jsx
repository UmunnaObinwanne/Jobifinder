import { useState } from "react";
import "./NavBar.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/LoginContext";
import Loader from "../Reuseable-Components/Loader";

export default function Navbar() {
  // Creating Responsive Menu
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handling Auth State
  const { currentUser, loading, logOut } = useAuth();

  //Handling Logout
  function handleLogout() {
    logOut();
    navigate("/login");
  }

  if (loading) {
    return <Loader />;
  }

  let capitalizedName = "";
  if (currentUser && currentUser.displayName) {
    capitalizedName =
      currentUser.displayName.charAt(0).toUpperCase() +
      currentUser.displayName.slice(1);
  }

  return (
    <>
      <nav className="bg-green-100 p-12 shadow-md mb-5">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="text-teal-500 font-bold text-3xl mb-4 lg:mb-0 hover:text-green-600 hover:cursor-pointer">
            <Link to="/">Jobifinder</Link>
          </div>

          {/* Hamburger menu for small screens */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-blue-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Navigation links */}
          <div
            className={`lg:flex flex-col lg:flex-row ${
              isOpen ? "block" : "hidden"
            } lg:space-x-4 lg:mt-0 mt-4 flex flex-col items-center text-md`}
          >
            <Link
              to="/post-job"
              className="bg-teal-500 text-white rounded-md px-3 py-1 mb-2 lg:mb-0 hover:bg-green-600"
            >
              Post a job
            </Link>
            <Link
              onClick={handleLogout}
              className="bg-teal-500 text-white rounded-md px-3 py-1 mb-2 lg:mb-0 hover:bg-green-600"
            >
              About
            </Link>
            <Link
              to="#Projects"
              className="bg-teal-500 text-white rounded-md px-3 py-1 mb-2 lg:mb-0 hover:bg-green-600"
            >
              Contact
            </Link>
            <Link
              to="/dashboard"
              className="bg-teal-500 text-white rounded-md px-3 py-1 mb-2 lg:mb-0 hover:bg-green-600"
            >
              Employers
            </Link>
            {currentUser ? (
              <div className="user-info flex items-center space-x-2">
                <p className="m-0">
                  {`Welcome ${capitalizedName}`}
                  <Link
                    onClick={handleLogout}
                    className="bg-teal-500 text-white rounded-md px-3 py-1 mb-2 lg:mb-0 hover:bg-green-600"
                  >
                    Logout
                  </Link>
                </p>
              </div>
            ) : (
              <Link
                className="bg-teal-500 text-white rounded-md px-3 py-1 mb-2 lg:mb-0 hover:bg-green-600"
                to="/login"
              >
                Login/Register
              </Link>
            )}
          </div>
        </div>
      </nav>
      <div>
        <Outlet />
      </div>
    </>
  );
}
