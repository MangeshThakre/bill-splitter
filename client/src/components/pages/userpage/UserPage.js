import React from "react";
import { useSelector } from "react-redux";
import { user } from "../../../redux/globalSplice";
import CreatePassword from "./CreatePassword.js";
import Update_ForgetPassword from "./Update_ForgetPassword.js";
import { useState } from "react";
function UserPage() {
  const USER = useSelector((status) => status.global.user);
  const [alertPopUp, setAlertPopUp] = useState({
    diaplay: false,
    message: "",
    time: 0,
  });

  function handleAlert(display, alertMessage, type) {
    setAlertPopUp({ display, alertMessage, type });
    setTimeout(
      () => setAlertPopUp({ display: false, alertMessage: "", type: "" }),
      5000
    );
  }

  return (
    <>
      <div id="group" className="flex-1 mx-2 shadow-xl flex flex-col">
        {/* header  */}
        <div className="  flex justify-end h-20 items-center gap-3 px-4 bg-gray-200">
          <div className="flex-1 ml-auto flex items-center gap-4">
            <img
              src={USER.profilePhoto}
              alt="img"
              className="w-12 h-12  rounded-full"
            />
            <h1 className=" text-xl font-semibold ">User Setting</h1>
          </div>
        </div>
        {/* header end */}
        {/* body */}
        <div className="h-full   flex flex-col py-10  gap-7">
          {/* user detail */}
          <div className="flex px-10  items-center gap-7 ">
            <img
              className="h-24 w-24 rounded-lg"
              src={USER.profilePhoto}
              alt={USER.firstName}
            />

            {/* name field */}
            <div className="flex gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block font-semibold mb-2 text-sm  text-gray-900 dark:text-gray-300"
                >
                  FirstName
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  required
                  defaultValue={USER.firstName}
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-300"
                >
                  LastName
                </label>
                <input
                  type="lastName"
                  id="lastName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  defaultValue={USER.lastName}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-semibold text-gray-900 dark:text-gray-300"
                >
                  email
                </label>
                <input
                  type="email"
                  id="email"
                  className=" border  bg-[#f7be38] border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@flowbite.com"
                  defaultValue={USER.email}
                  disabled
                />
              </div>
            </div>
            {/* name update button */}
            <button
              type="button"
              className=" mt-9 flex-0 ml-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Update
            </button>
          </div>
          {/* end user detail */}
          <div className="mt-20  ">
            {/* create passpord from  */}
            {!USER.source.includes("local") ? (
              <CreatePassword handleAlert={handleAlert} />
            ) : null}
            {/* create password end */}

            {/* update password */}
            {USER.source.includes("local") ? (
              <Update_ForgetPassword handleAlert={handleAlert} />
            ) : null}
            {/* update password end */}
          </div>
        </div>
        {/*body end */}
      </div>

      {/* alert pop up */}
      {alertPopUp.display ? (
        <dir className="Alert absolute bottom-0  left-0 z-40">
          <div
            className={
              (alertPopUp.type == "warning" &&
                "p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800") ||
              (alertPopUp.type == "error" &&
                "p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800") ||
              (alertPopUp.type == "success" &&
                "p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800")
            }
            // className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
            role="alert"
          >
            <span className="font-medium">{alertPopUp.type} alert!</span>{" "}
            {alertPopUp.alertMessage}
          </div>
        </dir>
      ) : null}
      {/* alert pop up  end*/}
    </>
  );
}

export default UserPage;
