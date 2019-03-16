const express = require("express");
const Cors = require("cors");
const passport = require("passport");
const logger = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

// Set up the express app
const app = express();
const API_PORT = process.env.API_PORT || 3000;

// use CORS
app.use(Cors());

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Log requests to the console.
app.use(logger("dev"));

// initialize passport
app.use(passport.initialize());

require("./server/config/passport")(passport, require("./server/models").User);
require("./server/routes")(app);
// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get("*", (req, res) =>
  res.status(200).send({
    message: "This Api not yet exist "
  })
);

module.exports = app;
