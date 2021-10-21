import React from "react";
import { Link, useHistory } from "react-router-dom";

const Navbar = ({ loggedInUserRole, setLoggedInUserRole }) => {
  const history = useHistory();

  const handleClickLogout = async () => {
    const response = await fetch("/api/users/logout", {
      method: "GET",
    });

    if (response.ok) {
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      setLoggedInUserRole(null);
      history.push("/");
    }
  };

  const loggedInUser = localStorage.getItem("role");

  return (
    <div>
      <img src="https://i.imgur.com/9gChk72.gif" alt="..." height="100" />
      <ul className="nav-main">
        <Link to="/">
          <li className="nav-main nav-main-link">Home</li>
        </Link>
        <Link to="/about">
          <li className="nav-main nav-main-link">About</li>
        </Link>

        {loggedInUser === "customer" ? (
          <Link to="/profile">
            <li className="nav-main nav-main-link">My Profile</li>
          </Link>
        ) : (
          <Link to="/profile">
            <li className="nav-main nav-main-link">My Profile</li>
          </Link>
        )}

        {loggedInUserRole ? (
          <li
            className="nav-main btn-logout nav-main-link"
            onClick={handleClickLogout}
          >
            Logout
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default Navbar;
