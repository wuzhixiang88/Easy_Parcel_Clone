import React from "react";
import { Link } from "react-router-dom";

const NavSidebar = () => {
  return (
    <ul>
      <p>(Side Nav Bar)</p>
      <li>
        <Link to="/customer">Book a Parcel</Link>
      </li>
      <li>
        <Link to="/customerinbox">Inbox</Link>
      </li>
    </ul>
  );
};

export default NavSidebar;
