import person from "../../../asset/persion.png";
import { useEffect, useState } from "react";
import { useSelector, dispatch, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { expenses } from "../../../redux/globalSplice.js";

import axios from "axios";
// component
import RightSideBar from "./RightSideBar";
import AddFriendExpensePopUp from "../../popup/addExpencePopUp/AddFriendExpensePopUp";
import GroupExpenceListItem from "../../../components/pages/groups/GroupExpenceListItem.js";

// image
import loading from "../../../asset/loading.svg";

function Friends() {
  const dispatch = useDispatch();
  const { email } = useParams();
  const URL = process.env.REACT_APP_URL;
  const USER = useSelector((state) => state.global.user);
  const FRIENDS = useSelector((state) => state.global.friends);
  const EXPENSES = useSelector((state) => state.global.expenses);

  const [showAddFriendExpencePopUp, setShowAddFriendExpencePopUp] =
    useState(false);
  const [reloadExpenseDate, setReloadExpenseData] = useState(false);
  const [isFriendInfoLoading, setIsFriendInfoLoading] = useState(false);
  const currentFriend = FRIENDS.find((e) => e.email == email);

  useEffect(() => {
    handleExpanseData();
  }, [currentFriend, reloadExpenseDate]);

  async function handleExpanseData() {
    setIsFriendInfoLoading(true);
    try {
      const response = await axios({
        method: "get",
        url:
          URL +
          "/api/get_private_expenseData?user=" +
          USER.email +
          "&userId=" +
          USER._id +
          "&friend=" +
          currentFriend.email,
      });
      const data = await response.data;
      dispatch(expenses(data));
      setIsFriendInfoLoading(false);
    } catch (error) {
      setIsFriendInfoLoading(false);
      alert(error);
    }
  }

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
        {/* body */}
        <div className="basis-full overflow-y-auto">
          {isFriendInfoLoading ? (
            <div className="h-full flex justify-center items-center">
              <img src={loading} alt="loading" />
            </div>
          ) : (
            <ul className="mt-2">
              {EXPENSES ? (
                EXPENSES.map((expense, i) => {
                  return (
                    <li key={i}>
                      <GroupExpenceListItem
                        expenseDetail={expense}
                        groupCreatorEmail={expense.paidBy.email}
                      />
                    </li>
                  );
                })
              ) : (
                <div> no data</div>
              )}
            </ul>
          )}
        </div>

        {/* body end */}
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
