const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true },
        addresses: [String],
        orders: [{ type: Schema.Types.ObjectId, ref: "Order" }]
    }
)

const User = mongoose.model("User", userSchema);

module.exports = User;
