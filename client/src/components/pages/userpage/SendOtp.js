import React from "react";
import { useSelector } from "react-redux";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useState, useEffect } from "react";
import axios from "axios";
import md5 from "md5";
function SendOtp({ handleAlert, setVerify, isForget, setIsForget }) {
  const USER = useSelector((state) => state.global.user);
  const URL = process.env.REACT_APP_URL;

  const [OTP, setOTP] = useState(0);
  const [serverOTP, setSErverOTP] = useState(0);
  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [isSendOtpLoading, setIsSetOtpLoading] = useState(false);

  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(0);
    }
    if (count > 0) {
      const newIntervalId = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
      setIntervalId(newIntervalId);
    }
  }, [count]);

  async function ResendOTP() {
    setCount(60);
    setIsSetOtpLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/auth/send_otp?userEmail=" + USER.email,
      });
      const data = await response.data;
      setSErverOTP(data.otp);
      setIsSetOtpLoading(false);
      return handleAlert(
        true,
        `please verify OTP sent on ${USER.email}`,
        "warning"
      );
    } catch (error) {
      setIsSetOtpLoading(false);
      return handleAlert(true, error.response.data.error, "error");
    }
  }

  function handleVerify() {
    if (serverOTP !== md5(Number(OTP))) {
      return handleAlert(true, " Invalid OTP", "error");
    }
    setCount(0);
    setVerify(true);
  }

  return (
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
      {/* // left */}
      <div className="flex px-10 justify-between mt-10 ">
        <div>
          <div className="flex  items-center ">
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={4}
              otpType="number"
              disabled={false}
              secure
            />
            {count > 0 ? (
              <button
                className="py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => handleVerify()}
                disabled={OTP.length >= 3 ? false : true}
              >
                verify
              </button>
            ) : (
              <button
                className="py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => ResendOTP()}
              >
                Send
                {isSendOtpLoading ? (
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
            )}
          </div>
          {count > 0 ? (
            <p className=" mt-5 text-blue-500 font-semibold cursor-default">
              Time left to verify OTP {count} sec
            </p>
          ) : null}
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              setIsForget(false);
              setCount(0);
              setOTP("");
              setVerify(false);
            }}
            className="py-2    mr-6  px-3 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Cancle
          </button>
        </div>
      </div>
    </>
  );
}

export default SendOtp;
