import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <ul>
        <li>
            <Link to="/" >
                Home Page
            </Link>
        </li>
        <li>
            <Link to="/quote">
                Quote Page
            </Link>
        </li>
        <li>
            <Link to="/details">
                Details Page
            </Link>
        </li>
      <li>
        <Link to="/customer">Customer</Link>
      </li>
      <li>
        <Link to="/deliveryman">Deliveryman</Link>
      </li>
    </ul>
  );
};

export default Navbar;
