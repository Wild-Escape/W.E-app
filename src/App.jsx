import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import RegisterAdmin from "./screens/Register/RegisterAdmin";
import RegisterUser from "./screens/Register/RegisterUser";
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
      </Routes>
    </>
  );
}

export default App;
