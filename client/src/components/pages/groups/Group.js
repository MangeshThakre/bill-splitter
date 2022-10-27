import React from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

// Image

import Home from "../../../asset/home.jpg";
import Couple from "../../../asset/couple.jpg";
import Trip from "../../../asset/trip.jpg";
import Other from "../../../asset/others.jpg";
import { Link } from "react-router-dom";

import RightSideBar from "./RightSideBar";
// import Home from

function Group() {
  const { id } = useParams();
  const GROUPS = useSelector((state) => state.global.groups);
  const currentGroup = GROUPS.find((e) => e._id === id);

  function groupImg() {
    if (currentGroup.groupType == "Home") return Home;
    if (currentGroup.groupType == "Trip") return Trip;
    if (currentGroup.groupType == "Couple") return Couple;
    if (currentGroup.groupType == "Other") return Other;
  }

  return (
    <>
      <div id="group" className="flex-1 mx-2 shadow-xl">
        <div className="  flex justify-end h-20 items-center gap-3 px-4 bg-gray-200">
          <div className="flex-1 ml-auto flex items-center gap-4">
            <img
              src={groupImg()}
              alt="img"
              className="w-16 h-16  rounded-full"
            />
            <h1 className=" text-lg font-semibold ">
              {currentGroup.groupName}
            </h1>
          </div>
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
      <RightSideBar currentGroup={currentGroup} />
    </>
  );
}

export default Group;
