import React, { useState } from "react";

function AlertComponent(alert, setAlert) {
  if (alert.showAlert) {
    setTimeout(() => setIsShowAlert(false), alert.time);
  }

  return (
    <>
      {alert.showAlert ? (
        <dir className="Alert absolute bottom-0 ">
          <div
            className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg dark:bg-yellow-200 dark:text-yellow-800"
            role="alert"
          >
            <span className="font-medium mr-4">Warning alert!</span>
            {alert.alertMessage}
          </div>
        </dir>
      ) : null}
    </>
  );
}

export default AlertComponent;
