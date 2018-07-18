//=========================================
//This is the main ExpressJS server file for the whole app.
//=========================================

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");

//PassportJS (authentication) stuff
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("./passport");

const app = express();
const PORT = process.env.PORT || 3001;

//Connects to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/BandBase",
  { useNewUrlParser: true }
);

//Defines body parser middleware for handling HTTP requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//PassportJS Session
app.use(
  session({
    secret: process.env.APP_SECRET || "this is the default passphrase",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
  })
);

//Passport
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

//Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

//Adds routes, both API and view
app.use(routes);

//Starts the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
