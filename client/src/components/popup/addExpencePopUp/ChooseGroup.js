import { useSelector } from "react-redux";
import Home from "../../../asset/home.jpg";
import Other from "../../../asset/others.jpg";
import Couple from "../../../asset/couple.jpg";
import Trip from "../../../asset/trip.jpg";
function ChooseGroup({ setSecondaryPopUp, group, setGroup }) {
  const GROUPS = useSelector((state) => state.global.groups);

  function groupImg(groupType) {
    if (groupType == "Home") return Home;
    if (groupType == "Trip") return Trip;
    if (groupType == "Couple") return Couple;
    if (groupType == "Other") return Other;
  }

  function handleSelectGroup(group) {
    setGroup(GROUPS.find((e) => e._id === group._id));
  }
  return (
    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
      <div className=" bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="">
          <div className="relative p-6 border-b-2 border-gray-300 pb-2 bg-slate-200 rounded-t-lg">
            <h1 className="text-xl font-bold text-gray-500">
              Choose background
            </h1>
            {/* close button */}
            <button
              type="button"
              onClick={() => setSecondaryPopUp(null)}
              className="absolute top-5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-300 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
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
          </div>
          {/* member list */}
          <ul className="pb-1">
            {GROUPS.map((e, i) => {
              return (
                <li
                  key={i}
                  onClick={() => handleSelectGroup(e)}
                  className="p-3 hover:bg-gray-100 cursor-pointer rounded-lg m-1 flex items-center gap-5"
                >
                  <img
                    src={groupImg(e.groupType)}
                    className="w-8 h-8"
                    alt={e.groupType}
                  />
                  {e.groupName}
                </li>
              );
            })}
          </ul>
          {/* member list end */}
        </div>
      </div>
    </div>
  );
}

export default ChooseGroup;
