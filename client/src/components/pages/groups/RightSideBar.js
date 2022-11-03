import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// icon
import edit from "../../../asset/edit.svg";
import person from "../../../asset/persion.png";
import AddGroupPopUp from "../../popup/addGroupPopup/AddGroupPopUp";

// listComponent
import GroupMemberList from "./GroupMemberList.js";

function RightSideBar({ currentGroup }) {
  const [showAddGroupPopUp, setShowGroupPopUp] = useState(false);

  return (
    <>
      <div className="w-80 h-full" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full ">
          {/* edit group button */}
          <div
            onClick={() => setShowGroupPopUp(true)}
            id="header"
            className="flex items-center  mb-6  gap-2 hover:bg-gray-200 h-12 rounded-lg cursor-pointer"
          >
            <img src={edit} className="w-10 h-10 ml-4" alt="edit" />
            <p className="font-bold text-gray-400">Edit group settings</p>
          </div>
          {/* edit group button  exit*/}

          <div className="">
            <h1 className="font-bold text-gray-400 text-lg">GROUP MEMBERS</h1>
            <ul>
              {currentGroup.membersArr.map((e, i) => {
                return (
                  <li key={i}>
                    <GroupMemberList currentMember={e} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* edit group */}
      <AddGroupPopUp
        showAddGroupPopUp={showAddGroupPopUp}
        setShowGroupPopUp={setShowGroupPopUp}
        isEdit={true}
        currentGroup={currentGroup}
      />
    </>
  );
}

export default RightSideBar;
