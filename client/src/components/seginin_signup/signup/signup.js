import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import md5 from "md5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Signup() {
  const USER = useSelector((state) => state.global.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [autoSignin, setAutoSignin] = useState(false);
  const URL = process.env.REACT_APP_URL;

  if (Object.keys(USER).length > 1) {
    navigate("/");
  }

  async function submmit(e) {
    e.preventDefault();
    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const phoneNo = Number(e.target[2].value);
    const email = e.target[3].value;
    const passWord = e.target[4].value;
    try {
      setIsLoading(true);
      const response = await axios({
        method: "post",
        url: URL + "/auth/singup",
        headers: { "Content-Type": "application/json" },
        data: { firstName, lastName, phoneNo, email, passWord },
      });
      const data = await response.data;
      if (!data.error) {
        navigate("/signin");
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  async function google() {
    window.open(URL + "/auth/google/callback", "_self");
  }

  return (
    <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" onSubmit={(e) => submmit(e)}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Create new Accoutn
        </h5>

        <dir className="flex w-full justify-between items-center p-0   gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Your Full Name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your last Name
            </label>

            <input
              type="text"
              name="lastName"
              id="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="Your Full Name"
              required
            />
          </div>
        </dir>
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            id="phone"
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="000-000-0000"
            maxLength="10"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Your email
          </label>

          <input
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Create password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            minLength="8"
          />
        </div>

        {/* submit */}
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Create account
        </button>

        <hr />

        {/*  sign in with google */}

        <button
          type="button"
          className="text-white   w-[100%] justify-center  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
          onClick={() => google()}
        >
          <svg
            className="mr-2 -ml-1 w-4 h-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Sign in with Google
        </button>
      </form>
    </div>
  );
}

export default Signup;
