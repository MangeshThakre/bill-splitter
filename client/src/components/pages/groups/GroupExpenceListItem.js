import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { user } from "../../../redux/globalSplice";
import Group from "./Group";
// image
import loading from "../../../asset/loading.svg";

function GroupExpenceListItem({ expenseDetail, groupCreatorEmail }) {
  const URL = process.env.REACT_APP_URL;
  const USER = useSelector((state) => state.global.user);
  const [showBody, setShowBody] = useState(false);

  const [currentExpenceMemberArr, setCurrentExpenceMemberArr] = useState(
    expenseDetail.memberArr
  );
  const date = new Date(expenseDetail.createdAt);
  const mounth = date.toLocaleString("default", { month: "long" });
  const expanceDate = new Date(expenseDetail.createdAt).getDate();

  // loading
  const [isSettleExpenseLoading, setSettleExpenseLoading] = useState(false);

  // handle paid name
  function handlePaidBy() {
    let paidByName = expenseDetail.paidBy.name;
    if (paidByName.split(" ").length > 1) {
      paidByName =
        expenseDetail.paidBy.name.split(" ")[0] +
        " " +
        expenseDetail.paidBy.name.split(" ")[1][0].toUpperCase() +
        ".";
    }
    if (expenseDetail.paidBy.email === USER.email) return "You";
    else return paidByName;
  }

  function handleLentMoney() {
    return currentExpenceMemberArr.reduce((acc, crr) => {
      if (crr.email !== expenseDetail.paidBy.email) {
        acc = acc + Number(crr.amountLeft);
      }
      return acc;
    }, 0);
  }

  // settle button
  function handledIsSettelButton() {
    const currentMember = currentExpenceMemberArr.find(
      (e) => e.email === USER.email
    );
    if (USER.email !== expenseDetail.paidBy.email) {
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

      const newCurrentExpenceMemberArr = currentExpenceMemberArr.map((e) => {
        return {
          amountLeft: e.amountLeft,
          email: e.email,
          isSettled: data.splitWith.find((member) => member.email == e.email)
            .isSettled,
          name: e.name,
        };
      });
      // console.log(newCurrentExpenceMemberArr);

      setCurrentExpenceMemberArr(newCurrentExpenceMemberArr);

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
      </button>
    );
  }

  const LOADING = (
    <div className="absolute bg-[#f1f2f3] h-full w-full left-0 top-0 flex justify-center items-center">
      <img src={loading} alt="loading" />
    </div>
  );

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
            {expenseDetail.expanseDescription}
          </p>
        </div>
        {/* right */}
        <div className="flex items-center gap-5">
          <div className=" w-32">
            <p className="    text-gray ">{handlePaidBy()} paid </p>
            <p className="text-xl font-semibold">
              &#x20b9; {expenseDetail.amount.toFixed(2)}
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
        <div className="px-5 flex justify-between     relative items-end  ">
          <ul className="w-[40%]">
            {currentExpenceMemberArr.map((member, i) => {
              return (
                <li className="my-3 flex w-full justify-between" key={i}>
                  {/* list left */}
                  <div>
                    <p className="mr-4 text-xl">{member.name}</p>
                    <span>
                      {member.email == expenseDetail.paidBy.email ? (
                        <span className="italic font-semibold">
                          paid &#x20b9;
                          {expenseDetail.amount.toFixed(2)}
                        </span>
                      ) : (
                        <span className="italic font-semibold  text-gray-600 ">
                          owes &#x20b9;{member.amountLeft.toFixed(2)}
                        </span>
                      )}
                    </span>
                  </div>
                  {/* list reight */}
                  <div className="w-[6rem] text-center">
                    {/* settel button */}
                    {member.email !== USER.email && // from current user
                    USER.email == expenseDetail.paidBy.email &&
                    !member.isSettled
                      ? settleButton(expenseDetail.id, member.email)
                      : null}

                    {/* settled message */}
                    {expenseDetail.paidBy.email !== member.email &&
                    member.isSettled ? (
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
              ? settleButton(expenseDetail.id, USER.email)
              : null}
          </div>
          {isSettleExpenseLoading ? LOADING : null}
        </div>
      ) : null}
      {/* body end */}
    </div>
  );
}

export default GroupExpenceListItem;
