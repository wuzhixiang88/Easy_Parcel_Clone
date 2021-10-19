import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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
      <button className="btn">
        <Link to="/login">Login</Link>
      </button>
      <button className="btn">
        <Link to="/signup">Sign Up</Link>
      </button>
    </div>
  );
};

export default HomePage;
