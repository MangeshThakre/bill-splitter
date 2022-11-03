import person from "../../../asset/persion.png";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// component
import RightSideBar from "./RightSideBar";
import AddFriendExpensePopUp from "../../popup/addExpencePopUp/AddFriendExpensePopUp";

function Friends() {
  const { email } = useParams();
  const FRIENDS = useSelector((state) => state.global.friends);
  const [showAddFriendExpencePopUp, setShowAddFriendExpencePopUp] =
    useState(false);
  const [reloadExpenseDate, setReloadExpenseData] = useState(false);
  const currentFriend = FRIENDS.find((e) => e.email == email);

  return (
    <>
      <div id="group" className="flex-1 mx-2 shadow-xl flex flex-col">
        {/* header  */}
        <div className="  flex justify-end h-20 items-center gap-3 px-4 bg-gray-200">
          <div className="flex-1 ml-auto flex items-center gap-4">
            <img src={person} alt="img" className="w-16 h-16  rounded-full" />
            <h1 className=" text-lg font-semibold ">{currentFriend.name}</h1>
          </div>
          {/* add expance bitton */}
          <button
            onClick={() => setShowAddFriendExpencePopUp(true)}
            type="button"
            className="text-white bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 "
          >
            Add expanse
          </button>
        </div>
        {/* header end */}
      </div>
      <RightSideBar />
      <AddFriendExpensePopUp
        showAddFriendExpencePopUp={showAddFriendExpencePopUp}
        setShowAddFriendExpencePopUp={setShowAddFriendExpencePopUp}
        currentfriend={currentFriend}
        setReloadExpenseData={setReloadExpenseData}
      />
    </>
  );
}

export default Friends;
