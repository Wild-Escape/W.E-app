import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
 
function IsPartner( { children } ) {
  
  const { isAuthLoaded,  currentUser } = useContext(AuthContext);
 
 
 
  if (!isAuthLoaded || currentUser.role === "user") {

    return <Navigate to="/login" />;
  } else {
 
    return children;
  }
}
 
export default IsPartner;