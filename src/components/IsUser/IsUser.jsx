import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
 
function IsUser( { children } ) {
  
  const { isAuthLoaded, currentUser } = useContext(AuthContext);
 
 
  
 
  if (!isAuthLoaded || currentUser.role === "partner") {
 
    return <Navigate to="/login" />;
  } else {
 
    return children;
  }
}
 
export default IsUser;