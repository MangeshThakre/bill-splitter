import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { user } from "../../../redux/globalSplice";
import CreatePassword from "./CreatePassword.js";
import Update_ForgetPassword from "./Update_ForgetPassword.js";
import { useState } from "react";
import axios from "axios";
function UserPage() {
  const dispatch = useDispatch();
  const URL = process.env.REACT_APP_URL;
  const USER = useSelector((status) => status.global.user);
  const [updateUserLoading, setUpdateUserLoading] = useState(false);
  const [alertPopUp, setAlertPopUp] = useState({
    diaplay: false,
    message: "",
    type: "",
  });

  async function updateUser(e) {
    e.preventDefault();
    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    setUpdateUserLoading(true);
    try {
      const response = await axios({
        method: "put",
        url: URL + "/api/update_user_name",
        data: { firstName, lastName, userId: USER._id },
      });
      const data = await response.data;
      dispatch(user(data));
      setUpdateUserLoading(false);
      return handleAlert(true, "Successfully updated userName", "success");
    } catch (error) {
      setUpdateUserLoading(false);
      return handleAlert(true, error.response.data.error);
    }
  }

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
          <form
            className="flex px-10  items-center gap-7 "
            onSubmit={(e) => updateUser(e)}
          >
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
              type="submit"
              className=" mt-9 flex items-center flex-0 ml-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Update
              {updateUserLoading ? (
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
          </form>
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
