import React, { useState, useEffect } from "react";
import axios from "axios";
import { getUser } from "../services/user.service";

const API_URL = "http://localhost:3000";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [typeAdmin, setTypeAdmin] = useState(false);
  const [typeUser, setTypeUser] = useState(false);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      getUser({ headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
          // If the server verifies that the JWT token is valid
          const user = response.data;

          // Update state variables
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);

          if (user.user.role === "user") {
            setTypeUser(true);
          }
          if (user.user.role === "admin") {
            setTypeAdmin(true);
          }
        })
        .catch((error) => {
          // If the server sends an error response (invalid token)
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    // To log out the user, remove the token
    removeToken();
    // and update the state variables
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        typeAdmin,
        typeUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
