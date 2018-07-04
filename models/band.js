const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bandSchema = new Schema({

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

const Band = mongoose.model("Band", bandSchema);

module.exports = Band;
