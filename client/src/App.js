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

import Sidebar from "./components/sideBar/sidebar";
// pages
import UserPage from "./components/pages/userpage/UserPage";
import Dashbord from "./components/pages/dashbord/Dashbord.js";
import AllExpense from "./components/pages/allExpenses/AllExpense";
import RecentAcitvity from "./components/pages/recentAcitvity/RecentAcitvity";
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
        withCredentials: true,
      });
      const data = await response.data.user;
      dispatch(user(data));
      setIsFetchUserIsLoading(false);
      navigate("/dashbord");
    } catch (error) {
      setIsFetchUserIsLoading(false);
      // console.log(error);
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
              />
            </Routes>
          ) : (
            <div className="pt-20 h-full flex">
              <Sidebar />
              <div className="w-full  flex">
                <Routes>
                  <Route path="/dashbord" element={<Dashbord />} />
                  <Route path="/recent-acitvity" element={<RecentAcitvity />} />
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
