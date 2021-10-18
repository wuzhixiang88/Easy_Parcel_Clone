import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const RegisterPage = () => {
  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    password: "",
    confirmpw: "",
    email: "",
    role: "",
  });

  const history = useHistory();

  const handleInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setRegisterDetails({
      ...registerDetails,
      [key]: value,
    });
  };

  const handClickRegister = async () => {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username: registerDetails.username,
        password: registerDetails.password,
        confirmpw: registerDetails.confirmpw,
        email: registerDetails.email,
        role: registerDetails.role,
      }),
    });

    if (response.ok) {
      history.push("/login");
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
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
        <input
          type="password"
          name="confirmpw"
          placeholder="Confirm Password"
          value={registerDetails.confirmpw}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="email"
          placeholder="Email Address"
          value={registerDetails.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={registerDetails.role}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button className="btn" onClick={handClickRegister}>
          Register For Free
        </button>
      </div>
      <div>
        Already have an account?
        <Link to="/login">Login now</Link>
      </div>
    </>
  );
};

export default RegisterPage;
