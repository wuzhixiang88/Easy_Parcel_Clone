const mongoose = require("mongoose");
const { Schema } = mongoose;

const parcelSchema = new Schema(
    {
        customer: String,
        deliveryman: String,
        status: String,
        parcelDetails: {
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

const Parcel = mongoose.model("Parcel", parcelSchema);

module.exports = Parcel;