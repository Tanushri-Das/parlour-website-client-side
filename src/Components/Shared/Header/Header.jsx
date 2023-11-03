import React, { useContext, useState } from "react";
import logo from "../../../images/parlourlogo.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthProvider/AuthProvider";

const Header = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.error(error));
  };
  return (
    // pt-16
    <nav className="pt-12">
      <div className="max-w-7xl lg:mx-[135px] mx-auto px-4 sm:px-6 lg:px-8 border border-red-500">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img src={logo} alt="" />
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block ml-auto">
              <div className="flex items-baseline space-x-4">
                <a href="/" className="text-sm font-semibold navtext pe-[40px]">
                  Home
                </a>
                <a href="/" className="text-sm font-semibold navtext pe-[40px]">
                  Our Portfolio
                </a>
                <a href="/" className="text-sm font-semibold navtext pe-[40px]">
                  Our Team
                </a>
                <a
                  href="/dashboard"
                  className="text-sm font-semibold navtext pe-[40px]"
                >
                  Dashboard
                </a>
                <a href="/" className="text-sm font-semibold navtext pe-[40px]">
                  Contact Us
                </a>
                {user ? (
                  <>
                    <li className="flex justify-center items-center text-[16px] font-semibold pe-3">
                      {user?.displayName}
                    </li>
                    <li className="flex justify-center">
                      <button
                        onClick={handleLogout}
                        className="login-btn text-[16px] font-semibold text-white"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex justify-center">
                      <Link
                        className="login-btn text-[16px] font-semibold text-white"
                        to="/login"
                      >
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={toggleNavbar}
                type="button"
                className="bg-[#f63e7b] inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-[#f63e7b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-none focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-4 pt-4 pb-3 space-y-1 sm:px-3">
            <a href="/" className="text-sm font-semibold navtext block">
              Home
            </a>
            <a href="/" className="text-sm font-semibold navtext block">
              Our Portfolio
            </a>
            <a href="/" className="text-sm font-semibold navtext block">
              Our Team
            </a>
            <a href="/" className="text-sm font-semibold navtext block pb-4">
              Contact Us
            </a>

            <Link
              className="login-btn text-[16px] font-semibold text-white"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
