import { useEffect, useState } from "react";
import axios from "axios";
import { user, groups, friends } from "../../redux/globalSplice.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// popup component
import LogoutPopUp from "../popup/LogoutPopUp.js";
import AddFriendPopUp from "../popup/AddFriendPopUp.js";
import AddGroupPopUp from "../popup/addGroupPopup/AddGroupPopUp.js";
// icon
import addIcon from "../../asset/add.png";
import arrowDown from "../../asset/arrowDown.png";
import arrowRight from "../../asset/arrowRight.png";

//// components
// skeleton list
import ListSkeleton from "./ListSkeleton.js";
// list with info
import ListWithInfo from "./ListWithInfo.js";

function Sidebar() {
  const dispatch = useDispatch();
  const URL = process.env.REACT_APP_URL;

  //  redux variables
  const USER = useSelector((state) => state.global.user);
  const GROUPS = useSelector((state) => state.global.groups);
  const FRIENDS = useSelector((state) => state.global.friends);

  // toggal list
  const [showGroupList, setShowGroutList] = useState(false);
  const [showFriendList, setShowFriendList] = useState(false);

  // show popup
  const [loguotPopUp, setLoguotPopu] = useState(false);
  const [showAddFreindpopUp, setShowAddFreindpopUp] = useState(false);
  const [showAddGroupPopUp, setShowGroupPopUp] = useState(false);

  // loading
  const [isGetGropusLoading, setIsGetGroupLoading] = useState(false);
  const [isGetFriendsLoading, setIsGetFriendLoading] = useState(false);

  useEffect(() => {
    getGroups();
    getFriends();
  }, []);

  async function getGroups() {
    setIsGetGroupLoading(true);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/get_groups?userEmail=" + USER.email
      });
      const data = await response.data.data;
      if (data) dispatch(groups(data));
      setIsGetGroupLoading(false);
    } catch (error) {
      setIsGetGroupLoading(false);
      console.log(error);
    }
  }

  async function getFriends() {
    setIsGetFriendLoading(false);
    try {
      const response = await axios({
        method: "get",
        url: URL + "/api/get_friends?userId=" + USER._id
      });
      const data = await response.data.data;
      if (data) dispatch(friends(data));
      setIsGetGroupLoading(false);
    } catch (error) {
      setIsGetGroupLoading(false);
      console.log(error);
    }
  }

  return (
    <>
      <aside className="w-80 h-full" aria-label="Sidebar">
        <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800 h-full pt-10">
          <ul className="space-y-2  flex   flex-col   h-full">
            {/* all expances   */}
            <li>
              <Link
                to="all_expenses"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                  <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">
                  All expenses
                </span>
              </Link>
            </li>
            {/* all expances   */}

            {/* group */}
            <li>
              {/* group dropdown button */}
              <button
                type="button"
                onClick={() => setShowGroutList((prev) => !prev)}
                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Groups
                </span>
                {showGroupList ? (
                  <img className="w-3 mr-2" src={arrowDown} alt="arrow" />
                ) : (
                  <img className="h-3 mr-2" src={arrowRight} alt="arrow" />
                )}
              </button>
              {/* group dropdown button end */}

              {showGroupList ? (
                <ul
                  id="dropdown-example"
                  className="p-1 flex flex-col gap-2  rounded-md mt-1 bg-[#80808021]"
                >
                  {/* add group dutton */}
                  <li>
                    <a
                      href="#"
                      onClick={() => setShowGroupPopUp((prev) => !prev)}
                      className="flex items-center p-2 pl-4   gap-7 w-full text-base font-normal  hover:text-blue-500  text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <img src={addIcon} className="w-3 ml-2" alt="add" />
                      Add Group
                    </a>
                  </li>
                  {/* add group dutton  end*/}

                  {/* group list */}
                  {isGetGropusLoading ? (
                    <>
                      <li>
                        <ListSkeleton />
                      </li>
                      <li>
                        <ListSkeleton />
                      </li>
                    </>
                  ) : (
                    <ListWithInfo listInfo={GROUPS} type={"group"} />
                  )}
                  {/* group list end */}
                </ul>
              ) : null}
            </li>
            {/* group end */}

            {/* Friend  */}
            <li>
              {/* show friend list button */}
              <button
                type="button"
                onClick={() => setShowFriendList((prev) => !prev)}
                className="flex items-center p-2 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-blue-100 dark:text-white dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 text-left whitespace-nowrap">
                  Friends
                </span>

                {showFriendList ? (
                  <img className="w-3 mr-2" src={arrowDown} alt="arrow" />
                ) : (
                  <img className="h-3 mr-2" src={arrowRight} alt="arrow" />
                )}
              </button>
              {/*  show freind list button */}

              {/* friend list  */}
              {showFriendList ? (
                <ul
                  id="dropdown-example"
                  className="p-1 flex flex-col gap-2 rounded-md mt-1 bg-[#80808021]"
                >
                  {/* add friend */}
                  <li>
                    <a
                      href="#"
                      onClick={() => setShowAddFreindpopUp((prev) => !prev)}
                      className="flex items-center p-2 pl-4 gap-7 w-full text-base font-normal  hover:text-blue-500  text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                      <img src={addIcon} className="w-3 ml-2" alt="add" />
                      Add Firend
                    </a>
                  </li>
                  {/* add friend end */}

                  {/* add friend list */}
                  {isGetFriendsLoading ? (
                    <>
                      <li>
                        <ListSkeleton />
                      </li>
                      <li>
                        <ListSkeleton />
                      </li>
                    </>
                  ) : (
                    <ListWithInfo listInfo={FRIENDS} type={"friend"} />
                  )}
                  {/* add friend list end*/}
                </ul>
              ) : null}
              {/* friend list end */}
            </li>
            {/* friend */}

            {/* user */}
            <li>
              <Link
                to="users"
                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-blue-100 dark:hover:bg-gray-700"
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">User</span>
              </Link>
            </li>
            {/* user end */}

            {/* log out */}
            <li className=" mt-auto flex-1 flex items-end">
              <a
                href="#"
                className=" w-full flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                type="button"
                data-modal-toggle="popup-modal"
                onClick={() => setLoguotPopu(true)}
              >
                <svg
                  aria-hidden="true"
                  className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="flex-1 ml-3 whitespace-nowrap">Log out</span>
              </a>
            </li>
            {/* logout end */}
          </ul>
        </div>
      </aside>

      {/* log out pop-up */}
      <LogoutPopUp setLoguotPopu={setLoguotPopu} loguotPopUp={loguotPopUp} />

      {/* Add freind pop-up */}
      <AddFriendPopUp
        showAddFreindpopUp={showAddFreindpopUp}
        setShowAddFreindpopUp={setShowAddFreindpopUp}
      />

      {/* add group pop-up */}
      <AddGroupPopUp
        showAddGroupPopUp={showAddGroupPopUp}
        setShowGroupPopUp={setShowGroupPopUp}
      />
    </>
  );
}

export default Sidebar;
