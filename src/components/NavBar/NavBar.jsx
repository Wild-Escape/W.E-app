import "./NavBar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function NavBar() {
  const { isLoggedIn, currentUser } = useContext(AuthContext);

  return (
    <nav className="navbar fixed-bottom  bg-body-tertiary">
      <div className="container-fluid ">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row justify-content-around w-100">
          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </>
          )}
          {isLoggedIn && currentUser.role === "user" && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/user/explore"
                >
                  Explore
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/user/favorites"
                >
                  Favorites
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/user/experiences"
                >
                  My experiences
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/user/messages"
                >
                  Messages
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/user/profile"
                >
                  Profile
                </Link>
              </li>
            </>
          )}

          {isLoggedIn && currentUser?.role === "partner" && (
            <>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/partner/today"
                >
                  Today
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/partner/calendar"
                >
                  Calendar
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/partner/postings"
                >
                  Posting
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/partner/messages"
                >
                  Messages
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/partner/profile"
                >
                  Profile
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
