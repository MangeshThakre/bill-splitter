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
              to={type == "freind" ? "/freind" : "/group/" + e._id}
              className="flex gap-3 items-center p-2 pl-3 w-full text-base font-normal text-gray-900 rounded-lg transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
            >
              <img
                src={groupImg(e.groupType)}
                className="w-8 h-8 rounded-full"
                alt="img"
              />
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
