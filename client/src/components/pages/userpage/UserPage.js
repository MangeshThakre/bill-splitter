import React from "react";
import { useSelector } from "react-redux";
import { user } from "../../../redux/globalSplice";

function UserPage() {
  const USER = useSelector((status) => status.global.user);

  async function handleAddpassword() {}

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
          <div className="mt-20  ">
            <div className="felx items-center mb-6 h-10 bg-gray-300 px-10">
              <p>Create Password</p>
            </div>

            <form
              className="flex items-center px-10"
              onSubmit={() => handleAddpassword()}
            >
              <div className="mb-6 mr-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  create password
                </label>
                <input
                  type="text"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="enter password"
                  required
                  autoComplete="off"
                  minLength={8}
                  maxLength={12}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  confirm password
                </label>
                <input
                  type="text"
                  id="confirm"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="confirm password"
                  required
                  autoComplete="off"
                  minLength={8}
                  maxLength={12}
                />
              </div>
              <button
                type="button"
                className="flex-0 ml-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Save
              </button>
            </form>
          </div>
        </div>
        {/*body end */}
      </div>
    </>
  );
}

export default UserPage;
