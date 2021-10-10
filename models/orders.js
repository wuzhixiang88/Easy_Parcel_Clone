const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        customer: { type: Schema.Types.ObjectId, ref: "User" },
        deliveryman: { type: Schema.Types.ObjectId, ref: "User" },
        status: String,
        orderDetails: {
            content: String,
            weightKg: Number,
            fragile: Boolean,
            price: Number
        },
        senderDetails: {
            name: String,
            emailAddress: String,
            contactNumber: String,
            address: String,
            unitNum: String,
            postalCode: String
        },
        receiverDetails: {
            name: String,
            emailAddress: String,
            contactNumber: String,
            address: String,
            unitNum: String,
            postalCode: String
        }
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;