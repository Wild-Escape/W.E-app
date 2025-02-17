import React, { useState, useEffect } from "react";
import { getCurrentUser } from "../services/user.service";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [typePartner, setTypePartner] = useState(false);
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
      getCurrentUser({ headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
          // If the server verifies that the JWT token is valid
          const user = response.data.user;
          

          // Update state variables
          setIsLoggedIn(true);
          setIsLoading(false);
          setCurrentUser(user);
          console.log("in authenticaate", user)

          if (user.role === "user") {
            setTypeUser(true);
          }
          if (user.role === "partner") {
            setTypePartner(true);
          }
        })
        .catch((error) => {
          // If the server sends an error response (invalid token)
          console.log("error", error)
          // Update state variables
          setIsLoggedIn(false);
          setIsLoading(false);
          setCurrentUser(null);
        });
    } else {
      // If the token is not available (or is removed)
      setIsLoggedIn(false);
      setIsLoading(false);
      setCurrentUser(null);
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
        currentUser,
        storeToken,
        authenticateUser,
        logOutUser,
        typePartner,
        typeUser,
        
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
