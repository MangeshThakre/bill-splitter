import React from "react";
import { useNavigate } from "react-router-dom";
import leftImage from "../../../asset/index.png";

import "./home.css";
function Home() {
  const navigate = useNavigate();
  return (
    <div id="home" className="pt-20 h-[100vh] flex justify-center         ">
      <div className=" py-20  px-11  flex items-center justify-center  gap-20">
        <div>
          <img src={leftImage} className="w-[40rem]" alt="img" />
        </div>
        <div>
          <h2 className="mb-2 text-2xl font-bold text-blue-900 dark:text-white">
            About Bill Spliter
          </h2>
          <ul className="space-y-1 max-w-md list-inside text-gray-500 dark:text-gray-400">
            <li className="flex items-center">
              <svg
                className="w-4 h-4 mr-1.5 text-blue-500 dark:text-blue-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <p className="text-lg ">create groups and add members to them</p>
            </li>
            <li className="flex items-center">
              <svg
                className="w-4 h-4 mr-1.5 text-blue-500 dark:text-blue-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <p className="text-lg ">
                Form for adding the amount paid and selecting the member to
                split that transaction with
              </p>
            </li>{" "}
            <li className="flex items-center">
              <svg
                className="w-4 h-4 mr-1.5 text-blue-500 dark:text-blue-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <p className="text-lg ">
                A record of who owes whom how much money
              </p>
            </li>{" "}
            <li className="flex items-center">
              <svg
                className="w-4 h-4 mr-1.5 text-blue-500 dark:text-blue-400 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <p className="text-lg ">At least one lowercase character</p>
            </li>
            <li className="  flex gap-7">
              <button
                type="button"
                className="mt-6  text-white bg-blue-700   font-semibold hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-sm px-5 py-2   dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                Sign in
              </button>{" "}
              <button
                type="button"
                className="mt-6  text-white bg-blue-700   font-semibold hover:bg-blue-800 focus:ring-4 focus:ring-blue-300  rounded-lg text-sm px-5 py-2   dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
