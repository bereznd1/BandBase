const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
mongoose.promise = Promise;

const bandSchema = new Schema({
  username: {
    type: String,
    index:true
  },

  password: {
    type:String
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
    trim: true
  },

  email: {
    type: String,
    trim: true
  },

  phone: {
    type: String,
    trim: true
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
		return bcrypt.compareSync(inputPassword, this.password)
	},
	hashPassword: plainTextPassword => {
		return bcrypt.hashSync(plainTextPassword, 10)
	}
}

// Define hooks for pre-saving
bandSchema.pre('save', function(next) {
	if (!this.password) {
		console.log('=======NO PASSWORD PROVIDED=======')
		next()
	} else {
		this.password = this.hashPassword(this.password)
		next()
	}
	// this.password = this.hashPassword(this.password)
	// next()
})

const Band = mongoose.model("Band", bandSchema);

module.exports = Band;
