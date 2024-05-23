import { useState } from "react";
import "./NavBar.css";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../Contexts/LoginContext";

export default function Navbar() {
  // Creating Responsive Menu
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handling Auth State
  const { currentUser, loading, logOut } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  let capitalizedName = "";
  if (currentUser && currentUser.displayName) {
    capitalizedName =
      currentUser.displayName.charAt(0).toUpperCase() +
      currentUser.displayName.slice(1);
  }

  return (
    <>
      <nav className="bg-green-100 p-4 shadow-md">
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
              to="/"
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
              to="/employers"
              className="bg-teal-500 text-white rounded-md px-3 py-1 mb-2 lg:mb-0 hover:bg-green-600"
            >
              Employers
            </Link>
            {currentUser ? (
              <div className="user-info flex items-center space-x-2">
                <p className="m-0">{`Welcome ${capitalizedName}`}</p>
                <div className="dropdown dropdown-end relative">
                  <svg
                    className="svg-dropdown cursor-pointer"
                    viewBox="0 0 20 20"
                    tabIndex={0}
                    onClick={toggleDropdown}
                  >
                    <path d="M13.962,8.885l-3.736,3.739c-0.086,0.086-0.201,0.13-0.314,0.13S9.686,12.71,9.6,12.624l-3.562-3.56C5.863,8.892,5.863,8.611,6.036,8.438c0.175-0.173,0.454-0.173,0.626,0l3.25,3.247l3.426-3.424c0.173-0.172,0.451-0.172,0.624,0C14.137,8.434,14.137,8.712,13.962,8.885 M18.406,10c0,4.644-3.763,8.406-8.406,8.406S1.594,14.644,1.594,10S5.356,1.594,10,1.594S18.406,5.356,18.406,10 M17.521,10c0-4.148-3.373-7.521-7.521-7.521c-4.148,0-7.521,3.374-7.521,7.521c0,4.147,3.374,7.521,7.521,7.521C14.148,17.521,17.521,14.147,17.521,10"></path>
                  </svg>
                  {isDropdownOpen && (
                    <ul className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4 absolute right-0">
                      <li>
                        <button onClick={logOut}>Sign Out</button>
                      </li>
                      <li>
                        <a href="/profile">Profile</a>
                      </li>
                    </ul>
                  )}
                </div>
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
