import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";

const HomePage = ({ loggedInUserRole }) => {
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
      <h5>Sign Up - Get a Quote - Send Your Parcel!</h5>

      <div>
        {loggedInUserRole ? null : (
          <div style={{ marginLeft: "-5px" }}>
            <Link to="/login">
              <Button variant="secondary">Login</Button>
            </Link>
            <Link to="/signup">
              <Button variant="secondary">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
