import { Link, NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function NavBar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="nav-link active" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isLoggedIn && (
              <>
                <li className="nav-item">We are looged in :V</li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    onClick={logOutUser}
                    className="nav-link active"
                    aria-current="page"
                    to="/profile"
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
            {user.user.role === "user" && (
                <>
                 <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/favorites"
                  >
                    See Favorites
                  </Link>
                </li>
                </>
            )}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/login"
                  >
                    Log In
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
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
