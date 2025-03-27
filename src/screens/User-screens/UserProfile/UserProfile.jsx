import { useContext } from "react";
import { logout } from "../../../store/AccesTokenStore";
import { AuthContext } from "../../../context/auth.context";
import { Link } from "react-router-dom";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaIdBadge,
  FaRegCalendarCheck,
  FaUserEdit,
  FaRegHeart,
  FaUserAstronaut
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdCardMembership } from "react-icons/md";
import './UserProfile.css'


function UserProfile() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div id="profile-container">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div>
            <h1 className="mb-0">Profile</h1>
            {/* Profile Body */}
            <div className="card-body mt-3">
              <div className="row align-items-center">
                {/* Profile Picture Placeholder */}
                <div className="col-md-4 text-center mb-3 mb-md-0">
                  <img
                    src={currentUser.profileImage}
                    alt=""
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                    }}
                  />
                </div>

                {/* User Info */}
                <div className="col-md-8 ms-3">
                  <h2 className="mb-3">
                    Hello !! {currentUser.name}
                  </h2>
                </div>
              </div>

              {/* Additional Info Section */}
              <div className="border-top p-3 border-bottom">
                <h5 className="mb-3">Account Details</h5>
                <dl className="row">
                  <dt className="col-sm-4 d-flex align-items-center"> <MdEmail style={{marginRight:"8px"}} /> Email:</dt>
                  <dd className="col-sm-8">{currentUser.email}</dd>
                </dl>
                <dl className="row">
                  <dt className="col-sm-4 d-flex align-items-center"> <MdCardMembership style={{marginRight:"8px"}} />Member since:</dt>
                  <dd className="col-sm-8"> {new Date(currentUser.createdAt).toLocaleDateString()}</dd>
                </dl>
                <dl className="row">
                  <dt className="col-sm-4 d-flex align-items-center"> <FaUserAstronaut style={{marginRight:"8px"}} />Role:</dt>
                  <dd className="col-sm-8">{currentUser.role}</dd>
                </dl>
                
              </div>
            </div>

            {/* Footer with Logout */}
            <div className="card-footer  d-flex justify-content-end mt-4">
              <Link
                className="btn btn-primary d-flex align-items-center me-3"
                to={`/user/edit/${currentUser.id}`}
              >
                <FaUserEdit className="me-2" />
                Edit Profile
              </Link>
              <button
                onClick={logout}
                className="btn btn-danger d-flex align-items-center"
              >
                <FaSignOutAlt className="me-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
