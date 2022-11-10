import React from "react";

// image
import Home from "../../../asset/home.jpg";
import Couple from "../../../asset/home.jpg";
import Other from "../../../asset/home.jpg";
import Trip from "../../../asset/home.jpg";
import person from "../../../asset/persion.png";
import { useNavigate } from "react-router-dom";

function ExpenseList({ expenseDetail }) {
  const navigate = useNavigate();
  function groupImg() {
    if (expenseDetail.groupType == "Home") return Home;
    if (expenseDetail.groupType == "Trip") return Trip;
    if (expenseDetail.groupType == "Couple") return Couple;
    if (expenseDetail.groupType == "Other") return Other;
  }

  return (
    <div className=" bg-gray-300 h-28 mx-2 rounded-md  flex items-center  justify-between px-5 py-2">
      <div className=" flex gap-3  items-center    ">
        <img
          className="h-16 w-16 rounded-full"
          src={expenseDetail.expenseType == "GROUP" ? groupImg() : person}
          alt="img"
        />
        <div>
          <p className="text-lg  font-semibold">
            {expenseDetail.expenseType == "GROUP"
              ? expenseDetail.groupType
              : expenseDetail.friendName}
          </p>
          <p className="text-sm  text-gray-600">{expenseDetail.expenseType}</p>
        </div>
      </div>

      <div className="flex h-full gap-5">
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold text-gray-700 mb-3">Expenses</p>
          {expenseDetail.expenses.reverse().map((expense, i) => {
            if (i > 1) return;
            return (
              <p className="font-semibold text-sm  text-blue-500" key={i}>
                {expense}
              </p>
            );
          })}
        </div>
        <div>
          <p className="text-lg font-semibold text-gray-700 mb-3">Amount</p>
          {expenseDetail.amount.reverse().map((amt, i) => {
            if (i > 1) return;
            return (
              <p className="font-semibold text-sm   text-green-500" key={i}>
                &#x20b9; {amt}
              </p>
            );
          })}
        </div>
        <div className="h-full flex items-center">
          <button
            onClick={() =>
              expenseDetail.expenseType == "GROUP"
                ? navigate("/group/" + expenseDetail.groupId)
                : navigate("/friend/" + expenseDetail.friendEmail)
            }
            type="button"
            className="py-2 ml-7 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            All Expenses
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExpenseList;
