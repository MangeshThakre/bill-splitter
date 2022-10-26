import React from "react";

function AllExpense() {
  return (
    <>
      <div id="allExpense" className="flex-1  mx-2 shadow-xl">
        <div id="dashbordHeader" className="w-full   bg-gray-200">
          {/* dashbord   heading 01*/}
          <div className="  flex justify-end h-14 items-center gap-3 px-4">
            <h1 className="flex-1 ml-auto    text-lg font-semibold ">
              All expenses
            </h1>
            {/* add expance bitton */}
            <button
              type="button"
              className="text-white bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 "
            >
              Add expanse
            </button>
            {/* settle up button */}
            <button
              type="button"
              className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 "
            >
              settle up
            </button>
          </div>
        </div>
      </div>
      {/* sidebar */}
    </>
  );
}

export default AllExpense;
