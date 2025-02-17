import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";
 
function IsPartner( { children } ) {
  
  const { isLoggedIn, isLoading, currentUser } = useContext(AuthContext);
 
 
  if (isLoading) return <p>Loading ...</p>;
 
  if (!isLoggedIn || currentUser.role === "user") {

    return <Navigate to="/login" />;
  } else {
 
    return children;
  }
}
 
export default IsPartner;