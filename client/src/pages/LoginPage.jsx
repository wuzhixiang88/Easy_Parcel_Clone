import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setUserDetails({
      ...userDetails,
      [key]: value,
    });
  };

  const handleClickLogin = async () => {
    const response = await fetch("/api", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: userDetails.username,
        password: userDetails.password,
      }),
    });

    const result = await response.json();

    result.token
      ? localStorage.setItem("token", result.token)
      : alert("Error! Please login again.");
  };

  return (
    <>
      <div>
        <input
          name="username"
          placeholder="Username"
          value={userDetails.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={userDetails.password}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button onClick={handleClickLogin}>Login</button>
      </div>
      <div>
        Don't have an account?
        <Link to="/signup">Register now</Link>
      </div>
    </>
  );
};

export default LoginPage;
