import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import "./Navbar.css";


function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = Cookie.get("token");
  const username = Cookie.get("username");

  const handleLogout = () => {
    Cookie.remove("token");
    navigate("/login");
  };

  return (
    <nav className="Navbar">
      <ul className="nav-left">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : undefined)}>
            Blogs
          </NavLink>
        </li>
        {!token && location.pathname !== "/login" && (
          <li>
            <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Login
            </NavLink>
          </li>
        )}
        {token && (
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : undefined)}>
              Dashboard
            </NavLink>
          </li>
        )}
      </ul>
      

      {token && (
        <ul className="nav-right">  
                  <p className="">{username}</p>
       
          <li>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
