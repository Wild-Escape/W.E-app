import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
 
function IsUser( { children } ) {
  
  const { isLoggedIn, isLoading, currentUser } = useContext(AuthContext);
 
 
  if (isLoading) return <p>Loading ...</p>;
 
  if (!isLoggedIn || currentUser.role === "partner") {
 
    return <Navigate to="/login" />;
  } else {
 
    return children;
  }
}
 
export default IsUser;