const express= require("express");
const controller = express.Router();
const customerModel = require("../models/customers");
const deliverymanModel = require("../models/deliverymen");
const bcrypt = require('bcrypt');
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
    
controller.post("/signup", 
    body('username').custom(async value => {
        if (body('role') === "customer") {
            const user = await customerModel.findOne({username: value});
            if (user) {
                return Promise.reject("Username is already in use!")
            }
        } else if (body("role") === "deliveryman") {
            const user = await deliverymanModel.findOne({username: value});
            if (user) {
                return Promise.reject('Username is already in use');
            }
        }
    }),
    body('email').isEmail().withMessage('A valid E-mail address must be entered'),
    body('email').custom(async value => {
        if (body('role') === "customer") {
            const email = await customerModel.findOne({email: value});
            if (email) {
                return Promise.reject("E-mail is already in use!")
            }
        } else if (body("role") === "deliveryman") {
            const email = await deliverymanModel.findOne({email: value});
            if (email) {
                return Promise.reject('E-mail is already in use');
            }
        }
    }),
    async (req,res) => {
    const { username, password, confirmpw, role } = req.body
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt)
      const hashedConfirmPassword = await bcrypt.hash(confirmpw, salt)
      const user = {
        username: username,
        email: req.body.email,
        password: hashedPassword
      }
      if (hashedPassword === hashedConfirmPassword) {
        if (role === "customer") {
            await customerModel.create(user)
        } else if (role === "deliveryman") {
            await deliverymanModel.create(user)
        }
      }
    } catch (err) {
      res.json({
          error: err
      })
    }
})
  