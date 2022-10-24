import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
// img
import persionImg from "../../asset/persion.png";
import groupImg from "../../asset/group.png";
// icon
import corssIcon from "../../asset/cross.png";
import { user } from "../../redux/globalSplice";

function AddGroupPopUp({ showAddGroupPopUp, setShowGroupPopUp }) {
  const groupListEle = useRef("");
  const allFriends = [
    { name: "test 1", email: "textone@gmail.com" },
    { name: "test 2", email: "texttwo@gmail.com" },
    { name: "test 3", email: "textthree@gmail.com" },
    { name: "test 4", email: "" },
    { name: "test 5", email: "textfive@gmail.com" },
    { name: "test 6", email: "textsix@gmail.com" },
    { name: "test 7", email: "textseven@gmail.com" },
    { name: "test 8", email: "" },
  ];
  const USER = useSelector((state) => state.global.user);
  const [groupMember, setGroupMamber] = useState([]);

  function handleAddGroupMember() {
    const groupMembersEleArr = groupListEle.current.children;
    const memberNo = groupMembersEleArr.length + 1;
    const li = document.createElement("li");
    li.className = "flex gap-3 items-center mt-4";
    li.id = `${memberNo}_groupMember`;
    li.innerHTML = newMemberEle(persionImg, memberNo);
    groupListEle.current.appendChild(li);
  }

  async function handleAddGroup() {}

  function handleDropdownMemberName(e) {
    // target dropdown useing current element  and removeing all teh child element
    const dorpdownEle = e.target.parentElement.lastElementChild;
    dorpdownEle.firstElementChild.innerHTML = "";

    // find the friend Name for dropdown base on current inpute value
    const filteredName = allFriends.filter(({ name, email }) =>
      name.includes(e.target.value)
    );

    //  if current inpute value not matches any firend name form freind list then hide teh dropdown and return
    if (filteredName.length < 1 || e.target.value == "") {
      return (dorpdownEle.className = "hidden");
    }

    // loop throuch the matched friend list arr[] and add in dropdown
    filteredName.forEach((e, id) => {
      const li = document.createElement("li");
      li.innerHTML = dropdownMemberNameEle(e.name, id);
      dorpdownEle.firstElementChild.appendChild(li);
    });

    // display the dropdown of friends name who matches the input value
    dorpdownEle.className =
      "absolute  z-10 w-full bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 overflow-scroll  h-36";
    // diefault className of dropdownEle  is "hidden absolute  z-10 w-full bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"
    // remove the hidden from className to display teh dropdown
  }

  function dropdownMemberNameEle(name, id) {
    return `<li id =${id}>
              <p class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                ${name}
              </p>
          </li>`;
  }

  function newMemberEle(img, memberNo) {
    return `
    <img
      src=${img}
      class="w-10 h-10 rounded-full"
      alt="freind"
    />
    <input
      type="text"
      id="name"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="name"
      required
      name = ${memberNo + "_name"}
    />
    <input
      type="text"
      id="email"
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

  return (
    <>
      {showAddGroupPopUp ? (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center"
          aria-hidden="true"
        >
          <div className="relative p-4  h-full md:h-auto">
            <div className="relative bg-gray-300 rounded-lg shadow dark:bg-gray-700  max-h-[90vh] overflow-y-auto">
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
              <div className="p-6 flex gap-20">
                {/* left */}
                <div className=" ml-10  mt-20">
                  {/* <img
                    src={groupImg}
                    className="roundeds-lg h-36 w-36 "
                    alt="group"
                  /> */}
                  <div class="flex justify-center items-center w-full ">
                    <label
                      for="dropzone-file"
                      class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col justify-center items-center pt-5 px-2 pb-6">
                        <svg
                          ariaHidden="true"
                          class="mb-3 w-10 h-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          ></path>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span> or
                          drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input id="dropzone-file" type="file" class="hidden" />
                    </label>
                  </div>
                </div>
                {/* left end */}
                {/* right */}
                <div>
                  <h1 className="text-gray-500  text-2xl font-bold">
                    START A NEW GROUP
                  </h1>
                  {/* from */}
                  <form>
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
                      />
                    </div>
                    {/* group menmber */}
                    <div className="border-t-[1px] border-gray-500 pt-2">
                      <h1 className="text-gray-500   text-2xl font-bold">
                        Group Members
                      </h1>

                      <ul ref={groupListEle}>
                        {/*  */}
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
                              id="name"
                              class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="name"
                              required
                              onChange={(e) => handleDropdownMemberName(e)}
                            />
                            <div
                              id="dropdown"
                              class="hidden absolute  z-10 w-full bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 overflow-scroll  h-36"
                            >
                              <ul
                                class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownDefault"
                              >
                                <li>
                                  <p class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Dashboard
                                  </p>
                                </li>
                                <li>
                                  <p class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    Settings
                                  </p>
                                </li>
                              </ul>
                            </div>
                          </span>

                          <input
                            type="text"
                            id="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="email@.com"
                            required
                          />
                          <button
                            type="button"
                            onClick={(e) => e.target.parentElement.remove()}
                            class="text-red-700 border justify-center h-8  w-8 p-3 rounded-full font-bold border-red-700 hover:bg-red-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300   text-sm  text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
                          >
                            x
                          </button>
                        </li>
                      </ul>
                      <div
                        id="addPersion"
                        onClick={() => handleAddGroupMember()}
                        className="my-5 text-blue-500 text-md font-semibold cursor-pointer h-8 flex items-center justify-center  w-32 rounded-lg  hover:bg-[#c9cdd3]"
                      >
                        + Add a persion
                      </div>
                    </div>

                    <button
                      type="submit"
                      class="text-white font-bold   text-center    bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50  rounded-lg text-sm px-5 py-2.5  inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 mr-2 mb-2"
                    >
                      Save
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
                    </button>
                  </form>
                </div>
                {/* right end */}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default AddGroupPopUp;
