//==========================================
//This page defines the MongooseJS model for interacting with the database.
//It specifically defines the model for a new band/user that is being saved to the DB.
//==========================================

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
mongoose.promise = Promise;

//This schema defines the different fields that each document in the "bands" collection will contain.
const bandSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    index: true,
    validate: [
      // Function takes in the value to be saved as an argument
      function(input) {
        // If this returns true, proceed. If not, return the error message below
        return input.length >= 4;
      },
      "Username should be at least 4 characters"
    ]
  },

  password: {
    type: String,
    trim: true,
    required: true,
    validate: [
      // Function takes in the value to be saved as an argument
      function(input) {
        // If this returns true, proceed. If not, return the error message below
        return input.length >= 6;
      },
      "Password should be at least 6 characters"
    ]
  },

  name: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },

  location: {
    type: String,
    required: true
  },

  genre: {
    type: String,
    required: true
  },

  availability: {
    type: String,
    required: true
  },

  facebook: {
    type: String,
    trim: true,
    unique: true
  },

  email: {
    type: String,
    trim: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },

  phone: {
    type: String,
    trim: true,
    match: [
      /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/,
      "Please enter a valid phone number in the format 555-555-5555"
    ]
  },

  musicsample: {
    type: String,
    trim: true,
    unique: true
  },

  img: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },

  datePosted: {
    type: Date,
    default: Date.now
  }
});

// Define schema methods
// Encrypts user's passwords
bandSchema.methods = {
  checkPassword: function(inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
};

// Define hooks for pre-saving
bandSchema.pre("save", function(next) {
  if (!this.password) {
    next();
  } else {
    this.password = this.hashPassword(this.password);
    next();
  }
});

const Band = mongoose.model("Band", bandSchema);

module.exports = Band;
