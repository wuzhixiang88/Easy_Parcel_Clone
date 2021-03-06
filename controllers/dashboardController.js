const express = require("express");
const controller = express.Router();
const userModel = require("../models/users");
const parcelModel = require("../models/parcels");
const chatModel = require("../models/chat");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

// Role Check Middleware
function roleCheck(role) {
  return (req, res, next) => {
    if (req.user.role.includes(role)) {
      next();
    } else {
      return res
        .status(401)
        .json({ message: "You are not authorised to access this page." });
    }
  };
}

// Authenticate middleware

function passport_authenticate_jwt(req, res, next) {
    return passport.authenticate("jwt", { session: false }, (err, user) => {
      if (err) {
        return res.status(401).json({ error: "Token has expired"})
      };
      if (!user) {
        return res.status(403).json({ error: "This user is not authorised." })
      }
      req.user = user
      next()
    })(req, res, next);
}

controller.get(
  "/chat/:id",
  passport_authenticate_jwt,
  async (req, res) => {
    const chatlog = await chatModel.findOne({ parcelID: req.params.id });
    res.json({
      chatlog: chatlog,
    });
  }
);

controller.get(
  "/customer/new",
  passport_authenticate_jwt,
  roleCheck("customer"),
  async (req, res) => {
    const user = userModel.findOne({ username: req.user.username });
    res.json({
      user: user.username,
    });
  }
);

// Post A Parcel Route (Customer) - Add Server Side Validation
controller.post(
  "/customer/new",
  passport_authenticate_jwt,
  roleCheck("customer"),
  body("senderDetails.emailAddress", "A valid E-mail address must be entered")
    .isEmail()
    .normalizeEmail(),
  body("receiverDetails.emailAddress", "A valid E-mail address must be entered")
    .isEmail()
    .normalizeEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { status, location, quotation, duration, parcelDetails, senderDetails, receiverDetails } = req.body
    const inputs = {
      customer: req.user.username,
      status: status,
      location: location,
      quotation: quotation,
      duration: duration,
      parcelDetails: parcelDetails,
      senderDetails: senderDetails,
      receiverDetails: receiverDetails,
    };
    const newParcel = await parcelModel.create(inputs);
    await userModel.updateOne(
      { username: req.user.username },
      { $push: { parcels: newParcel._id } }
    );
    res.json({
      status: "Parcel successfully booked!",
    });
  }
);

// Show Parcel Status (Customer)
controller.get(
  "/customer/parcels",
  passport_authenticate_jwt,
  roleCheck("customer"),
  async (req, res) => {
    const parcels = await userModel
      .findOne({ username: req.user.username })
      .populate({
        path: "parcels",
        match: { status: { $ne: "Delivered" } },
      })
      .exec();
    res.json({
      parcels: parcels.parcels,
    });
  }
);

controller.get(
  "/customer/parcels/completed",
  passport_authenticate_jwt,
  roleCheck("customer"),
  async (req, res) => {
    const parcels = await userModel
      .findOne({ username: req.user.username })
      .populate({
        path: "parcels",
        match: { status: "Delivered" },
      })
      .exec();
    res.json({
      parcels: parcels.parcels,
    });
  }
);

// Show all Available Orders (Deliveryman)
controller.get(
  "/deliveryman/allparcels",
  passport_authenticate_jwt,
  roleCheck("deliveryman"),
  async (req, res) => {
    const availableParcels = await parcelModel.find({ status: "Booked" });
    res.json({
      parcels: availableParcels,
    });
  }
);
//show deliveryman accepted orders
controller.get(
  "/deliveryman/parcels",
  passport_authenticate_jwt,
  roleCheck("deliveryman"),
  async (req, res) => {
    const parcels = await userModel
      .findOne({ username: req.user.username })
      .populate({
        path: "parcels",
        match: { $or: [{ status: "Accepted" }, { status: "Transit" }] },
      })
      .exec();
    res.json({
      parcels: parcels.parcels,
    });
  }
);

controller.get(
  "/deliveryman/parcels/completed",
  passport_authenticate_jwt,
  roleCheck("deliveryman"),
  async (req, res) => {
    const parcelsDelivered = await userModel
      .findOne({ username: req.user.username })
      .populate({
        path: "parcels",
        match: { status: "Delivered" },
      })
      .exec();
    res.json({
      parcels: parcelsDelivered,
    });
  }
);

// Show Individual Parcel Details (Customer)
controller.get(
  "/customer/parcels/:id",
  passport_authenticate_jwt,
  roleCheck("customer"),
  async (req, res) => {
    const parcelDetails = await parcelModel.findOne({ _id: req.params.id });
    res.json({
      parcel: parcelDetails,
    });
  }
);

// Show Individual Parcel Details (Deliveryman)
controller.get(
  "/deliveryman/allparcels/:id",
  passport_authenticate_jwt,
  roleCheck("deliveryman"),
  async (req, res) => {
    const availableParcelDetails = await parcelModel.findOne({
      _id: req.params.id,
    });
    res.json({
      parcel: availableParcelDetails,
    });
  }
);

controller.get(
  "/deliveryman/parcels/:id",
  passport_authenticate_jwt,
  roleCheck("deliveryman"),
  async (req, res) => {
    const acceptedParcelDetails = await parcelModel.findOne({
      _id: req.params.id,
    });
    res.json({
      parcel: acceptedParcelDetails,
    });
  }
);

// Update Parcel Details (For future reference) (Customer)

controller.put("/orders/:id");

//Update Parcel Details (Deliveryman)

controller.put(
  "/deliveryman/allparcels/:id",
  passport_authenticate_jwt,
  roleCheck("deliveryman"),
  async (req, res) => {
    const inputs = {
      status: "Accepted",
      deliveryman: req.user.username,
    };
    await parcelModel.updateOne({ _id: req.params.id }, { $set: inputs });
    await userModel.updateOne(
      { username: req.user.username },
      { $push: { parcels: req.params.id } }
    );
    res.json({
      message: "Parcel successfully accepted",
    });
  }
);

controller.patch(
  "/deliveryman/parcels/:id",
  passport_authenticate_jwt,
  roleCheck("deliveryman"),
  async (req, res) => {
    const inputs = {
      status: req.body.status,
    };
    await parcelModel.updateOne({ _id: req.params.id }, { $set: inputs });
    res.json({
      message: "Parcel successfully updated",
    });
  }
);

// Cancel Parcel (Customer)

controller.delete(
  "/customer/parcels/:id",
  passport_authenticate_jwt,
  roleCheck("customer"),
  async (req, res) => {
    await parcelModel.deleteOne({ id: req.params.id });
    res.json({
      message: "Parcel successfully cancelled",
    });
  }
);

module.exports = controller;
