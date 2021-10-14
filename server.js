require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const strategy = require("./passport");

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
