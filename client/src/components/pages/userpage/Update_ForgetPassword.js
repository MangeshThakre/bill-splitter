import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { user } from "../../../redux/globalSplice.js";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useSelector, useDispatch } from "react-redux";
import md5 from "md5";
import CreatePassword from "./CreatePassword.js";
import SendOtp from "./SendOtp.js";

function Update_ForgetPassword({ handleAlert }) {
  const dispatch = useDispatch();
  const USER = useSelector((state) => state.global.user);
  const URL = process.env.REACT_APP_URL;
  const [isForget, setIsForget] = useState(false);
  const [OTP, setOTP] = useState(0);
  const [count, setCount] = useState(0);
  const [verify, setVerify] = useState(false);
  const [IsUpdateLoding, setIsUpdateLoading] = useState(false);

  //  update password
  async function handleUpdatePassword(e) {
    e.preventDefault();
    const password = e.target[0].value;
    const newPassword = e.target[1].value;
    setIsUpdateLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: URL + "/auth/update_password",
        data: { password, newPassword, userId: USER._id }
      });
      const data = await response.data;
      dispatch(user(data));
      setIsUpdateLoading(false);
      e.target[0].value = "";
      e.target[1].value = "";
      return handleAlert(true, "successfuly update the password", "success");
    } catch (error) {
      setIsUpdateLoading(false);
      return handleAlert(true, error.response.data.error, "error");
    }
  }

  return (
    <>
      {!isForget ? (
        <>
          <div className="flex items-center mb-6 h-10 bg-gray-300 px-10 justify-between">
            <p className="font-semibold text-gray-600">
              {" "}
              {!isForget ? "Update Password" : "Forget Password"}
            </p>
            <p className="text-m  font-semibold text-gray-700">
              login access :
              {USER.source.map((e, i, arr) => (
                <span className="font-semibold text-blue-500 ml-3" key={i}>
                  {e} {arr.length > 1 && i == 0 ? "," : null}
                </span>
              ))}
            </p>
          </div>
          <form
            className="flex items-center px-10"
            onSubmit={(e) => handleUpdatePassword(e)}
          >
            <div className="mb-6 mr-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Enter password
              </label>
              <input
                type="text"
                id="8 character password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="enter password"
                required
                autoComplete="off"
                minLength="8"
                maxLength="8"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                New password
              </label>
              <input
                type="text"
                id="8 character password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="new password"
                required
                autoComplete="off"
                minLength="8"
                maxLength="8"
              />
            </div>
            <div className="flex-0 ml-auto">
              <button
                type="submit"
                className="py-2    mr-6  px-3 text-xs font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
                {IsUpdateLoding ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className=" inline ml-3 w-4 h-4 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : null}
              </button>

              <button
                type="button"
                onClick={() => setIsForget(true)}
                className="py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Forget password
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          {verify ? (
            <>
              <CreatePassword
                handleAlert={handleAlert}
                setIsForget={setIsForget}
              />
              <div className="flex justify-end px-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsForget(false);
                    setCount(0);
                    setOTP("");
                    setVerify(false);
                  }}
                  className="py-2 mr-6  px-3 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Cancle
                </button>
              </div>
            </>
          ) : (
            <SendOtp
              handleAlert={handleAlert}
              setVerify={setVerify}
              setIsForget={setIsForget}
              isForget={isForget}
            />
          )}
        </>
      )}
    </>
  );
}

export default Update_ForgetPassword;
