import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { user } from "../../../redux/globalSplice";
import Group from "./Group";

function GroupExpenceListItem({ expenseDetail, groupCreatorEmail }) {
  const URL = process.env.REACT_APP_URL;
  const USER = useSelector((state) => state.global.user);
  const [showBody, setShowBody] = useState(false);
  const [currentExpenceDetail, setCurrentExpenceDetail] =
    useState(expenseDetail);
  const date = new Date(currentExpenceDetail.createdAt);
  const mounth = date.toLocaleString("default", { month: "long" });
  const expanceDate = new Date(currentExpenceDetail.createdAt).getDate();

  // loading
  const [isSettleExpenseLoading, setSettleExpenseLoading] = useState(false);

  // handle paid name
  function handlePaidBy() {
    let paidByName = currentExpenceDetail.paidBy.name;
    if (paidByName.split(" ").length > 1) {
      paidByName =
        currentExpenceDetail.paidBy.name.split(" ")[0] +
        " " +
        currentExpenceDetail.paidBy.name.split(" ")[1][0] +
        ".";
    }
    if (currentExpenceDetail.paidBy.email === USER.email) return "You";
    else return paidByName;
  }

  function handleLentMoney() {
    return currentExpenceDetail.memberArr.reduce((acc, crr) => {
      if (crr.email !== currentExpenceDetail.paidBy.email) {
        acc = acc + Number(crr.amountLeft);
      }
      return acc;
    }, 0);
  }

  // settle button
  function handledIsSettelButton() {
    const currentMember = currentExpenceDetail.memberArr.find(
      (e) => e.email === USER.email
    );
    if (USER.email !== currentExpenceDetail.paidBy.email) {
      if (currentMember && !currentMember.isSettled) return "settle";
      else if (currentMember && currentMember.isSettled) return "settled";
      else return false;
    }
  }

  // handle seltte
  async function handledIsSettel(expenseId, userEmail) {
    setSettleExpenseLoading(true);
    try {
      const response = await axios({
        method: "put",
        url:
          URL +
          "/api/settle_expense?expenseId=" +
          expenseId +
          "&userEmail=" +
          userEmail,
      });
      const data = await response.data;
      setCurrentExpenceDetail(data);
      setSettleExpenseLoading(false);
    } catch (error) {
      setSettleExpenseLoading(false);
      console.log(error);
    }
  }

  function settleButton(expenseId, userEmail) {
    return (
      <button
        type="button"
        onClick={() => handledIsSettel(expenseId, userEmail)}
        className={
          userEmail !== USER.email
            ? "py-2 px-3 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            : "text-white font-bold   text-center    bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50  rounded-lg text-sm px-5 py-2.5  inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2"
        }
      >
        Settle
        {isSettleExpenseLoading ? (
          <svg
            aria-hidden="true"
            role="status"
            className="inline mr-3 w-4 h-4 text-white animate-spin ml-2"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="#E5E7EB"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentColor"
            />
          </svg>
        ) : null}
      </button>
    );
  }

  return (
    <div className="border-b-2 border-gray-300 ">
      {/* head */}
      <div
        onClick={() => setShowBody((prevVal) => !prevVal)}
        className="py-2 px-6  mx-1 bg-gray-200 hover:bg-blue-100 cursor-pointer flex justify-between"
      >
        {/* left */}
        <div className="flex gap-3 items-center">
          <span>
            <p className="font-semibold text-xl">{expanceDate}</p>
            <p>{mounth}</p>
          </span>
          <p className="ml-5 text-lg font-semibold">
            {currentExpenceDetail.expanseDescription}
          </p>
        </div>
        <div className="flex items-center gap-5">
          {/* right */}
          <div className=" w-32">
            <p className="    text-gray ">{handlePaidBy()} paid </p>
            <p className="text-xl font-semibold">
              &#x20b9; {currentExpenceDetail.amount.toFixed(2)}
            </p>
          </div>
          <div className="w-32">
            <p className="text-gray ">{handlePaidBy()} lent </p>
            <p className="text-xl font-semibold">
              &#x20b9; {handleLentMoney().toFixed(2)}
            </p>
          </div>
          <div>button</div>
        </div>
      </div>
      {/* body */}
      {showBody ? (
        <div className="px-5 flex justify-between items-end">
          <ul className="w-[40%]">
            {currentExpenceDetail.memberArr.map((member, i) => {
              return (
                <li className="my-3 flex w-full justify-between" key={i}>
                  <div>
                    <p className="mr-4 text-xl">{member.name}</p>
                    <span>
                      {member.email == currentExpenceDetail.paidBy.email ? (
                        <span className="italic font-semibold">
                          paid &#x20b9;{currentExpenceDetail.amount.toFixed(2)}
                        </span>
                      ) : (
                        <span className="italic font-semibold  text-gray-600 ">
                          owes &#x20b9;{member.amountLeft.toFixed(2)}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="w-[6rem] text-center">
                    {groupCreatorEmail == USER.email &&
                    groupCreatorEmail !== member.email &&
                    !member.isSettled
                      ? settleButton(currentExpenceDetail.id, member.email)
                      : null}

                    {member.isSettled ? (
                      <span className="text-gray-600   font-semibold">
                        ✅ Settled
                      </span>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="h-full flex items-center">
            {handledIsSettelButton() == "settle"
              ? settleButton(currentExpenceDetail.id, USER.email)
              : null}
            `
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default GroupExpenceListItem;
