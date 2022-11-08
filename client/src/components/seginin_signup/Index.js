import React from "react";
import Signin from "./signin/signin";
import Signup from "./signup/signup.js";
import { useState } from "react";
import ForgetPassword from "./ForgetPassword";
function Index({ page }) {
  const [alertPopUp, setAlertPopUp] = useState({
    display: false,
    alertMessage: "",
    type: "",
  });

  function handleAlert(display, alertMessage, type) {
    setAlertPopUp({ display, alertMessage, type });
    setTimeout(
      () => setAlertPopUp({ display: false, alertMessage: "", type: "" }),
      5000
    );
  }

  return (
    <div className="  flex justify-center  h-[100%] w-[90%]">
      <div className="sm:hidden md:block   flex  justify-center items-center md:w-1/2 ">
        left
      </div>
      <div className=" md:w-1/2 mt-20  flex justify-center items-center ">
        {page === "signin" ? (
          <Signin handleAlert={handleAlert} setAlertPopUp={setAlertPopUp} />
        ) : null}
        {page === "signup" ? (
          <Signup handleAlert={handleAlert} setAlertPopUp={setAlertPopUp} />
        ) : null}
        {page == "forget_password" ? (
          <ForgetPassword handleAlert={handleAlert} />
        ) : null}
      </div>
      {/* alert */}
      {alertPopUp.display ? (
        <dir className="Alert absolute bottom-0 ">
          <div
            className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
            role="alert"
          >
            <span className="font-medium">Warning alert!</span>
            {alertPopUp.alertMessage}
          </div>
        </dir>
      ) : null}
    </div>
  );
}

export default Index;
