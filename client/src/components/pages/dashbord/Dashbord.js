import React from "react";

import "./Dashbord.css";
import Sidebar from "../../sideBar/sidebar";
import { useState } from "react";
import UserPage from "../userpage/UserPage";
function Dashbord() {
  const [DashbordPage, setDashbordPage] = useState("DASHBORD");
  return (
    <>
      <div id="dashbord" className="flex-1 mx-2 shadow-xl">
        {/* dashbord heading */}
        <div id="dashbordHeader" className="w-full  bg-gray-200">
          {/* dashbord   heading 01*/}
          <div className="  flex justify-end h-14 items-center gap-3 px-4">
            <h1 className="flex-1 ml-auto    text-lg font-semibold ">
              Dashbord
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
          {/* dashbord   heading 02*/}
          <ul className="border-gray-300   border-y-2 flex  justify-between py-2">
            <li className=" border-gray-300  border-r-2 flex justify-center flex-col items-center w-full">
              <h1 className=" text-gray-500  text-sm">Total balance</h1>
              <p className=" text-[#2557D6]">dynamic</p>
            </li>
            <li className="flex justify-center items-center w-full flex-col">
              <h1 className=" text-gray-500 text-sm">You owe</h1>
              <p className=" text-[#2557D6]">dynamic</p>
            </li>
            <li className="border-gray-300  border-l-2 flex justify-center flex-col items-center w-full">
              <h1 className=" text-gray-500 text-sm">You are owed</h1>
              <p className=" text-[#2557D6]">dynamic</p>
            </li>
          </ul>
        </div>
      </div>
      <Sidebar />
    </>
  );
}

export default Dashbord;
