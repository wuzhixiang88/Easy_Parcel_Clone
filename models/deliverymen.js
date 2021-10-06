const mongoose = require("mongoose");
const { Schema } = mongoose;


const deliverymanSchema = new Schema(
    {
        username: { type: String, required: true, unique: true},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    }
);

const Deliveryman = mongoose.model("Deliveryman", deliverymanSchema);

module.exports = Deliveryman;