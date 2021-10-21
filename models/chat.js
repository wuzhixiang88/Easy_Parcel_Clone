const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
    parcelID: String,
    chatlog: [Object]
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;