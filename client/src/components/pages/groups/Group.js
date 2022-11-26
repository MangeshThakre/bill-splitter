import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { expenses } from "../../../redux/globalSplice.js";

// Image
import Home from "../../../asset/home.jpg";
import Couple from "../../../asset/couple.jpg";
import Trip from "../../../asset/trip.jpg";
import Other from "../../../asset/others.jpg";
import loading from "../../../asset/loading.svg";
// components
import RightSideBar from "./RightSideBar";
import GroupExpenceListItem from "./GroupExpenceListItem.js";
// popup
import AddGroupExpencePopUp from "../../popup/addExpencePopUp/AddGroupExpencePopUp";

function Group() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const URL = process.env.REACT_APP_URL;
  const USER = useSelector((state) => state.global.user);
  const GROUPS = useSelector((state) => state.global.groups);
  const EXPENSES = useSelector((state) => state.global.expenses);
  const currentGroup = GROUPS.find((e) => e._id === id);
  const [reloadGroupExpenseData, setReloadGroupExpenseData] = useState(false);
  // loading
  const [isGroupInfoLoading, setIsGroupInfoLoading] = useState(false);
  // expanse popup toggle
  const [showAddExpencePopUp, setShowAddExpencePopUp] = useState(false);
  // alert
  const [alertPopUp, setAlertPopUp] = useState({
    display: false,
    alertMessage: "",
    type: "",
  });

  // handle alert
  function handleAlert(display, alertMessage, type) {
    setAlertPopUp({ display, alertMessage, type });
    setTimeout(
      () => setAlertPopUp({ display: false, alertMessage: "", type: "" }),
      5000
    );
  }

  function groupImg() {
    if (currentGroup.groupType == "Home") return Home;
    if (currentGroup.groupType == "Trip") return Trip;
    if (currentGroup.groupType == "Couple") return Couple;
    if (currentGroup.groupType == "Other") return Other;
  }

  useEffect(() => {
    handleExpanseData();
  }, [currentGroup, reloadGroupExpenseData]);

  async function handleExpanseData() {
    setIsGroupInfoLoading(true);
    try {
      const response = await axios({
        method: "get",
        url:
          URL +
          "/api/get_expenceData?groupId=" +
          currentGroup._id +
          "&userId=" +
          USER._id,
      });
      const data = await response.data;
      dispatch(expenses(data));
      setIsGroupInfoLoading(false);
    } catch (error) {
      setIsGroupInfoLoading(false);
      alert(error);
    }
  }

  return (
    <>
      <div id="group" className="flex-1 mx-2 shadow-xl flex flex-col">
        {/* header  */}
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
            onClick={() => setShowAddExpencePopUp(true)}
            type="button"
            className="text-white bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 "
          >
            Add expanse
          </button>
        </div>
        {/* header end */}
        {/* body */}
        <div className="basis-full overflow-y-auto">
          {isGroupInfoLoading ? (
            <div className="h-full flex justify-center items-center">
              <img src={loading} alt="loading" />
            </div>
          ) : (
            <ul className="mt-2">
              {EXPENSES.length > 0 ? (
                EXPENSES.map((expense, i) => {
                  return (
                    <li key={i}>
                      <GroupExpenceListItem
                        expenseDetail={expense}
                        groupCreatorEmail={currentGroup.creator.email}
                        type={"GROUP"}
                        handleAlert={handleAlert}
                      />
                    </li>
                  );
                })
              ) : (
                <div className="h-full flex mt-10 justify-center items-center  font-bold text-4xl text-blue-300">
                  Add Expense
                </div>
              )}
            </ul>
          )}
        </div>

        {/* body end */}
      </div>
      <RightSideBar currentGroup={currentGroup} />
      <AddGroupExpencePopUp
        showAddExpencePopUp={showAddExpencePopUp}
        setShowAddExpencePopUp={setShowAddExpencePopUp}
        currentGroup={currentGroup}
        setReloadGroupExpenseData={setReloadGroupExpenseData}
        handleAlert={handleAlert}
      />

      {alertPopUp.display ? (
        <dir className="Alert absolute bottom-0  left-0 z-50">
          <div
            className={
              (alertPopUp.type == "warning" &&
                "p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800") ||
              (alertPopUp.type == "error" &&
                "p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800") ||
              (alertPopUp.type == "success" &&
                "p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800")
            }
            // className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
            role="alert"
          >
            <span className="font-medium">
              {alertPopUp.type.toUpperCase()} alert!
            </span>{" "}
            {alertPopUp.alertMessage}
          </div>
        </dir>
      ) : null}
    </>
  );
}

export default Group;
