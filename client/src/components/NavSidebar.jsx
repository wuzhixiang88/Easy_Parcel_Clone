import React from "react";
import { Link } from "react-router-dom";

const NavSidebar = () => {
  return (
    <div>
      <p>(Side Nav Bar)</p>
      <ul>
        Guest Nav
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Register</Link>
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
          <Link to="/customer">Check Available Jobs</Link>
        </li>
        <li>
          <Link to="/customerinbox">My Job Details</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavSidebar;
