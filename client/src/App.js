import "./App.css";
import Deshbord from "./components/pages/dashbord/Dashbord.js";
import Navbar from "./components/navbar/Navbar";
import SignIn_singUp from "./components/seginin_signup/Index.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import { user } from "./redux/globalSplice.js";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import loadingSvg from "./asset/loading.svg";
import Home from "./components/pages/Home/Home.js";
import Sidebar from "./components/sideBar/sidebar";
// pages
import UserPage from "./components/pages/userpage/UserPage";
import AllExpense from "./components/pages/allExpenses/AllExpense";
import Group from "./components/pages/groups/Group.js";
import Friend from "./components/pages/friends/Friends.js";

import { useNavigate } from "react-router-dom";
function App() {
  const dispatch = useDispatch();
  const [isFetchUserLoading, setIsFetchUserIsLoading] = useState(false);
  const URL = process.env.REACT_APP_URL;
  const USER = useSelector((state) => state.global.user);
  const navigate = useNavigate();
  async function fetchUser() {
    try {
      setIsFetchUserIsLoading(true);
      const response = await axios({
        method: "get",
        url: URL + "/auth/login/success",
        withCredentials: true
      });
      const data = await response.data.user;
      dispatch(user(data));
      setIsFetchUserIsLoading(false);
      navigate("/all_expenses");
    } catch (error) {
      setIsFetchUserIsLoading(false);
      // alert(error.response.data.message);
      console.log(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="App">
      {isFetchUserLoading ? (
        <div className="h-[100vh] flex justify-center items-center w-full">
          <img src={loadingSvg} alt="loading" />
        </div>
      ) : (
        <>
          <Navbar loading={isFetchUserLoading} />
          {Object.keys(USER).length < 1 ? (
            //  sigin signup
            <Routes>
              <Route
                exact
                path="/signin"
                element={<SignIn_singUp page={"signin"} />}
              />
              <Route
                exact
                path="/signup"
                element={<SignIn_singUp page={"signup"} />}
              />{" "}
              <Route
                exact
                path="/forget_password"
                element={<SignIn_singUp page={"forget_password"} />}
              />
              <Route exect path="/" element={<Home />} />
            </Routes>
          ) : (
            <div className="pt-20 h-full flex">
              <Sidebar />
              <div className="w-full flex ">
                <Routes>
                  <Route path="/all_expenses" element={<AllExpense />} />
                  <Route path="/users" element={<UserPage />} />
                  <Route path="/group/:id" element={<Group />} />
                  <Route path="/friend/:email" element={<Friend />} />
                  <Route path="*" element={<div>page not found</div>} />
                </Routes>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
