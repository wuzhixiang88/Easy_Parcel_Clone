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
          <Link to="/customer">Customer</Link>
        </li>
        <li class="nav-main">
          <Link to="/deliveryman">Deliveryman</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
