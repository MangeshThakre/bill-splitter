import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

// img
import loading from "../../../asset/loading.svg";

// component
import ExpenseList from "./ExpenseList.js";

import { Form } from "react-router-dom";
function AllExpense() {
  const URL = process.env.REACT_APP_URL;
  const USER = useSelector((state) => state.global.user);
  const [allExpense, setAllExpense] = useState([]);
  const [isAllExpensesLoaidng, setIsAllExpensesLoading] = useState(false);
  const [alertPopUp, setAlertPopUp] = useState({
    display: false,
    alertMessage: "",
    type: "",
  });
  function handleAlert(display, alertMessage, type) {
    setAlertPopUp({ display, alertMessage, type });
    setTimeout(
      () => setAlertPopUp({ display: false, alertMessage: "", type: "" }),
      5000
    );
  }

  useEffect(() => {
    getAllExpenses();
  }, []);

  async function getAllExpenses() {
    setIsAllExpensesLoading(true);
    try {
      const response = await axios({
        method: "get",
        url:
          URL +
          "/api/get_all_expenses?userEmail=" +
          USER.email +
          "&userId=" +
          USER._id,
      });
      const data = await response.data;
      setAllExpense(data);
      setIsAllExpensesLoading(false);
    } catch (error) {
      setIsAllExpensesLoading(false);
      handleAlert(true, error.response.data.error, "error");
    }
  }

  return (
    <>
      <div id="allExpense" className="flex-1   mx-2 shadow-xl">
        <div id="dashbordHeader" className="w-full  bg-gray-200">
          {/* dashbord   heading 01*/}
          <div className="  flex justify-end h-20 items-center gap-3 px-4 mb-4">
            <h1 className="flex-1 ml-auto text-xl font-semibold ">
              All expenses
            </h1>
          </div>
        </div>

        {/* body */}
        <div className="basis-full overflow-y-auto  overflow-x-hidden">
          {isAllExpensesLoaidng ? (
            <div className="h-full flex justify-center items-center">
              <img src={loading} alt="loading" />
            </div>
          ) : (
            <ul className="mt-2  flex flex-col gap-5">
              {allExpense.length > 0 ? (
                allExpense.map((expense, i) => {
                  return (
                    <li key={i}>
                      <ExpenseList expenseDetail={expense} />
                    </li>
                  );
                })
              ) : (
                <div className="h-full flex justify-center items-center  font-bold text-4xl text-blue-300">
                  No DaTa
                </div>
              )}
            </ul>
          )}
        </div>

        {/* body end */}
      </div>

      {/* alert pop up */}
      {alertPopUp.display ? (
        <dir className="Alert absolute bottom-0  left-0 z-40">
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
            <span className="font-medium">{alertPopUp.type} alert!</span>{" "}
            {alertPopUp.alertMessage}
          </div>
        </dir>
      ) : null}
      {/* alert pop up  end*/}
    </>
  );
}

export default AllExpense;
