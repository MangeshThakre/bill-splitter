import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
function GroupExpenceListItem({ expenseDetail }) {
  const USER = useSelector((state) => state.global.user);

  const date = new Date(expenseDetail.createdAt);
  const mounth = date.toLocaleString("default", { month: "long" });
  const expanceDate = new Date(expenseDetail.createdAt).getDate();

  function handlePaidBy() {
    if (expenseDetail.paidBy.userId === USER._id) return "You";
    else return expenseDetail.paidBy.name;
    // " " +
    // expenseDetail.paidBy.name?.split(" ")[1][0]
  }

  function handleLentMoney() {
    return expenseDetail.memberArr.reduce((acc, crr) => {
      if (crr.id !== expenseDetail.paidBy.userId) {
        acc += Number(crr.amountLeft);
      }
      return acc;
    }, 0);
  }

  return (
    <div className="border-b-2 border-gray-300 ">
      {/* head */}
      <div className="py-2 px-6  mx-1 bg-gray-200 hover:bg-blue-100 cursor-pointer flex justify-between">
        {/* left */}
        <div className="flex gap-3 items-center">
          <span>
            <p className="font-semibold text-xl">{expanceDate}</p>
            <p>{mounth}</p>
          </span>
          <p className="ml-5 text-lg font-semibold">
            {expenseDetail.expanseDescription}
          </p>
        </div>
        <div className="flex items-center gap-5">
          {/* right */}
          <div className=" w-32">
            <p className="    text-gray ">{handlePaidBy()} paid </p>
            <p className="text-xl font-semibold">
              &#x20b9; {expenseDetail.amount}
            </p>
          </div>
          <div className="w-32">
            <p className="text-gray ">{handlePaidBy()} lent </p>
            <p className="text-xl font-semibold">
              &#x20b9; {handleLentMoney()}
            </p>
          </div>
          <div>button</div>
        </div>
      </div>
      {/* body */}
      <div></div>
    </div>
  );
}

export default GroupExpenceListItem;
