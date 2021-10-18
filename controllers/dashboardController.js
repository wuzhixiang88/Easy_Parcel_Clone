const express = require("express");
const controller = express.Router();
const userModel = require("../models/users");
const parcelModel = require("../models/parcels");
const passport = require("passport");
const { body, validationResult } = require("express-validator");

// Post A Parcel Route (Customer) - Add Server Side Validation
controller.post(
  "/customer/new",
  passport.authenticate("jwt", { session: false }),
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
    const inputs = {
      customer: req.user.username,
      status: req.body.status,
      location: req.body.location,
      quotation: req.body.quotation,
      duration: req.body.duration,
      parcelDetails: req.body.parcelDetails,
      senderDetails: req.body.senderDetails,
      receiverDetails: req.body.receiverDetails,
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
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const parcels = await userModel
      .findOne({ username: req.user.username })
      .populate("parcels")
      .exec();
    if (parcels.parcels.length < 1) {
      res.json({ message: "You have no parcels." });
    } else {
      res.json({
        parcels: parcels.parcels,
      });
    }
  }
);

// Show all Available Orders (Deliveryman)
controller.get(
  "/deliveryman/allparcels",
  passport.authenticate("jwt", { session: false }),
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
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const parcels = await userModel
      .findOne({ username: req.user.username })
      .populate("parcels")
      .exec();
    if (parcels.parcels.length < 1) {
      res.json({ message: "You have no parcels." });
    } else {
      res.json({
        parcels: parcels.parcels,
      });
    }
  }
);

// Show Individual Parcel Details (Customer)
controller.get(
  "/customer/parcels/:id",
  passport.authenticate("jwt", { session: false }),
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
  passport.authenticate("jwt", { session: false }),
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
  passport.authenticate("jwt", { session: false }),
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
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const inputs = {
      status: "Accepted",
      deliveryman: req.user.username,
    };
    const updatedParcel = await parcelModel.updateOne(
      { _id: req.params.id },
      { $set: inputs }
    );
    await userModel.updateOne(
      { username: req.user.username },
      { $push: { parcels: req.params.id } }
    );
    res.json({
      message: "Parcel successfully accepted",
    });
  }
);

controller.put(
  "/deliveryman/parcels/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const inputs = {
      status: req.body.statusUpdate,
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
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    await parcelModel.deleteOne({ id: req.params.id });
    res.json({
      message: "Parcel successfully cancelled",
    });
  }
);

module.exports = controller;
