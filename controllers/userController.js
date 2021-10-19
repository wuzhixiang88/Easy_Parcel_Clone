const express = require("express");
const controller = express.Router();
const userModel = require("../models/users");
const refreshTokenModel = require("../models/refreshtoken")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const saltRounds = 10;

// POST Route for Sign-up

// Client-side validation
/* Check 
    1. Confirm password and password are the same.    
*/
// Server-side validation
/* Check
    1. Password is of proper length and complexity (i.e. include lowercase, uppercase and special symbols).
    2. Email/ Username is not a duplicate
*/

controller.get(
  "/profile",
  async (req, res) => {
    const user = userModel.findOne({ username: req.user.username })
    res.json({
      user: user
    })
  }
);

controller.put(
  "/profile",
  async (req, res) => {

  }
);

controller.post(
  "/signup",
  body("username").custom(async (value) => {
    const user = await userModel.findOne({ username: value });
    if (user) {
      return Promise.reject("Username is already in use!");
    }
  }),
  body("email", "A valid E-mail address must be entered")
    .isEmail()
    .normalizeEmail(),
  body("email").custom(async (value) => {
    const email = await userModel.findOne({ email: value });
    if (email) {
      return Promise.reject("E-mail is already in use!");
    }
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { username, email, password, confirmpw, role } = req.body;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedConfirmPassword = await bcrypt.hash(confirmpw, salt);
    const user = {
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
    };
    if (hashedPassword === hashedConfirmPassword) {
      await userModel.create(user);
      await refreshTokenModel.create({ username: user.username })
      res.json({
        username: user.username,
      });
    }
  }
);

controller.post(
  "/login", 
  async (req, res) => {
    const { username, password } = req.body;
    const selectedUser = await userModel.findOne({ username: username });
    const isCorrectPassword = bcrypt.compareSync(password, selectedUser.password);

    if ((!selectedUser) || (!isCorrectPassword)) {
      res.json({ error: "The username/password entered is not valid." });
    }

    const token = jwt.sign(
      { username: selectedUser.username },
      process.env.SECRET_KEY_JWT,
      { expiresIn: "15m" }
    );

    const refreshtoken = jwt.sign(
      { username: selectedUser.username },
      process.env.REFRESH_KEY_JWT,
      { expiresIn: "4h" }
    );

    await refreshTokenModel.updateOne({ username: username }, { $set: { refreshToken: refreshtoken }})

    res.cookie("jwt", token, { httpOnly: true, sameSite: "strict" });
    res.cookie("refresh", refreshtoken, { httpOnly: true, sameSite: "strict" })

    res.json({
      role: selectedUser.role,
      username: selectedUser.username
    });
  }
);

// Refresh Token Route

controller.post(
  "/token",
  async (req, res) => {
    let refreshToken = null;
    if (req && req.cookies) {
      refreshToken = req.cookies.refresh;
    }
    if (refreshToken === null) {
      return res.status(401).json({ message: "You are not authorised."});
    }
    jwt.verify(refreshToken, process.env.REFRESH_KEY_JWT, async (err, user) => {
      const refreshTokenExists = await refreshTokenModel.findOne(
        { username: user.username, refreshToken: refreshToken})
      if (!refreshTokenExists) {
        return res.status(401)
      }
      if (err) return res.status(401)
      const token = jwt.sign(
        { username: user.username },
        process.env.SECRET_KEY_JWT,
        { expiresIn: "15m" }
      );
      const newRefreshToken = jwt.sign(
        { username: user.username },
        process.env.REFRESH_KEY_JWT,
        { expiresIn: "4h" }
      );
      await refreshTokenModel.updateOne(
        { username: user.username}, { $set: { refreshToken: newRefreshToken }})

      res.cookie("jwt", token, { httpOnly: true });
      res.cookie("refresh", newRefreshToken, { httpOnly: true })
      return res.json({
        message: "Token succesfully refreshed"
      })
    });
  }
)

// Forgot Password Route - Might add Email Verification
controller.put("/changepassword", async (req, res) => {
  const { username, oldPassword, newPassword, confirmNewPassword } = req.body;
  const selectedUser = await userModel.findOne({ username: username });
  const isCorrectPassword = bcrypt.compareSync(oldPassword, selectedUser.password)

  if ((!selectedUser) || (!isCorrectPassword)) {
    res.json({ error: "The username/password entered is not valid." });
  }

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  const hashedConfirmPassword = await bcrypt.hash(confirmNewPassword, salt);
  if (hashedPassword === hashedConfirmPassword) {
    await userModel.updateOne(
        { username: username },
        { $set: { password: hashedPassword } }
    );
    res.json({ message: "The password has been succesfully changed." });
  }
});

controller.get("/logout", (req, res) => {
  res.clearCookie("jwt", {httpOnly: true});
  res.clearCookie("refresh", {httpOnly: true});
  res.json({ message: "You have logged out successfully." });
});

module.exports = controller;
