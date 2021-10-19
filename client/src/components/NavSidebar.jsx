import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavSidebar = ({ loggedInUserRole }) => {
  const [navSideBar, setNavSideBar] = useState();

  useEffect(() => {
    if (!loggedInUserRole) {
      setNavSideBar(
        <ul>
          Guest Nav
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
        </ul>
      );
    } else if (loggedInUserRole.toLowerCase() === "customer") {
      setNavSideBar(
        <ul>
          Customer Nav
          <li>
            <Link to="/customer">Book a Parcel</Link>
          </li>
          <li>
            <Link to="/customerinbox">Inbox</Link>
          </li>
        </ul>
      );
    } else if (loggedInUserRole.toLowerCase() === "deliveryman") {
      setNavSideBar(
        <ul>
          Deliveryman Nav
          <li>
            <Link to="/deliveryman">Available Jobs</Link>
          </li>
          <li>
            <Link to="/deliverymaninbox">Accepted Jobs</Link>
          </li>
        </ul>
      );
    }
  }, [loggedInUserRole]);

  return <div id="nav-sidebar">{navSideBar}</div>;
};

export default NavSidebar;
