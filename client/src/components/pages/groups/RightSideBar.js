import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

// icon
import edit from "../../../asset/edit.svg";
import AddGroupPopUp from "../../popup/addGroupPopup/AddGroupPopUp";
// list

function RightSideBar({ currentGroup }) {
  const URL = process.env.REACT_APP_URL;
  const USER = useSelector((state) => state.global.user);
  const EXPENSES = useSelector((state) => state.global.expenses);

  const [showAddGroupPopUp, setShowGroupPopUp] = useState(false);
  const [isMemberDetailLoading, setIsMemberDetailLoading] = useState(false);

  const [membersDetailArr, setMembersDetailArr] = useState([]);
  useEffect(() => {
    memberDetail();
  }, [EXPENSES]);

  async function memberDetail() {
    setIsMemberDetailLoading(true);
    try {
      const response = await axios({
        method: "get",
        url:
          URL +
          "/api/get_group_member_detail?groupId=" +
          currentGroup._id +
          "&userId=" +
          USER._id,
      });
      const data = response.data;
      // console.log(data);
    } catch (error) {
      setIsMemberDetailLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      <div className="w-80 h-full" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full ">
          <div
            onClick={() => setShowGroupPopUp(true)}
            id="header"
            className="flex items-center  mb-6  gap-2 hover:bg-gray-200 h-12 rounded-lg cursor-pointer"
          >
            <img src={edit} className="w-10 h-10 ml-4" alt="edit" />
            <p className="font-bold text-gray-400">Edit group settings</p>
          </div>

          <div className="">
            <h1 className="font-bold text-gray-400 text-lg">GROUP BALANCE</h1>
            <ul>
              {currentGroup.membersArr.map((e, i) => {
                return (
                  <li key={i}>
                    <Link
                      // to={"/group/" + e._id + "/edit"}
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
