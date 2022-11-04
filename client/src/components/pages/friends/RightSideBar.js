import React, { useEffect } from "react";
import { useState } from "react";

// component
import AddFriendPopUp from "../../popup/AddFriendPopUp";
import { useSelector } from "react-redux";

import edit from "../../../asset/edit.svg";
function RightSideBar() {
  const [showFriendPopUp, setShowFriendPopUp] = useState(false);
  return (
    <>
      <div className="w-80 h-full" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full ">
          {/* edit group button */}
          <div
            onClick={() => setShowFriendPopUp(true)}
            id="header"
            className="flex items-center  mb-6  gap-2 hover:bg-gray-200 h-12 rounded-lg cursor-pointer"
          >
            <img src={edit} className="w-10 h-10 ml-4" alt="edit" />
            <p className="font-bold text-gray-400">Edit Friend settings</p>
          </div>
          {/* edit group button  exit*/}
        </div>
      </div>
      <AddFriendPopUp
        showAddFreindpopUp={showFriendPopUp}
        setShowAddFreindpopUp={setShowFriendPopUp}
        isEdit={true}
      />
    </>
  );
}

export default RightSideBar;
