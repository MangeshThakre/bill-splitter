import React from "react";
import { useState } from "react";

// popup
import ChoosePayer from "./ChoosePayer.js";
import SplitOptions from "./SplitOptions.js";

// image
import Home from "../../../asset/home.jpg";

function AddExpencePopUp({
  showAddExpencePopUp,
  setShowAddExpencePopUp,
  currentGroup,
}) {
  // loading
  const [isSaveLoading, setIsSaveLoading] = useState(true);
  const [SecondaryPopUp, setSecondaryPopUp] = useState(null);

  //
  const [paidBy, setpaidBy] = useState("");

  return (
    <>
      {showAddExpencePopUp ? (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="flex bg-[#23232382] overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center"
          aria-hidden="true"
        >
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                onClick={() => {
                  setShowAddExpencePopUp(false);
                  setSecondaryPopUp(null);
                }}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="popup-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-6 ">
                {/* header */}
                <div className="border-b-2 border-gray-300 pb-2">
                  <h1 className="text-xl font-bold text-gray-500">
                    Add an expanse
                  </h1>
                </div>
                {/* header end */}
                {/* body */}
                <form className="mt-6">
                  <div className="flex gap-8">
                    <img
                      src={Home}
                      className="w-24 h-24 rounded-lg  shadow-2xl"
                      alt="home"
                    />
                    <div className="flex flex-col gap-5">
                      <input
                        type="text"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter description"
                        required
                      />
                      <input
                        type="number"
                        id="first_name"
                        min="1"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                  {/* info */}
                  <div className="flex justify-center items-center my-10 flex-col gap-3">
                    <span>
                      Paid by
                      <button
                        type="button"
                        onClick={() =>
                          setSecondaryPopUp((perValue) =>
                            perValue === "CHOOSE_payer" ? null : "CHOOSE_payer"
                          )
                        }
                        className="py-2 px-3 mx-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Extra small
                      </button>
                      and split
                      <button
                        type="button"
                        onClick={() =>
                          setSecondaryPopUp((perValue) =>
                            perValue === "SPLIT_OPTIONS"
                              ? null
                              : "SPLIT_OPTIONS"
                          )
                        }
                        className="py-2 px-3 mx-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Extra small
                      </button>
                      ​.
                    </span>
                    <span>(You owe nothing)</span>
                  </div>
                  {/* button */}
                  <div className="flex gap-8 mt-8 justify-end pt-3 border-t-2 border-gray-300">
                    <button
                      type="button"
                      onClick={() => {
                        setShowAddExpencePopUp(false);
                        setSecondaryPopUp(null);
                      }}
                      className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                      Cancle
                    </button>

                    <button
                      type="submit"
                      className="text-white font-bold   text-center    bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50  rounded-lg text-sm px-5 py-2.5  inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2"
                    >
                      Save
                      {isSaveLoading ? (
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline mr-3 w-4 h-4 text-white animate-spin ml-2"
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
                  </div>
                  {/* button end */}
                </form>
              </div>
            </div>
          </div>
          {SecondaryPopUp == "CHOOSE_payer" ? (
            <ChoosePayer
              setSecondaryPopUp={setSecondaryPopUp}
              members={currentGroup.membersArr}
              setpaidBy={setpaidBy}
              paidBy={paidBy}
            />
          ) : null}
          {SecondaryPopUp == "SPLIT_OPTIONS" ? (
            <SplitOptions
              setSecondaryPopUp={setSecondaryPopUp}
              members={currentGroup.membersArr}
            />
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export default AddExpencePopUp;
