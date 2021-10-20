const express = require("express");
const controller = express.Router();
const userModel = require("../models/users");
const refreshTokenModel = require("../models/refreshtoken")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

const saltRounds = 10;


controller.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const user = userModel.findOne({ username: req.user.username }, { parcels: 0, password: 0, role: 0 })
    res.json({
      user: user
    })
  }
);

controller.put(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const inputs = {

    }
  }
);

controller.put(
  "/profile/changepassword",
  passport.authenticate("jwt", { session: false }),
  body("newPassword", "Please enter a new password.")
  .notEmpty()
  .custom((value) => {
      const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W\_])[A-Za-z\d\W\_]{8,}$/
    if (!re.test(value)) {
      return new Error("The new password does not meet the minimum requirements.")
    }
    return true
  }),
  body("confirmNewPassword", "Please enter the confirmed password.")
    .notEmpty()
    .custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Both passwords must match.');
    }
    return true;
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { oldPassword, newPassword } = req.body;
    const selectedUser = await userModel.findOne({ username: req.user.username });
    const isCorrectPassword = bcrypt.compareSync(oldPassword, selectedUser.password)

    if ((!isCorrectPassword)) {
      res.json({ error: "The password you entered is not valid." });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await userModel.updateOne(
        { username: username },
        { $set: { password: hashedPassword } }
    );
    res.json({ message: "The password has been succesfully changed." });
});

controller.post(
  "/signup",
  body("username", "Please enter a valid username.")
    .notEmpty()
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) {
        return Promise.reject("Username is already in use!");
    }
  }),
  body("email", "Please enter a valid e-mail address.")
    .notEmpty()
    .bail()
    .isEmail()
    .normalizeEmail()
    .bail()
    .custom(async (value) => {
      const email = await userModel.findOne({ email: value });
      if (email) {
        return Promise.reject("E-mail is already in use!");
      }
  }),
  body('password', "Please enter a valid password")
    .notEmpty()
    .custom((value) => {
      const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W\_])[A-Za-z\d\W\_]{8,}$/
      if (!re.test(value)) {
        return new Error("The password does not meet the minimum requirements.")
    }
    return true;
  }),
  body('confirmpw', "Please enter the confirmed password.")
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Both passwords must match.');
    }
    return true;
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { username, email, password, role } = req.body;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = {
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
    };
    await userModel.create(user);
    await refreshTokenModel.create({ username: user.username })
    res.json({
      username: user.username,
    });
  }
);

controller.post(
  "/login",
  body("username", "Please enter a username").notEmpty(),
  body("password", "Please enter a password").notEmpty(), 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
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
        { username: user.username, refreshToken: refreshToken })
      if (!refreshTokenExists) {
        return res.status(401).json({ message: "You are not authorised."});
      }
      if (err) return res.status(401).json({ message: "You are not authorised."});
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
controller.put(
  "/changepassword", 
  body("newPassword", "Please enter a new password.")
    .notEmpty()
    .custom((value) => {
      const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W\_])[A-Za-z\d\W\_]{8,}$/
      if (!re.test(value)) {
        return new Error("Password does not meet the minimum requirements")
      }
      return true
    }),
  body("confirmNewPassword", "Please enter the confirmed password.")
    .notEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Both passwords must match.');
      }
      return true;
    }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { username, oldPassword, newPassword } = req.body;
    const selectedUser = await userModel.findOne({ username: username });
    const isCorrectPassword = bcrypt.compareSync(oldPassword, selectedUser.password)

    if ((!selectedUser) || (!isCorrectPassword)) {
      res.json({ error: "The username/password entered is not valid." });
    }
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    await userModel.updateOne(
        { username: username },
        { $set: { password: hashedPassword } }
    );
    res.json({ message: "The password has been succesfully changed." });
});

controller.get("/logout", (req, res) => {
  res.clearCookie("jwt", {httpOnly: true});
  res.clearCookie("refresh", {httpOnly: true});
  res.json({ message: "You have logged out successfully." });
});

module.exports = controller;
