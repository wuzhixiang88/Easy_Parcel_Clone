const express = require("express")
const controller = express.Router();
const userModel = require("../models/users");
const parcelModel = require("../models/parcels")
const passport = require("passport")
const { body, validationResult } = require("express-validator")

// Post A Parcel Route (Customer) - Add Server Side Validation
controller.post("/customer/new", 
    body('senderEmailAddress', "A valid E-mail address must be entered").isEmail().normalizeEmail(),
    body('receiverEmailAddress', "A valid E-mail address must be entered").isEmail().normalizeEmail(), 
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array()
            })
        }
        const inputs = {
            customer: req.user.username,
            status: "Booked",
            parcelDetails: {
              content: req.body.content,
              weightKg: req.body.parcelweight,
              fragile: req.body.fragile,
              price: req.body.quote
            },
            senderDetails: {
              name: req.body.senderName,
              emailAddress: req.body.senderEmailAddress,
              contactNumber: req.body.senderContactNumber,
              address: req.body.senderAddress,
              unitNum: req.body.senderUnitNum,
              postalCode: req.body.senderPostalCode
            },
            receiverDetails: {
              name: req.body.receiverName,
              emailAddress: req.body.receiverEmailAddress,
              contactNumber: req.body.receiverContactNumber,
              address: req.body.receiverAddress,
              unitNum: req.body.receiverUnitNum,
              postalCode: req.body.receiverPostalCode
            }
        };
        const newParcel = await parcelModel.create(inputs);
        await userModel.findOne({ username: req.user.username }, { $push: { orders: newParcel._id }})
        res.json({
          status: "Parcel successfully booked!"
        })
})

// Show Parcel Status (Customer)
controller.get("/customer/parcels", 
    passport.authenticate("jwt", { session: false }), 
    async (req, res) => {
        const parcels = await userModel.findOne({ username: req.user.username })
                                        .populate("parcels")
                                        .exec()
        if (parcels.parcels.length < 1) {
            res.json({ message: "You have no parcels." })
        } else {
            res.json({
              parcels: parcels.parcels
            })
        }
})


// Show all Available Orders (Deliveryman)
controller.get("/deliveryman/allparcels",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const availableParcels = await parcelModel.find({ status: "Booked" })
        res.json({
          parcels: availableParcels
        })
    })

controller.get("deliveryman/parcels",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const acceptedParcels = await userModel.findOne({ username: req.user.username })
                                              .populate("parcels")
                                              .exec()
      if (acceptedParcels.parcels.length < 1) {
          res.json({ message: "You have not accepted any parcel orders." })
      }
      res.json({
        parcels: acceptedParcels
      })
    })


// Show Individual Parcel Details (Customer)
controller.get("/customer/parcels/:id",
    passport.authenticate("jwt", { session: false }), 
    async (req, res) => {
        const parcelDetails = await parcelModel.findOne({ _id: req.params.id })
        res.json({
          parcel: parcelDetails
        })
    }    
)

// Show Individual Parcel Details (Deliveryman)
controller.get("/deliveryman/allparcels/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const availableParcelDetails = await parcelModel.findOne({ _id: req.params.id })
      res.json({
        parcel: availableParcelDetails
      })
    }
)

controller.get("/deliveryman/parcels/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const acceptedParcelDetails = await parcelModel.findOne({ _id: req.params.id })
      res.json({
        parcel: acceptedParcelDetails
      })
    }
)

// Update Parcel Details (For future reference) (Customer)

controller.put("/orders/:id")

//Update Parcel Details (Deliveryman)

controller.put("/deliveryman/allparcels/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const inputs = {
        status: "Accepted",
        deliveryman: req.user.username
      }
      const updatedParcel = await parcelModel.updateOne({ _id: req.params.id }, { $set: inputs })
      await userModel.updateOne({ username: req.user.username }, { $push: { orders: updatedParcel._id } })
      res.json({
        message: "Parcel successfully accepted"
      })
    }
)

controller.put("/deliveryman/parcels/:id",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      const inputs = {
        status: req.body.statusUpdate
      }
      await parcelModel.updateOne({ _id: req.params.id }, { $set: inputs })
      res.json({
        message: "Parcel successfully updated"
      })
    }
)

// Cancel Parcel (Customer)

controller.delete("/customer/parcels/:id", 
    passport.authenticate("jwt", { session: false }), 
    async (req, res) => {
      await parcelModel.deleteOne( { id: req.params.id } );
      res.json({
        message: "Parcel successfully cancelled"
      })
    }
)


module.exports = controller;