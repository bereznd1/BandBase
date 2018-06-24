const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bandSchema = new Schema({

  name: {
    type: String,
    trim: true,
    unique: true,
    required: "Please enter artist name."
  },

  location: {
    type: String,
    trim: true,
    required: "Please enter your location."
  },

  genre: {
    type: String,
    trim: true,
    required: "Please enter your genre."
  },

  availibility: {
    type: String,
    required: "Please select your availibility."
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

const Band = mongoose.model("Band", bandSchema);

module.exports = Band;
