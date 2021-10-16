import React from "react";
import { Link, useHistory } from "react-router-dom";

const Navbar = () => {
  const history = useHistory();

  const handleClickLogout = async () => {
    const response = await fetch("/api/users/logout", {
      method: "GET",
    });

    if (response.ok) {
      localStorage.removeItem("username");
      history.push("/");
    }
  };
  return (
    <div>
      <ul className="nav-main">
        <p>Welcome to EZ Package Pte Ltd</p>
        <li className="nav-main">
          <Link to="/">HomePage</Link>
        </li>
        <li className="nav-main">
          <Link to="/about">About</Link>
        </li>
        <li className="nav-main">
          {/* use user session data to show a button to either Customer or Deliveryman Account */}
          <Link to="/deliveryman">My Account</Link>
        </li>
      </ul>
      <button className="btn-logout" onClick={handleClickLogout}>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
