import React from "react";

// Image
import Home from "../../asset/home.jpg";
import Couple from "../../asset/couple.jpg";
import Trip from "../../asset/trip.jpg";
import Other from "../../asset/others.jpg";
import { Link } from "react-router-dom";

function ListWithInfo({ listInfo, type }) {
  function groupImg(type) {
    if (type == "Home") return Home;
    if (type == "Trip") return Trip;
    if (type == "Couple") return Couple;
    if (type == "Other") return Other;
  }

  return (
    <>
      {listInfo.map((e, i) => {
        return (
          <li key={i}>
            <Link
              to={type == "friend" ? "/friend/" + e.email : "/group/" + e._id}
              className="flex gap-3 items-center p-2 pl-3 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              {type == "friend" ? (
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
              ) : (
                <img
                  src={groupImg(e.groupType)}
                  className="w-8 h-8 rounded-full"
                  alt="img"
                />
              )}

              <p className="font-semibold text-gray-600">
                {type == "friend" ? e.name : e.groupName}
              </p>
            </Link>
          </li>
        );
      })}
    </>
  );
}

export default ListWithInfo;
