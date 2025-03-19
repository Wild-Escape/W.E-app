import "./NavBar.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { FaCompass, FaHeart, FaUser, FaPlus, FaCalendar, FaComment,FaPen} from "react-icons/fa";
import { BsFillSuitcase2Fill } from "react-icons/bs";

function NavBar() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();

  const getLinkClass = (path) => {
    return location.pathname === path ? "nav-link active" : "nav-link";
  };

  return (
    <nav id="nav-overwrite" className="navbar fixed-bottom d-block  navbar-light bg-white border-top">
      <div className="container">
        <ul id="ul" className="navbar-nav d-flex flex-row  w-100">
          {!currentUser && (
            <>
              <li className="nav-item  text-center">
                <Link to="/common/login" className={getLinkClass("/common/login")}>
                  <div className="d-flex  align-items-center">
                    <FaUser className="mb-1" size={20} />
                    <span className="nav-text">Login</span>
                  </div>
                </Link>
              </li>
              <li className="nav-item  text-center">
                <Link to="/register" className={getLinkClass("/register")}>
                  <div className="d-flex  align-items-center">
                    <FaPlus className="mb-1" size={20} />
                    <span className="nav-text">Register</span>
                  </div>
                </Link>
              </li>
            </>
          )}

          {currentUser?.role === "user" && (
            <>
              <NavItem to="/user/explore" icon={<FaCompass />} label="Explore" />
              <NavItem to="/user/favorites" icon={<FaHeart />} label="Favorites" />
              <NavItem to="/user/experiences" icon={<BsFillSuitcase2Fill />} label="My" />
              <NavItem to="/user/messages" icon={<FaComment />} label="Messages" />
              <NavItem to="/user/profile" icon={<FaUser />} label="Profile" />
            </>
          )}

          {currentUser?.role === "partner" && (
            <>
              <NavItem to="/partner/today" icon={<FaPen />} label="Action" />
              <NavItem to="/partner/calendar" icon={<FaCalendar />} label="Calendar" />
              <NavItem to="/partner/experiences" icon={<FaPlus />} label="Posting" />
              <NavItem to="/partner/messages" icon={<FaComment />} label="Messages" />
              <NavItem to="/partner/profile" icon={<FaUser />} label="Profile" />
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

const NavItem = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li className="nav-item flex-grow-1 text-center">
      <Link to={to} className={`nav-link ${isActive ? "active" : ""}`}>
        <div className="d-flex flex-column align-items-center">
          {React.cloneElement(icon, {
            size: 22,
            className: `mb-1 ${isActive ? "text-primary" : "text-muted"}`,
          })}
          <span className={`nav-text small ${isActive ? "text-primary" : "text-muted"}`}>
            {label}
          </span>
        </div>
      </Link>
    </li>
  );
};

export default NavBar;