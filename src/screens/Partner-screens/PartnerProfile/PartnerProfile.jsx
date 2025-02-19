
import { useContext } from "react";

import { AuthContext } from "../../../context/auth.context";

function PartnerProfile() {
    const {currentUser, logOutUser} = useContext(AuthContext)
  return (
    <div className="p-4">
      <h1>Profile</h1>
      <h2>Hello: {currentUser.name}</h2>
      <p>Logged in as: {currentUser.role}</p>
      <button onClick={logOutUser} className="btn btn-danger me-2">Logout</button>
     
    </div>
  );
}

export default PartnerProfile;