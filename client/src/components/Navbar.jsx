import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <ul>
      <li>
        <Link to="/">HomePage</Link>
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
