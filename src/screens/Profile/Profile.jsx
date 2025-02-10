
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function Profile() {
    const {user} = useContext(AuthContext)
  return (
    <div>
      <h1>here is a profile</h1>
      <h2>helloooo {user.user.name}</h2>
    </div>
  );
}

export default Profile;
