import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const HomePage = () => {
  return (
    <div>
      <h3>Welcome to EZ Package</h3>
      <img
        className="images"
        src="https://i.imgur.com/AXATdgK.png"
        alt="..."
        height="200"
      />

      <h4>Start sending packages in 3 EZ steps!</h4>
      <ul>
        <li>Sign up - its free!</li>
        <li>Get a quote</li>
        <li>Book a Parcel!</li>
      </ul>
      <div style={{ marginLeft: "-5px" }}>
        <Link to="/login">
          <Button variant="secondary">Login</Button>
        </Link>
        <Link to="/signup">
          <Button variant="secondary">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
