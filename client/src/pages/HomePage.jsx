import React, { useState } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h3>Welcome to EZ Package</h3>
      <h4>Get an instant quote below! </h4>
      <h4>---insert quote widget here--</h4>

      <h4>Like what you see? Sign up for free!</h4>
      <button>
        <Link to="/login">Login</Link>
      </button>
      <button>
        <Link to="/signup">Register</Link>
      </button>
    </div>
  );
};

export default HomePage;
