import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setRegisterDetails({
      ...registerDetails,
      [key]: value,
    });
  };

  const handClickRegister = async () => {
    await fetch("/api", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: registerDetails.username,
        password: registerDetails.password,
      }),
    });

    alert("User account successfully created");
  };

  return (
    <>
      <div>
        <input
          name="username"
          placeholder="Username"
          value={registerDetails.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={registerDetails.password}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button onClick={handClickRegister}>Register For Free</button>
      </div>
      <div>
        Already have an account?
        <Link to="/login">Login now</Link>
      </div>
    </>
  );
};

export default RegisterPage;
