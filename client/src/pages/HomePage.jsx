import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
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
