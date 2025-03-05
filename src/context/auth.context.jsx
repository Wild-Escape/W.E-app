import { createContext, use, useEffect, useState } from "react";
import { getAccessToken, setAccessToken } from "../store/AccesTokenStore";
import { getCurrentUserService } from "../services/user.service";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  const [typePartner, setTypePartner] = useState(false);
  const [typeUser, setTypeUser] = useState(false);

  const navigate = useNavigate();

  const getCurrentUser = (callback) => {
    getCurrentUserService()
    .then((res) => {
      setCurrentUser(res.user);
      setIsAuthLoaded(true);

      callback && callback();
    });
  };

  const login = (token) => {
    const navigateToProfile = () => {
      
    };
    setAccessToken(token);
    getCurrentUser(navigateToProfile);
    //guardar mi token en el localStorage
  };
  useEffect(()=>{
    if(currentUser?.role === "partner"){
      navigate("/partner/today")
    }
    if(currentUser?.role === "user"){
      navigate("/user/explore")}
  },[currentUser])

  useEffect(() => {
    if (getAccessToken()) {
      getCurrentUser();
    } else {
      setIsAuthLoaded(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        typePartner,
        typeUser,
        isAuthLoaded,
        login,
        getCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
