import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div class="nav-main">
      <ul class="nav-main">
        <p>(Main Nav Bar)</p>
        <li class="nav-main">
          <Link to="/">HomePage</Link>
        </li>
        <li class="nav-main">
          <Link to="/about">About</Link>
        </li>
        <li class="nav-main">
          {/* use user session data to show a button to either Customer or Deliveryman Account */}
          <Link to="/deliveryman">My Account</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
