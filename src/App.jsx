import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import Login from "./screens/Login/Login";
import Register from "./screens/Register/Register";
import RegisterAdmin from "./screens/Register/RegisterAdmin";
import RegisterUser from "./screens/Register/RegisterUser";
import Profile from "./screens/Profile/Profile";

function App() {
  

  return (
    <>
      <NavBar />
      <Routes>
        <Route
        path="/"
        element={<Home/>}
        />
        <Route
        path="/login"
        element={<Login/>}
        />
        <Route
        path="/register"
        element={<Register/>}
        />
        <Route
        path="/register/admin"
        element={<RegisterAdmin/>}
        />
        <Route
        path="/register/user"
        element={<RegisterUser/>}
        />
        <Route
        path="/profile"
        element={<Profile/>}
        />
      </Routes>
    </>
  );
}

export default App;
