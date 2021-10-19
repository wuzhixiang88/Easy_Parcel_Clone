import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const LoginPage = ({ setLoggedInUserRole }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const history = useHistory();

  const handleInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setUserDetails({
      ...userDetails,
      [key]: value,
    });
  };

  const handleClickLogin = async () => {
    const response = await fetch("/api/users/login", {
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

    if (result.error) {
      alert("Cannot login");
    } else {
      localStorage.setItem("username", result.username);
      localStorage.setItem("role", result.role);
      setLoggedInUserRole(result.role);
    }

    if (response.ok && result.role.toLowerCase() === "customer") {
      history.push("/customer");
    } else if (response.ok && result.role.toLowerCase() === "deliveryman") {
      history.push("/deliveryman");
    }
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
        <button className="btn" onClick={handleClickLogin}>
          Login
        </button>
      </div>
      <div>
        Don't have an account?
        <Link to="/signup">Register now</Link>
      </div>
    </>
  );
};

export default LoginPage;
