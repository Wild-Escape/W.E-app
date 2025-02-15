
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Profile() {
    const {currentUser, logOutUser} = useContext(AuthContext)
  return (
    <div className="p-4">
      <h1>Profile</h1>
      <h2>Hello: {currentUser.name}</h2>
      <p>Logged in as: {currentUser.role}</p>
      <button onClick={logOutUser} className="btn btn-danger">Logout</button>
    </div>
  );
}

export default Profile;
