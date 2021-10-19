import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginPage = ({ setLoggedInUserRole }) => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const findFormErrors = () => {
    const { username, password } = userDetails;
    const newErrors = {};

    // username errors
    if (!username || username === "") {
      newErrors.username = "Username cannot be blank!";
    }
    // password errors
    if (!password || password === "") {
      newErrors.password = "Password cannot be blank!";
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setUserDetails({
      ...userDetails,
      [key]: value,
    });

    if (!!errors[key]) {
      setErrors({
        ...errors,
        [key]: null,
      });
    }
  };

  const handleClickLogin = async (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
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

        if (result.role.toLowerCase() === "customer") {
          history.push("/customer");
        } else if (result.role.toLowerCase() === "deliveryman") {
          history.push("/deliveryman");
        }
      }
    }
  };

  const style = {
    color: "red",
    marginLeft: "0.5rem",
  };

  return (
    <>
      <div>
        <Form>
          <Form.Group>
            <Form.Control
              name="username"
              placeholder="Username"
              value={userDetails.username}
              onChange={handleInputChange}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid" style={style}>
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              value={userDetails.password}
              onChange={handleInputChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid" style={style}>
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group style={{ marginLeft: "-5px" }}>
            <Button variant="secondary" onClick={handleClickLogin}>
              Login
            </Button>
          </Form.Group>
        </Form>
      </div>
      <div>
        <p style={{ marginLeft: "0.2rem" }}>
          Don't have an account?
          <Link to="/signup"> Register now</Link>
        </p>
      </div>
    </>
  );
};

export default LoginPage;
