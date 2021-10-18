const mongoose = require("mongoose");
const { Schema } = mongoose;

const refreshTokenSchema = new Schema(
    {
        username: String,
        refreshToken: String
    }
)

const refreshToken = mongoose.model("refreshToken", refreshTokenSchema);

module.exports = refreshToken