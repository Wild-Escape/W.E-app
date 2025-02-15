import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";

function NavBar() {
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <nav className="navbar fixed-bottom  bg-body-tertiary">
      <div className="container-fluid ">
        
        
        
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex flex-row justify-content-around w-100">
            {isLoggedIn && user?.user?.role === "user" && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/user/reservations"
                  >
                    Reservations
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/"
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/user/liked"
                  >
                    Liked
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && user?.user?.role === "partner" && (
              <>
               <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/experiences"
                  >
                    Experiences
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/calendar"
                  >
                    Calendar
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/calendar"
                  >
                    Messages
                  </Link>
                </li>
              </>
            )}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/profile"
                  >
                    Profile
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
    </nav>
  );
}

export default NavBar;
