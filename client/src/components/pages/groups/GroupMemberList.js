import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { friends } from "../../../redux/globalSplice.js";
export default function GroupMemberList({ currentMember }) {
  const dispatch = useDispatch();
  const USER = useSelector((state) => state.global.user);
  const FRIENDS = useSelector((state) => state.global.friends);
  const URL = process.env.REACT_APP_URL;
  const [isAddFriendLoading, setIsAddFriendLoading] = useState(false);
  const [isFriend, setIsFriend] = useState(
    FRIENDS.some((e) => e.email == currentMember.email)
  );

  async function handleAddFriend() {
    setIsAddFriendLoading(true);

    let user = {
      userName: USER.firstName + " " + USER.lastName,
      userEmail: USER.email,
      userId: USER._id,
    };
    try {
      const response = await axios({
        method: "post",
        url: URL + "/api/add_friend",
        data: {
          user,
          friend: { name: currentMember.name, email: currentMember.email },
        },
      });
      const { friendsArr } = await response.data;
      dispatch(friends(friendsArr));
      setIsFriend(true);
      setIsAddFriendLoading(false);
    } catch (error) {
      setIsAddFriendLoading(false);
      console.log(error);
      alert(error.message);
    }
  }
  function nameSplice(name) {
    if (name.length > 15) return name.slice(0, 15) + "...";
    else return name;
  }

  function handleAddFriendButton() {
    if (!isFriend)
      return (
        <button
          type="button"
          className="py-2 px-3 text-xs flex items-center font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => handleAddFriend()}
        >
          Add firend
          {isAddFriendLoading ? (
            <svg
              aria-hidden="true"
              role="status"
              className=" inline ml-3 w-4 h-4 text-white animate-spin"
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
    else if (isFriend) {
      return <p className="font-semibold text-blue-500">🤪 Friend</p>;
    } else return null;
  }

  return (
    <div className=" items-center flex justify-between  cursor-pointer p-2 pl-3 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
      {/* group member name */}
      <div className="flex gap-3">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <p className="font-semibold text-gray-600">
          {USER.email == currentMember.email
            ? "You"
            : nameSplice(currentMember.name)}
        </p>
      </div>
      {/* dropdown */}
      {USER.email === currentMember.email ? null : handleAddFriendButton()}
    </div>
  );
}
