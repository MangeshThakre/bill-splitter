import React from "react";

function RecentAcitvity() {
  return (
    <div id="recentAcitvity " className="flex-1 mx-2 shadow-xl">
      <div id="dashbordHeader" className="w-full    bg-gray-200">
        {/* dashbord   heading 01*/}
        <div className=" flex justify-end h-14 items-center gap-3 px-4">
          <h1 className="flex-1 ml-auto  text-lg font-semibold ">
            Recent Acitvity
          </h1>
        </div>
      </div>
    </div>
  );
}

export default RecentAcitvity;
