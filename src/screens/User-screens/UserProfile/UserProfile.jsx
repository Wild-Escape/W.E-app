import { useContext } from "react";
import { logout } from "../../../store/AccesTokenStore";
import { AuthContext } from "../../../context/auth.context";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaIdBadge,
  FaRegCalendarCheck,
  FaUserEdit,
  FaRegHeart
} from "react-icons/fa";

function UserProfile() {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg border-0">
            {/* Profile Header */}
            <div className="card-header bg-primary text-white rounded-top">
              <div className="d-flex align-items-center gap-3">
                <FaUserCircle size="2.5em" />
                <h1 className="mb-0">Profile</h1>
              </div>
            </div>

            {/* Profile Body */}
            <div className="card-body">
              <div className="row align-items-center mb-4">
                {/* Profile Picture Placeholder */}
                <div className="col-md-4 text-center mb-3 mb-md-0">
                  <div
                    className="avatar-placeholder rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mx-auto"
                    style={{ width: "120px", height: "120px" }}
                  >
                    <span className="display-4">{currentUser.name[0]}</span>
                  </div>
                </div>

                {/* User Info */}
                <div className="col-md-8">
                  <h2 className="mb-3">
                    <FaIdBadge className="me-2" />
                    {currentUser.name}
                  </h2>

                  <div className="d-flex flex-wrap gap-4">
                    <div className="badge bg-info text-dark">
                      <FaRegCalendarCheck className="me-2" />
                      Member since:{" "}
                      {new Date(currentUser.createdAt).toLocaleDateString()}
                    </div>
                    <div className="badge bg-warning text-dark">
                      Role: {currentUser.role}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info Section */}
              <div className="border-top pt-3">
                <h5 className="mb-3">Account Details</h5>
                <dl className="row">
                  <dt className="col-sm-4">Email:</dt>
                  <dd className="col-sm-8">{currentUser.email}</dd>

                  {currentUser.phone && (
                    <>
                      <dt className="col-sm-4">Phone:</dt>
                      <dd className="col-sm-8">{currentUser.phone}</dd>
                    </>
                  )}
                </dl>
              </div>
            </div>

            {/* Footer with Logout */}
            <div className="card-footer bg-light d-flex justify-content-end">
            <button className="btn btn-info d-flex align-items-center me-3">
                <FaUserEdit className="me-2" />
                Edit Profile
              </button> 
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
