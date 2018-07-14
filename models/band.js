const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
mongoose.promise = Promise;

const bandSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: true,
    index: true,
    validate: [
      // Function takes in the new `longstring` value to be saved as an argument
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
      // Function takes in the new `longstring` value to be saved as an argument
      function(input) {
        // If this returns true, proceed. If not, return the error message below
        return input.length >= 6;
      },
      "Password should be at least 6 characters"
    ]
  },

  //should also check regardless of lower or upper case so same bands with same letters but diff cases wont be saved twice
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
    unique: true,
    required: true
  },

  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
  },

  phone: {
    type: String,
    trim: true,
    required: true,
    match: [/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/, "Please enter a valid phone number in the format 555-555-5555"]
    // //  [^[0-9]{3}-[0-9]{3}-[0-9]{4}$, "Please enter a valid phone number in the format 555-555-5555"]
  },

  bandcamp: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },

  soundcloud: {
    type: String,
    trim: true,
    required: true,
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

  // // 'comment' is an array of comment objects that stores each comment's ID
  // // The ref property links the ObjectId to the Comment model
  // // This allows us to populate the Article with an associated Comment
  // comment: [
  //   {
  //     //"Schema.Types.ObjectID" is a special mongoose type that finds the ID of that item in the Comments collection
  //     type: Schema.Types.ObjectId,

  //     //This looks into that collection & finds the ID of each item in it
  //     ref: "Comment"
  //   }
  // ]
});

// Define schema methods
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
    console.log("=======NO PASSWORD PROVIDED=======");
    next();
  } else {
    this.password = this.hashPassword(this.password);
    next();
  }
  // this.password = this.hashPassword(this.password)
  // next()
});

const Band = mongoose.model("Band", bandSchema);

module.exports = Band;
