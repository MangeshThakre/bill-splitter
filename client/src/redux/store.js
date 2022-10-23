import { configureStore } from "@reduxjs/toolkit";
import global from "./globalSplice";
export default configureStore({
  reducer: {
    global,
  },
});
