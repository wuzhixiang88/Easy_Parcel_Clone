const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema(
    {
        username: { type: String, required: true, unique: true},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        addresses: [String],
        orders: [{ type: Schema.Types.ObjectId, ref: "Order" }]
    }
);

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
