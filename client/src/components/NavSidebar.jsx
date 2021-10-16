import React from "react";
import { Link } from "react-router-dom";

const NavSidebar = () => {
  return (
    <div id="nav-sidebar">
      <ul>
        Guest Nav
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </ul>
      <ul>
        Customer Nav
        <li>
          <Link to="/customer">Book a Parcel</Link>
        </li>
        <li>
          <Link to="/customerinbox">Inbox</Link>
        </li>
      </ul>
      <ul>
        Deliveryman Nav
        <li>
          <Link to="/deliveryman">Available Jobs</Link>
        </li>
        <li>
          <Link to="/deliverymaninbox">Accepted Jobs</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavSidebar;
