import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const HomePage = () => {
  return (
    <div>
      <h3>Welcome to EZ Package</h3>

      <h4>Start sending packages in 3 easy steps!</h4>
      <ul>
        <li>Sign up - its free!</li>
        <li>Get a quote</li>
        <li>Book a Parcel!</li>
      </ul>
      <button type="button" className="btn btn-secondary">
        <Link to="/login">Login</Link>
      </button>
      <button type="button" className="btn btn-secondary">
        <Link to="/signup">Sign Up</Link>
      </button>
    </div>
  );
};

export default HomePage;
