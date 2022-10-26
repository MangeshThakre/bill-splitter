import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../sideBar/sidebar";

function Group() {
  const { id } = useParams();
  console.log(id);
  //   console.log(Object.fromEntries([...searchParams]));
  return (
    <>
      <div id="group" className="flex-1 mx-2 shadow-xl">
        hello
      </div>
      <Sidebar />
    </>
  );
}

export default Group;
