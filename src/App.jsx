import { useState } from "react";
import { Route, Routes } from "react-router-dom";

//USER SCREENS
import Home from "./screens/Home/Home";
import RegisterUser from "./screens/Register/RegisterUser";
import Liked from "./screens/User-screens/Liked/Liked";
import Reservations from "./screens/User-screens/Reservations/Reservations";

//ADMIN SCREENS
import RegisterAdmin from "./screens/Register/RegisterAdmin";
import CreateExperienceForm from "./screens/Admin-screens/CreateExperienceForm/CreateExperienceForm";

//COMMON COMPONENTS/SCREENS
import Register from "./screens/Register/Register";
import NavBar from "./components/NavBar/NavBar";
import Login from "./screens/Login/Login";
import Profile from "./screens/Profile/Profile";


import IsAnon from "./components/IsAnon/IsAnon";
import IsPrivate from "./components/IsPrivate/IsPrivate";

function App() {
  return (
    <>
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
          path="/register/admin"
          element={
            <IsAnon>
              <RegisterAdmin />
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
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Profile />
            </IsPrivate>
          }
        />
         <Route
          path="/user/liked"
          element={
            <IsPrivate>
              <Liked />
            </IsPrivate>
          }
        />
         <Route
          path="/user/reservations"
          element={
            <IsPrivate>
              <Reservations />
            </IsPrivate>
          }
        />
      </Routes>
    </>
  );
}

export default App;
