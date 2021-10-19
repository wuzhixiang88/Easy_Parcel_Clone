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
            <Link className="sidebar-nav-link" to="/login">
              <button className="btn">Login</button>
            </Link>
          </li>
          <li>
            <Link className="sidebar-nav-link" to="/signup">
              <button className="btn">Sign Up</button>
            </Link>
          </li>
        </ul>
      );
    } else if (loggedInUserRole.toLowerCase() === "customer") {
      setNavSideBar(
        <ul>
          Customer Nav
          <li>
            <Link className="sidebar-nav-link" to="/customer">
              <button className="btn">Book a Parcel</button>
            </Link>
          </li>
          <li>
            <Link className="sidebar-nav-link" to="/customerinbox">
              <button className="btn">Inbox</button>
            </Link>
          </li>
        </ul>
      );
    } else if (loggedInUserRole.toLowerCase() === "deliveryman") {
      setNavSideBar(
        <ul>
          Deliveryman Nav
          <li>
            <Link className="sidebar-nav-link" to="/deliveryman">
              <button className="btn">Available Jobs</button>
            </Link>
          </li>
          <li>
            <Link className="sidebar-nav-link" to="/deliverymaninbox">
              <button className="btn">Accepted Jobs</button>
            </Link>
          </li>
        </ul>
      );
    }
  }, [loggedInUserRole]);

  return <div id="nav-sidebar">{navSideBar}</div>;
};

export default NavSidebar;
