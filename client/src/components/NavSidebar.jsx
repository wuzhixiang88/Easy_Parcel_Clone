import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavSidebar = ({ loggedInUserRole }) => {
  const [navSideBar, setNavSideBar] = useState();

  useEffect(() => {
    if (!loggedInUserRole) {
      setNavSideBar(
        <div className="sidebar-nav-link">
          <h4 className="sidebar-nav-title">Welcome, Guest!</h4>
          <ul>
            <li>
              <Link to="/login">
                <button className="btn">Login</button>
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <button className="btn">Sign Up</button>
              </Link>
            </li>
          </ul>
        </div>
      );
    } else if (loggedInUserRole.toLowerCase() === "customer") {
      setNavSideBar(
        <div className="sidebar-nav-link">
          <h4 className="sidebar-nav-title">Your Dashboard</h4>
          <ul>
            <li>
              <Link to="/customer">
                <button className="btn">Book a Parcel</button>
              </Link>
            </li>
            <li>
              <Link to="/customerinbox">
                <button className="btn">Inbox</button>
              </Link>
            </li>
          </ul>
        </div>
      );
    } else if (loggedInUserRole.toLowerCase() === "deliveryman") {
      setNavSideBar(
        <div className="sidebar-nav-link">
          <h4 className="sidebar-nav-title">Your Dashboard</h4>
          <ul>
            <li>
              <Link to="/deliveryman">
                <button className="btn">Available Jobs</button>
              </Link>
            </li>
            <li>
              <Link to="/deliverymaninbox">
                <button className="btn">Accepted Jobs</button>
              </Link>
            </li>
          </ul>
        </div>
      );
    }
  }, [loggedInUserRole]);

  return <div id="nav-sidebar">{navSideBar}</div>;
};

export default NavSidebar;
