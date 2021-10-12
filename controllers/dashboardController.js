const express = require("express")
const controller = express.Router();
const userModel = require("../models/users");
const orderModel = require("../models/orders")
const passport = require("passport")

controller.get("/settings")


// For Customer Routes

controller.post("/new", 
                passport.authenticate("jwt", { session: false }), 
                async (req, res) => {
                  const inputs = {
                    
                    status: "Order Placed",
                    orderDetails: {
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
                  await orderModel.create(inputs)
                  
                })

// Show Parcel Status

// Customer - Parcels

controller.get("/allparcels", 
                passport.authenticate("jwt", { session: false }), 
                async (req, res) => {
                  if (req.user.role === "customer") {
                    const orders = await userModel.findOne({ username: req.user.username })
                                                  .populate("orders")
                                                  .exec();
      if (orders.length < 1) {
        res.json({ message: "You have no parcels" })
      } else {
        res.json({
          orders: orders
        })
      }
    } else if (req.user.role === "deliveryman") {

    }
    
})

// Deliveryman - Orders


// Show Parcel Details 

controller.get("/orders/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    
})


// Update Parcel Details

controller.get("/orders/:id/update")

controller.put("/orders/:id")

// Cancel Parcel

controller.delete("/orders/:id", passport.authenticate("jwt", { session: false }), async (req, res) => {
    await orderModel.deleteOne( { id: req.params.id } );
    res.redirect("/decks");
})


module.exports = controller;