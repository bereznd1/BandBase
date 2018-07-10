const express = require("express");
var fs = require("fs");
// var multer = require("multer");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");

//PASSPORT STUFF
const morgan = require("morgan");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
// const dbConnection = require('connect-mongo')(session);
const passport = require("./passport");

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/BandBase"
);

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//PASSPORT SESSION
app.use(
  session({
    secret: process.env.APP_SECRET || "this is the default passphrase",
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: false,
    saveUninitialized: false
  })
);

// app.use(
//   multer({
//     dest: "./uploads/",
//     rename: function(fieldname, filename) {
//       return filename;
//     }
//   })
// );

// ===== Passport ====
app.use(passport.initialize());
app.use(passport.session()); // will call the deserializeUser

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
