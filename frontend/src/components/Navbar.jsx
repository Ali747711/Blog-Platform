import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function MyNavbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-gray-800 border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            My Blog
          </span>
        </Link>
        
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-800 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className={`block py-2 px-3 rounded md:bg-transparent md:p-0 ${
                  isActive('/') 
                    ? 'text-blue-400 bg-gray-700 md:bg-transparent md:text-blue-400' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400'
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className={`block py-2 px-3 rounded md:bg-transparent md:p-0 ${
                  isActive('/login') 
                    ? 'text-blue-400 bg-gray-700 md:bg-transparent md:text-blue-400' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400'
                }`}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                className={`block py-2 px-3 rounded md:bg-transparent md:p-0 ${
                  isActive('/admin') 
                    ? 'text-blue-400 bg-gray-700 md:bg-transparent md:text-blue-400' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-400'
                }`}
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MyNavbar;