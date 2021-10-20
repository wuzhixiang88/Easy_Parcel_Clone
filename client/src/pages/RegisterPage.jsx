import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const RegisterPage = () => {
  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    password: "",
    confirmpw: "",
    email: "",
    role: "",
  });
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const findFormErrors = () => {
    const { username, password, confirmpw, email, role } = registerDetails;
    const newErrors = {};

    // username errors
    if (!username || username === "") {
      newErrors.username = "Username cannot be blank!";
    } else if (username.length > 15) {
      newErrors.username = "Username is too long!";
    }
    // password errors
    if (!password || password === "") {
      newErrors.password = "Password cannot be blank!";
    }
    // confirm password errors
    if (!confirmpw || confirmpw === "") {
      newErrors.confirmpw = "Confirm password cannot be blank!";
    }
    // email errors
    if (!email || email === "") {
      newErrors.email = "Email cannot be blank!";
    }
    // role errors
    if (!role || role === "") {
      newErrors.role = "Select a role!";
    }

    return newErrors;
  };

  const handleInputChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;

    setRegisterDetails({
      ...registerDetails,
      [key]: value,
    });

    if (!!errors[key]) {
      setErrors({
        ...errors,
        [key]: null,
      });
    }
  };

  const handClickRegister = async (e) => {
    e.preventDefault();

    const newErrors = findFormErrors();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
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
              type="text"
              name="username"
              placeholder="Username"
              value={registerDetails.username}
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
              value={registerDetails.password}
              onChange={handleInputChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid" style={style}>
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              name="confirmpw"
              placeholder="Confirm Password"
              value={registerDetails.confirmpw}
              onChange={handleInputChange}
              isInvalid={!!errors.confirmpw}
            />
            <Form.Control.Feedback type="invalid" style={style}>
              {errors.confirmpw}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              name="email"
              placeholder="Email Address"
              value={registerDetails.email}
              onChange={handleInputChange}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid" style={style}>
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              name="role"
              value={registerDetails.role}
              onChange={handleInputChange}
              isInvalid={!!errors.role}
            >
              <option value="" selected hidden>
                Please choose a role
              </option>
              <option value="customer">Customer</option>
              <option value="deliveryman">Deliveryman</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid" style={style}>
              {errors.role}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group style={{ marginLeft: "-5px" }}>
            <Button
              type="submit"
              variant="secondary"
              onClick={handClickRegister}
            >
              Register For Free
            </Button>
          </Form.Group>
        </Form>
      </div>
      <div>
        <p style={{ marginLeft: "0.2rem" }}>
          Already have an account?
          <Link to="/login"> Login now</Link>
        </p>
      </div>
    </>
  );
};

export default RegisterPage;
