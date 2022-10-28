import React from "react";

function SplitOptions({ setSecondaryPopUp, members }) {
  return (
    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        {/* close button */}
        <button
          type="button"
          onClick={() => setSecondaryPopUp(null)}
          className="absolute top-5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
        {/* close button  end*/}

        <div className="pb-2">
          <div className="border-b-2 p-6  border-gray-300 pb-2">
            <h1 className="text-xl font-bold text-gray-500">
              Choose split option
            </h1>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default SplitOptions;
