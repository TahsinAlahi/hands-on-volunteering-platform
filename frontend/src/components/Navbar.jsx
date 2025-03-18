import { useState } from "react";
import { Link, NavLink } from "react-router";
import logoImg from "/logo.svg";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // TODO: change it later
  const user = false;
  function logout() {}

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function activeClass({ isActive }) {
    return `block py-2 px-3 font-semibold border-b-2 border-transparent text-inherit hover:border-white ${
      isActive ? "border-white" : ""
    }`;
  }

  return (
    <div className="w-full bg-secondary">
      <nav className="w-full font-nunito  text-white relative">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 md:px-7">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="h-10 aspect-square overflow-hidden bg-white rounded-full flex items-center justify-center">
              <img
                src={logoImg}
                className="h-full w-full object-cover object-center "
                alt="HandsOn Logo"
              />
            </div>
            <span className="self-center text-3xl font-semibold whitespace-nowrap font-coiny">
              HandsOn
            </span>
          </Link>

          {/* Toggle for mobile menu */}
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-expanded={isMenuOpen}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>

          {/* Navbar menu for large screens */}
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full lg:w-auto lg:flex lg:justify-end absolute lg:static top-full z-50 bg-nav  p-4 lg:border-0 border-nav right-0 left-0 lg:py-0 lg:px-0 lg:bg-transparent bg-secondary g:flex-1`}
          >
            <ul
              className="font-medium flex flex-col p-4 md:p-3 mt-4 border border-white rounded-lg bg-nav-bg lg:flex-row md:space-x-2 rtl:space-x-reverse md:mt-0 md:border-1 lg:border-0 md:bg-nav-bg text-center"
              onClick={toggleMenu}
            >
              {/* Main Navigation Links */}
              <li>
                <NavLink to="/" className={activeClass}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/events" className={activeClass}>
                  Events
                </NavLink>
              </li>

              <li>
                <NavLink to="/create-event" className={activeClass}>
                  Create Event
                </NavLink>
              </li>

              <li>
                <NavLink to="/help-requests" className={activeClass}>
                  Help Requests
                </NavLink>
              </li>

              {user && (
                <li>
                  <NavLink to="/profile" className={activeClass}>
                    Profile
                  </NavLink>
                </li>
              )}

              {user && (
                <div className="">
                  <button
                    onClick={logout}
                    className="lg:hidden font-semibold text-red-400 hover:border-red-600 hover:cursor-pointer mt-2 mr-2"
                  >
                    Logout
                  </button>
                </div>
              )}
            </ul>
          </div>

          <div className="lg:flex items-center justify-center gap-2 ml-3 hidden">
            {user && (
              <button
                onClick={logout}
                className="py-2 px-3 font-semibold text-red-400 border-b-2 border-transparent hover:border-red-600 hover:cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;

{
  /* <div className="w-full bg-secondary">
      <div className="max-w-screen-xl mx-auto"> rackoon</div>
    </div> */
}
