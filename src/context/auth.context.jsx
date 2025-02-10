import React, { useState, useEffect } from "react";
import axios from "axios";


const API_URL = "http://localhost:3000";
 
const AuthContext = React.createContext();
 
function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [typeAdmin, setTypeAdmin] = useState(false)
  const [typeUser, setTypeUser] = useState(false)

  
  const storeToken = (token) => { 
    console.log("We are in store token-->", token)      
    localStorage.setItem('authToken', token);
  }


  const authenticateUser = () => { 
           
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    console.log("we are in authenticate-->")    
    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios.get(
        `${API_URL}/me`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        // If the server verifies that the JWT token is valid  
        const user = response.data;
        console.log("backend response--->",response.data)
       // Update state variables        
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);   
        console.log("user role--->", user.user.role)     
        if (user.user.role === "user"){
            setTypeUser(true)
        }
        if (user.user.role === "admin"){
            setTypeAdmin(true)
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
  }

  const removeToken = () => {                    // <== ADD
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");
  }
 
 
  const logOutUser = () => {                   // <== ADD    
    // To log out the user, remove the token
    removeToken();
    // and update the state variables    
    authenticateUser();
  }  

  useEffect(() => {                 //  <==  ADD                                   
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
        typeUser    
      }}
    >
      {props.children} 
    </AuthContext.Provider>
  )
} 
 
export { AuthProviderWrapper, AuthContext };