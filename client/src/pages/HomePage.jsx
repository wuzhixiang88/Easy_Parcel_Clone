import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h3>--insert Quote Widget here--</h3>
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
