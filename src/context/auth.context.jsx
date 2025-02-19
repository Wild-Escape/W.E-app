import { createContext, useEffect, useState } from "react";
import { getAccessToken, setAccessToken } from "../store/AccesTokenStore";
import  {getCurrentUserService} from "../services/user.service"
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
  }

  const login = (token) => {
    
    const navigateToProfile = () => {
      console.log("checking if there is current user in navigate -->>", currentUser)
      navigate('/partner/profile');
      
      // if (currentUser.role === "user"){
      //   navigate('/user/profile');
      // } 
      // if (currentUser.role === "partner"){
      //   navigate('/partner/profile');
      // } 
    }
    //guardar mi token en el localStorage
    setAccessToken(token);
    getCurrentUser(navigateToProfile);
  }

  useEffect(() => {
    if (getAccessToken()) {
      getCurrentUser()
    } else {
      setIsAuthLoaded(true)
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        typePartner,
        typeUser,
        isAuthLoaded,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
