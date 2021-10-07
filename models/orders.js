const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        weightKg: Number,
        status: String,
    }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;