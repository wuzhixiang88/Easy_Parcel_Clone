require("dotenv").config();

const mongoose = require("mongoose");
const chatModel = require("./models/chat");
const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

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

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";

io.on("connection", (socket) => {
  // Join a conversation
  const { roomId } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(NEW_CHAT_MESSAGE_EVENT, async (data) => {
    const { roomId, body, senderId } = data;
    const roomExists = await chatModel.findOne({ parcelID: roomId });

    if (!roomExists) {
      await chatModel.create({
        parcelID: roomId,
        chatlog: [{ senderID: senderId, body: body }],
      });
    } else {
      await chatModel.updateOne(
        { parcelID: roomId },
        { $push: { chatlog: { senderID: senderId, body: body } } }
      );
    }
    io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Leave the room if the user closes the socket
  socket.on("disconnect", () => {
    socket.leave(roomId);
  });
});

const SOCKET_PORT = process.env.SOCKET_PORT;
server.listen(SOCKET_PORT);
