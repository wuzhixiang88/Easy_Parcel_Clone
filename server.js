require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const strategy = require("./passport");
const parcelModel = require("./models/parcels");
const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, async (data) => {
    const { roomId, body, senderId } = data;
    await parcelModel.updateOne(
      { _id: roomId },
      { $push: { chatLog: { sender: senderId, body: body } } }
    );
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

//Controller Routers
const dashboardController = require("./controllers/dashboardController");
const userController = require("./controllers/userController");
const cookieParser = require("cookie-parser");

const mongoURL = process.env.MONGODB_URL;
const dbConnection = mongoose.connection;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ignoreUndefined: true,
});

dbConnection.on("error", (err) => console.log(err.message));
dbConnection.on("connected", () =>
  console.log("Successfully connected to my database")
);
dbConnection.on("disconnected", () =>
  console.log("The database connection has ended")
);

const app = express();

passport.use(strategy);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cookieParser());

//Routers
app.use("/api/users", userController);
app.use("/api/dashboard", dashboardController);

const PORT = process.env.PORT;
app.listen(PORT);
server.listen(4000);
