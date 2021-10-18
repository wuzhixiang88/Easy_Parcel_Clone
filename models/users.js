const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: String,
        firstname: String,
        lastname: String,
        homeAddress: String, 
        contactNumber: String,
        parcels: [{ type: Schema.Types.ObjectId, ref: "Parcel" }],
    }
)

const User = mongoose.model("User", userSchema);

module.exports = User;
