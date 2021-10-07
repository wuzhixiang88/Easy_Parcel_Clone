require('dotenv').config();


const express = require('express');
const mongoose = require('mongoose');


//Controller Routers
const homepageController = require("./controllers/homepageController");
const dashboardController = require("./controllers/dashboardController");
const userController = require("./controllers/userController");


const mongoURL = process.env.MONGODB_URL;
const dbConnection = mongoose.connection;

mongoose.connect(mongoURL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    ignoreUndefined: true
});


dbConnection.on("error", (err) => console.log(err.message));
dbConnection.on("connected", () => console.log("Successfully connected to my database"));
dbConnection.on("disconnected", () => console.log("The database connection has ended"));

const app = express();


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true }))

//Routers
app.use("/api",homepageController);
app.use("/api/users", userController);
app.use("/api/dashboard", dashboardController);


const PORT = process.env.PORT
app.listen(PORT);