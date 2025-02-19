import { useState } from "react";
import { Route, Routes } from "react-router-dom";

//USER SCREENS
import IsUser from "./components/IsUser/IsUser";
import Explore from "./screens/User-screens/Explore/Explore";
import Favorites from "./screens/User-screens/Favorites/Favorites";
import UserExperiences from "./screens/User-screens/UserExperiences/UserExperiences";
import UserMessages from "./screens/User-screens/UserMessages/UserMessages";
import UserProfile from "./screens/User-screens/UserProfile/UserProfile";

//PARTNER SCREENS
import IsPartner from "./components/IsPartner/IsPartner";
import Today from "./screens/Partner-screens/Today/Today";
import Calendar from "./screens/Partner-screens/Calendar/Calendar";
import Postings from "./screens/Partner-screens/Postings/Experience";
import CreatePost from "./screens/Partner-screens/Postings/CreatePost/CreateExperienceForm";
import PartnerMessages from "./screens/Partner-screens/PartnerMessages/PartnerMessages";
import PartnerProfile from "./screens/Partner-screens/PartnerProfile/PartnerProfile";

//COMMON COMPONENTS/SCREENS
import Home from "./screens/Home/Home";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import RegisterUser from "./screens/Register/RegisterUser";
import RegisterPartner from "./screens/Register/RegisterPartner";
import NavBar from "./components/NavBar/NavBar";

import IsAnon from "./components/IsAnon/IsAnon";


function App() {
  return (
    <>
    {/* COMMON ROUTES */}
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <IsAnon>
              <Login />
            </IsAnon>
          }
        />
        <Route
          path="/register"
          element={
            <IsAnon>
              <Register />
            </IsAnon>
          }
        />
        <Route
          path="/register/partner"
          element={
            <IsAnon>
              <RegisterPartner />
            </IsAnon>
          }
        />
        <Route
          path="/register/user"
          element={
            <IsAnon>
              <RegisterUser />
            </IsAnon>
          }
        />
      {/* USER ROUTES */}
      <Route
          path="/user/explore"
          element={
            <IsUser>
              <Explore />
            </IsUser>
          }
        />
         <Route
          path="/user/favorites"
          element={
            <IsUser>
              <Favorites />
            </IsUser>
          }
        />
         <Route
          path="/user/experiences"
          element={
            <IsUser>
              <UserExperiences />
            </IsUser>
          }
        />
         <Route
          path="/user/messages"
          element={
            <IsUser>
              <UserMessages />
            </IsUser>
          }
        />
         <Route
          path="/user/profile"
          element={
            <IsUser>
              <UserProfile />
            </IsUser>
          }
        />
        {/* PARTNER SCREENS */}
        <Route
          path="/partner/today"
          element={
            <IsPartner>
              <Today />
            </IsPartner>
          }
        />
        <Route
          path="/partner/calendar"
          element={
            <IsPartner>
              <Calendar />
            </IsPartner>
          }
        />
        <Route
          path="/partner/postings"
          element={
            <IsPartner>
              <Postings />
            </IsPartner>
          }
        />
        <Route
          path="/partner/create-post"
          element={
            <IsPartner>
              <CreatePost />
            </IsPartner>
          }
        />
        <Route
          path="/partner/messages"
          element={
            <IsPartner>
              <PartnerMessages />
            </IsPartner>
          }
        />
        <Route
          path="/partner/profile"
          element={
            <IsPartner>
              <PartnerProfile />
            </IsPartner>
          }
        />
      </Routes>
    </>
  );
}

export default App;
