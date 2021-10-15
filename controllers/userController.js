const express = require("express");
const controller = express.Router();
const userModel = require("../models/users")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator")

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

controller.get("/profile")

    
controller.post("/signup", 
    body('username').custom(async value => {
        const user = await userModel.findOne({username: value});
        if (user) {
            return Promise.reject("Username is already in use!")
        }
    }),
    body('email', "A valid E-mail address must be entered").isEmail().normalizeEmail(),
    body('email').custom(async value => {
        const email = await userModel.findOne({email: value});
        if (email) {
            return Promise.reject("E-mail is already in use!")
        }
    }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array()
            })
        }
        const { username, email, password, confirmpw, role } = req.body;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt)
        const hashedConfirmPassword = await bcrypt.hash(confirmpw, salt)
        const user = {
            username: username,
            email: email,
            password: hashedPassword,
            role: role
        }   
        if (hashedPassword === hashedConfirmPassword) {
            await userModel.create(user)
            res.json({
                username: user.username
            });
        }
});

controller.post("/login", 
    async (req, res) => {
        const { username, password } = req.body;
        const selectedUser = await userModel.findOne({ username: username });

        if (!selectedUser) {
            res.json({ error: "The username entered is not valid."})
        }
        const isCorrectPassword = bcrypt.compareSync(password, selectedUser.password)

        if (!isCorrectPassword) {
            res.json({ error: "You have entered the wrong password!"})
        }

        const token = jwt.sign({ username: selectedUser.username }, process.env.SECRET_KEY_JWT, { expiresIn: "10m"})
        res.cookie('jwt', token, { httpOnly: true, expiresIn: "10m" })

        res.json({
            token: token,
            role: selectedUser.role
        });
    }
)

// Forgot Password Route - Might add Email Verification
controller.put("/changepassword", 
    async(req, res) => {
        const selectedUser = await userModel.findOne({username: req.body.username});
        if (!selectedUser) {
            res.json({ error: "The username entered is not valid."})
        } 
        if (bcrypt.compareSync(req.body.oldpw, selectedUser.password)) {
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            const hashedConfirmPassword = await bcrypt.hash(req.body.confirmpw, salt)
            if (hashedPassword === hashedConfirmPassword) {
                await userModel.updateOne( { username: req.body.username }, { $set: { password: hashedPassword }})
                res.json({ message: "The password has been succesfully changed."})
            } 
        } else {
            res.json({ error: "You have entered an invalid password"})
        }
    }
)

controller.get("/logout", (req, res) => {
    res.clearCookie("jwt")
})


module.exports = controller;