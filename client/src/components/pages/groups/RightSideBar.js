import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

// icon
import edit from "../../../asset/edit.svg";

// list

import ListWithInfo from "../../sideBar/ListWithInfo";

function RightSideBar({ currentGroup }) {
  const [currentSection, setCurrentSection] = useState("Setting");

  return (
    <div className="w-80 h-full" aria-label="Sidebar">
      <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full ">
        <div
          id="header"
          className="flex items-center  mb-6  gap-2 hover:bg-gray-200 h-12 rounded-lg cursor-pointer"
        >
          <img src={edit} className="w-10 h-10 ml-4" alt="edit" />
          <p className="font-bold text-gray-400">Edit group settings</p>
        </div>

        <div className="">
          <h1 className="font-bold text-gray-400 text-lg">GROUP BALANCE</h1>
          <div>
            {currentGroup.membersArr.map((e, i) => {
              return (
                <li key={i}>
                  <Link
                    // to={type == "freind" ? "/freind" : "/group/" + e._id}
                    className="flex gap-3 items-center p-2 pl-3 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  >
                    <img
                      //   src={groupImg(e.groupType)}
                      className="w-8 h-8 rounded-full"
                      alt="img"
                    />
                    <p className="font-semibold text-gray-600">{e.name}</p>
                  </Link>
                </li>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSideBar;
