import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { friends, user, groups } from "../../../redux/globalSplice";
// img
import persionImg from "../../../asset/persion.png";
import Home from "../../../asset/home.jpg";
import Other from "../../../asset/others.jpg";
import Couple from "../../../asset/couple.jpg";
import Trip from "../../../asset/trip.jpg";
// icon

import corssIcon from "../../../asset/cross.png";

function AddGroupPopUp({
  showAddGroupPopUp,
  setShowGroupPopUp,
  isEdit = false,
  currentGroup = [],
}) {
  const dispatch = useDispatch();
  const groupListEle = useRef("");
  const USER = useSelector((state) => state.global.user);
  const GROUPS = useSelector((state) => state.global.groups);
  const FRIENDS = useSelector((state) => state.global.friends);
  const URL = process.env.REACT_APP_URL;
  const allFriends = FRIENDS.length > 0 ? FRIENDS : [];

  const [groupMember, setGroupMamber] = useState([]);
  const [groupType, setGroupType] = useState("Home");
  const [groupName, setGroupName] = useState("");
  // loading
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [alertPopUp, setAlertPopUp] = useState({
    display: false,
    alertMessage: "",
  });

  useEffect(() => {
    if (isEdit) {
      setGroupType(currentGroup.groupType);
      setGroupMamber(currentGroup.membersArr);
      setGroupName(currentGroup.groupName);
    }
  }, [showAddGroupPopUp]);

  function handleAddGroupMember() {
    const groupMembersEleArr = groupListEle.current.children;
    const memberNo = groupMembersEleArr.length + 1;
    const li = document.createElement("li");
    li.className = "flex gap-3 items-center mt-4";
    li.id = `${memberNo}_groupMember`;
    li.innerHTML = newMemberEle(persionImg, memberNo);

    // add event listner to name input
    li.children[1].firstElementChild.addEventListener("input", (e) =>
      handleDropdownMemberName(e)
    );
    li.children[2].addEventListener("input", (event) =>
      handleEmailInput(event.target)
    );
    groupListEle.current.appendChild(li);
  }

  function handleEmailInput(element) {
    element.style.backgroundColor = "#f9fafb";
  }

  function handleDropdownMemberName(element) {
    //  change background color of email element every time and
    const emailEle = element.target.parentElement.parentElement.children[2];
    emailEle.style.backgroundColor = "#f9fafb";

    // target dropdown useing current element  and removeing all teh child element
    const dorpdownEle = element.target.parentElement.lastElementChild;
    dorpdownEle.firstElementChild.innerHTML = "";

    // find the friend Name for dropdown base on current inpute value
    const filteredName = filteredRemaningName().filter((e) =>
      e.name.toLowerCase().includes(element.target.value)
    );

    //  if current inpute value not matches any firend name form freind list then hide teh dropdown and return
    if (filteredName.length < 1 || element.target.value == "") {
      return (dorpdownEle.className = "hidden");
    }

    // loop throuch the matched friend list arr[] and add in dropdown
    filteredName.forEach((e, id) => {
      const li = document.createElement("li");
      li.innerHTML = dropdownMemberNameEle(e.name, id);
      li.className = "cursor-pointer";
      li.id = id + "_name";

      // add event listener
      li.addEventListener("click", (e) => selectDropDownName(e.target));
      dorpdownEle.firstElementChild.appendChild(li);
    });

    // display the dropdown of friends name who matches the input value
    dorpdownEle.className =
      "absolute  z-10 w-full bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 overflow-scroll   max-h-36";
    // diefault className of dropdownEle  is "hidden absolute  z-10 w-full bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
    // remove the hidden from className to display teh dropdown

    //  remove event listner every time from teh popup-modal element
    document
      .querySelector("#popup-modal")
      .removeEventListener("click", eventfunction);

    // event listner to hide dropdown when coick anyware expect dropdoen element
    document
      .querySelector("#popup-modal")
      .addEventListener("click", eventfunction);

    function eventfunction(e) {
      // Check if the filter list parent element exist
      const isClosest = e.target.closest("#dropdown");
      // If `isClosest` equals falsy & popup has the class `show`
      // then hide the popup
      if (!isClosest) {
        dorpdownEle.className = "hidden";
      }
    }
  }

  function forminputMember() {
    const membersArr = [];
    const groupMambersNameArr = document.querySelectorAll("#groupMemberName");
    const groupMemberEmailArr = document.querySelectorAll("#groupMemberEmail");
    groupMambersNameArr.forEach((e, i) => {
      membersArr.push({
        name: e.value.trim(),
        email: groupMemberEmailArr[i].value.trim().toLowerCase(),
      });
    });
    return membersArr;
  }

  function filteredRemaningName() {
    const membersArr = forminputMember();
    const filteredDropdownNamesArr = [];
    allFriends.forEach((e) => {
      const filterMember = membersArr.find(
        (inputMamber) => inputMamber.name === e.name
      );
      if (!filterMember) filteredDropdownNamesArr.push(e);
    });
    return filteredDropdownNamesArr;
  }

  // select dropdown name
  function selectDropDownName(element) {
    const dropdownEle = element.parentElement.parentElement.parentElement;
    const inputEle =
      element.parentElement.parentElement.parentElement.parentElement
        .firstElementChild;
    const emailEle =
      element.parentElement.parentElement.parentElement.parentElement
        .parentElement.children[2];

    const name = element.textContent;
    const { email } = allFriends.find((e) => e.name === name);

    inputEle.value = name;
    emailEle.value = email;

    // emailEle.disabled = true;
    if (email) emailEle.style.backgroundColor = "#f7be38";
    dropdownEle.className = "hidden";
  }

  //  html elements
  function newMemberEle(img, memberNo) {
    return `
    <img
      src=${img}
      class="w-10 h-10 rounded-full"
      alt="freind"
    />
    <span class="relative w-full">
    <input
      type="text"
      id="groupMemberName"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="name"
      required
      name = ${memberNo + "_name"}
      />

    <div
    id="dropdown"
    class="hidden absolute  z-10 w-full bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 overflow-scroll  h-36"
  >
    <ul
      class="py-1 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownDefault"
    >
    </ul>
  </div>
  
  </span>
    
  <input
      type="email"
      id="groupMemberEmail"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="email@.com"
      name =${memberNo + "_email"}
    />
    
    <button
      type="button"
      onclick="this.parentElement.remove()"
      class="text-red-700 border justify-center h-8  w-8 p-3 rounded-full font-bold border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300   text-sm  text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
    >
      x
    </button>
  
    `;
  }

  function dropdownMemberNameEle(name) {
    return `<p class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">${name}</p>`;
  }

  function handleAlert(display, alertMessage) {
    setAlertPopUp({ display, alertMessage });
    setTimeout(() => setAlertPopUp({ display: false, alertMessage: "" }), 5000);
  }

  function handleRemoveMEmber(e) {}

  //  submit  from
  async function handleAddGroup(event) {
    event.preventDefault();
    const groupName = event.target[0].value;
    const membersArr = forminputMember();

    const isGroupExist = GROUPS.some(
      (e) => e.groupName.toLowerCase() == groupName.toLowerCase()
    );

    // check if group name is already exist
    if (isGroupExist) {
      return handleAlert(
        true,
        "you already created the gruop with  similar name, please use different name for this group"
      );
    }

    // check all group members are unique
    let isUnique = false;
    for (let i = 0; i < membersArr.length; i++) {
      isUnique = !membersArr.some(
        (e, index) =>
          e.name === membersArr[i].name &&
          e.email === membersArr[i].email &&
          index !== i
      );
      if (!isUnique) break;
    }

    if (!isUnique) return handleAlert(true, "please dont repeat same member");
    ////

    const creator = {
      id: USER._id,
      name: USER.firstName + " " + USER.lastName,
      email: USER.email,
    };

    setIsSaveLoading(true);
    try {
      const response = await axios({
        method: "post",
        url: URL + "/api/create_group",
        data: { creator, groupName, membersArr, groupType },
      });

      const { groupResult, friendResult } = await response.data;
      // add group and update griends in readux
      dispatch(groups([...GROUPS, groupResult]));
      dispatch(friends(friendResult.friendsArr));

      setIsSaveLoading(false);
    } catch (error) {
      setIsSaveLoading(false);
      console.log(error);
    }
  }

  // update group
  async function handleUpdate(event) {
    event.preventDefault();
    const groupName = event.target[0].value;
    const membersArr = forminputMember();
    // console.log(groupName);
    console.log(membersArr);

    let isGroupExist = false;
    GROUPS.forEach((e) => {
      if (e.groupName.toLowerCase() == groupName.toLowerCase()) {
        if (e.groupName.toLowerCase() != currentGroup.groupName.toLowerCase())
          return (isGroupExist = true);
      }
    });

    // check of group name is already exist
    if (isGroupExist) {
      return handleAlert(
        true,
        "you already created the gruop with  similar name, please use different name for this group"
      );
    }

    // check all group members are unique
    let isUnique = false;
    for (let i = 0; i < membersArr.length; i++) {
      console.log(i);
      isUnique = !membersArr.some(
        (e, index) =>
          e.email.toLowerCase() === membersArr[i].email.toLowerCase() &&
          e.name === membersArr[i].name &&
          index !== i
      );
      if (!isUnique) break;
    }
    console.log(isUnique);
    if (!isUnique) return handleAlert(true, "please dont repeat same member");
    ////
  }

  // delete group
  async function handleDelete() {
    setIsDeleteLoading(false);
  }

  return (
    <>
      {showAddGroupPopUp ? (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="flex   bg-[#23232382]   overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center"
          aria-hidden="true"
        >
          <div className="relative p-4  h-full md:h-auto">
            <div className="relative bg-gray-200 rounded-lg shadow dark:bg-gray-700  max-h-[90vh] overflow-y-auto">
              {/* close button */}
              <button
                type="button"
                onClick={() => setShowGroupPopUp(false)}
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-toggle="popup-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              {/* close button end */}
              <div className="p-6 flex gap-20">
                {/* left */}
                <div className=" ml-10  mt-20">
                  {/* <img
                    src={groupImg}
                    className="roundeds-lg h-36 w-36 "
                    alt="group"
                  /> */}
                  <div className="flex justify-center items-center w-full ">
                    {groupType == "Home" ? (
                      <img className=" rounded-lg  h-48 w-48" src={Home} />
                    ) : null}
                    {groupType == "Trip" ? (
                      <img className=" rounded-lg  h-48 w-48" src={Trip} />
                    ) : null}
                    {groupType == "Couple" ? (
                      <img className=" rounded-lg  h-48 w-48" src={Couple} />
                    ) : null}
                    {groupType == "Other" ? (
                      <img className=" rounded-lg  h-48 w-48" src={Other} />
                    ) : null}
                  </div>
                </div>
                {/* left end */}
                {/* right */}
                <div>
                  <h1 className="text-gray-500  text-2xl font-bold">
                    START A NEW GROUP
                  </h1>
                  {/* from */}
                  <form
                    autoComplete="off"
                    onSubmit={(e) =>
                      isEdit ? handleUpdate(e) : handleAddGroup(e)
                    }
                  >
                    {/* group name */}
                    <div className="my-6  ">
                      <label
                        htmlFor="password"
                        className=" block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
                      >
                        My group shall be called…
                      </label>
                      <input
                        type="text"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        placeholder="group name...."
                        defaultValue={isEdit ? groupName : ""}
                      />
                    </div>
                    {/* group menmber */}
                    <div className="border-y-[1px] border-gray-400 mb-3 pt-2">
                      <h1 className="text-gray-500   text-2xl font-bold">
                        Group Members
                      </h1>

                      <ul ref={groupListEle}>
                        {/*   firsts*/}
                        {!isEdit ? (
                          <>
                            <li className="flex gap-3 items-center mt-4">
                              <img
                                src={USER.profilePhoto}
                                className="w-10 h-10 rounded-full"
                                alt="freind"
                              />
                              <p>
                                {USER.firstName} {USER.lastName}
                              </p>
                              <p>( {USER.email} )</p>
                            </li>
                            <li className="flex gap-3 items-center mt-4">
                              <img
                                src={persionImg}
                                className="w-10 h-10 rounded-full"
                                alt="freind"
                              />
                              <span className="relative w-full">
                                <input
                                  type="text"
                                  id="groupMemberName"
                                  className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="name"
                                  required
                                  onChange={(e) => handleDropdownMemberName(e)}
                                />
                                <div
                                  id="dropdown"
                                  className="hidden absolute  z-10 w-full bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 overflow-scroll  h-36"
                                >
                                  <ul
                                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownDefault"
                                  >
                                    {/* dynamic name list */}
                                  </ul>
                                </div>
                              </span>

                              <input
                                type="email"
                                id="groupMemberEmail"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="email@.com"
                                onChange={(e) => handleEmailInput(e.target)}
                              />
                              <button
                                type="button"
                                // onClick={(e) => e.target.parentElement.remove()}
                                className=" opacity-0  c  cursor-default  text-red-700 border justify-center h-8  w-8 p-3 rounded-full font-bold border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300   text-sm  text-center  items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                              >
                                x
                              </button>
                            </li>
                          </>
                        ) : (
                          <>
                            {groupMember.map((member, index) => {
                              return (
                                <li
                                  key={index}
                                  className="flex gap-3 items-center mt-4"
                                >
                                  <img
                                    src={persionImg}
                                    className="w-10 h-10 rounded-full"
                                    alt="freind"
                                  />
                                  <span className="relative w-full">
                                    <input
                                      type="text"
                                      id="groupMemberName"
                                      className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="name"
                                      required
                                      disabled={member.name && member.email}
                                      defaultValue={member.name}
                                      onChange={(e) =>
                                        handleDropdownMemberName(e)
                                      }
                                    />
                                    <div
                                      id="dropdown"
                                      className="hidden absolute  z-10 w-full bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 overflow-scroll  h-36"
                                    >
                                      <ul
                                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                        aria-labelledby="dropdownDefault"
                                      >
                                        {/* dynamic name list */}
                                      </ul>
                                    </div>
                                  </span>

                                  <input
                                    type="email"
                                    id="groupMemberEmail"
                                    style={{
                                      backgroundColor:
                                        member.name && member.email
                                          ? "#f7be38"
                                          : "#f9fafb",
                                    }}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="email@.com"
                                    onChange={(e) => handleEmailInput(e.target)}
                                    defaultValue={member.email}
                                    disabled={member.name && member.email}
                                  />
                                  <button
                                    type="button"
                                    onClick={(e) => handleRemoveMEmber(e)}
                                    class="text-red-700 border justify-center h-8  w-8 p-3 rounded-full font-bold border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300   text-sm  text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                                  >
                                    x
                                  </button>
                                </li>
                              );
                            })}
                          </>
                        )}

                        {/*  remaining dynamic */}
                      </ul>
                      <div
                        id="addPersion"
                        onClick={() => handleAddGroupMember()}
                        className="my-5 text-blue-500 text-md font-semibold cursor-pointer h-8 flex items-center justify-center  w-32 rounded-lg  hover:bg-[#c9cdd3]"
                      >
                        + Add a persion
                      </div>
                    </div>
                    {/* group type */}
                    <div>
                      <h1 className=" font-bold   text-xl text-gray-500">
                        Group Type
                      </h1>
                      <div className="flex gap-3  my-5">
                        <button
                          onClick={(e) => setGroupType("Home")}
                          type="button"
                          className={
                            groupType == "Home"
                              ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                              : "text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                          }
                        >
                          Home
                        </button>
                        <button
                          onClick={(e) => setGroupType("Trip")}
                          type="button"
                          className={
                            groupType == "Trip"
                              ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                              : "text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                          }
                        >
                          Trip
                        </button>
                        <button
                          onClick={(e) => setGroupType("Couple")}
                          type="button"
                          className={
                            groupType == "Couple"
                              ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                              : "text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                          }
                        >
                          Couple
                        </button>
                        <button
                          onClick={(e) => setGroupType("Other")}
                          type="button"
                          className={
                            groupType == "Other"
                              ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                              : "text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                          }
                        >
                          Other
                        </button>
                      </div>
                    </div>
                    {/*  submit form button */}
                    <div className="flex gap-6">
                      {/*   update / save button   */}
                      <button
                        type="submit"
                        className="text-white font-bold   text-center    bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50  rounded-lg text-sm px-5 py-2.5  inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2"
                      >
                        {isEdit ? "Update" : "Save"}
                        {isSaveLoading ? (
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

                      {/* delete button */}
                      {isEdit ? (
                        <button
                          type="button"
                          onClick={() => handleDelete()}
                          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          Delete Group
                          {isDeleteLoading ? (
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
                      ) : null}
                    </div>
                  </form>
                </div>
                {/* right end */}
              </div>
            </div>
          </div>

          {alertPopUp.display ? (
            <dir className="Alert absolute bottom-0 ">
              <div
                className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
                role="alert"
              >
                <span className="font-medium">Warning alert!</span>{" "}
                {alertPopUp.alertMessage}
              </div>
            </dir>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export default AddGroupPopUp;
