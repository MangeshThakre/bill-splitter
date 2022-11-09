import React from "react";
import "./Navbar.css";
import { useState } from "react";
import logo from "../../asset/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
function Navbar({ loading }) {
  let navigate = useNavigate();
  const USER = useSelector((state) => state.global.user);

  //  SCELETON
  const skeletton = (
    <div className="flex items-center mt-4 space-x-3">
      <svg
        className="w-14 h-14 text-gray-200 dark:text-gray-700"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
          clipRule="evenodd"
        ></path>
      </svg>
      <div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
        <div className="w-48 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
      </div>
    </div>
  );

  // SIGNIN - SIGNUP BUTTON
  const siginSingup = (
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="flex flex-col  justify-center  mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <button
          type="button"
          className={
            useLocation().pathname == "/signin"
              ? "text-white bg-blue-700   font-semibold hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-sm px-5 py-2   dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              : "py-2 px-5   text-sm   font-semibold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          }
          onClick={() => {
            navigate("/signin");
          }}
        >
          Sign in
        </button>
        <button
          type="button"
          className={
            useLocation().pathname == "/signup"
              ? "text-white bg-blue-700   font-semibold hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-sm px-5 py-2   dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              : "py-2 px-5   text-sm   font-semibold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          }
          onClick={() => {
            navigate("/signup");
          }}
        >
          sing up
        </button>
      </ul>
    </div>
  );

  //  LOGEDIN-USER  INFO
  const logedInUser = (
    <div className="flex items-center space-x-4   cursor-pointer ">
      <div className="flex-shrink-0">
        <img
          className="w-8 h-8 rounded-full"
          src={USER.profilePhoto}
          alt="Neil image"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
          {USER.firstName?.toUpperCase() + " " + USER.lastName?.toUpperCase()}
        </p>
        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
          {USER?.email}
        </p>
      </div>
    </div>
  );

  function showRight() {
    return Object.keys(USER).length === 0 ? siginSingup : logedInUser;
  }

  return (
    <div className="navbar bg-slate-600   h-20   absolute top-0 ">
      <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5   w-full  rounded dark:bg-gray-900">
        <div className=" flex justify-between items-center   px-12 ">
          <div
            onClick={() =>
              USER.email ? navigate("/all_expenses") : navigate("/")
            }
            className="flex items-center   cursor-pointer "
          >
            <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Bill Spliter
            </span>
          </div>
          {loading ? skeletton : showRight()}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
