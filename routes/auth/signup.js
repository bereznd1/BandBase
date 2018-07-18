//======================================================
//This page tests handles what happens on the back-end when a new user is signing up for an account.
//======================================================

const router = require("express").Router();
const User = require("../../models/band");

//When a post request is sent by the user who has filled out the sign-up form...
router.post("/", (req, res) => {
  const {
    username,
    password,
    name,
    location,
    genre,
    availability,
    facebook,
    email,
    phone,
    musicsample,
    img
  } = req.body;

  //The app first checks if any of the values from the form which are not allowed to be duplicates between multiple users already exist within the DB.
  User.find(
    {
      $or: [
        { username: username },
        { name: name },
        { facebook: facebook },
        { email: email },
        { musicsample: musicsample },
        { img: img }
      ]
    },

	//If users are returned with the same values that the new user is attempting to submit...
    (err, users) => {
      var errors = {
        username: "",
        name: "",
        facebook: "",
        email: "",
        musicsample: "",
        img: ""
	  };
	  
	  //Custom error messages are created for each specific field that is a duplicate.
      if (users && users.length > 0) {
        if (users[0].username === username) {
          errors.username = `Sorry, already a user with the Username: ${username}.`;
        }

        if (users[0].name.toLowerCase() === name.toLowerCase()) {
          errors.name = `Sorry, already a user with the Band Name: ${name}.`;
        }

        if (users[0].facebook === facebook) {
          errors.facebook = `Sorry, already a user with the Facebook URL that you entered.`;
        }

        if (users[0].email === email) {
          errors.email = `Sorry, already a user with the Email Address: ${email}.`;
        }

        if (users[0].musicsample === musicsample) {
          errors.musicsample = `Sorry, already a user with the Music Sharing URL that you entered.`;
        }

        if (users[0].img === img) {
          errors.img = `Sorry, already a user with the Img URL that you entered.`;
        }

		//These errors are then sent back to the front-end, and will be saved in the Sign-Up form's state.
        if (errors) {
          return res.json({
            error: errors
          });
        }
	  }
	  
	  //An object is created containing all of the data in the req.body
      const newUser = new User({
        username: username,
        password: password,
        name: name,
        location: location,
        genre: genre,
        availability: availability,
        facebook: facebook,
        email: email,
        phone: phone,
        musicsample: musicsample,
        img: img
      });

	  //If any of the required fields wasn't filled in, sends a custom error message.
      if (!newUser.username) {
        return res.status(400).send("Please enter a username.");
      }

      if (!newUser.password) {
        return res.status(400).send("Please enter a password.");
      }

      if (!newUser.name) {
        return res.status(400).send("Please enter a band name.");
      }

      if (!newUser.location) {
        return res.status(400).send("Please select a location.");
      }

      if (!newUser.genre) {
        return res.status(400).send("Please select a genre.");
      }

      if (!newUser.availability) {
        return res.status(400).send("Please select an availability.");
      }

      if (!newUser.email) {
        return res.status(400).send("Please enter your email address");
      }

      if (!newUser.facebook) {
        return res.status(400).send("Please enter your Facebook page URL.");
      }

      if (!newUser.phone) {
        return res.status(400).send("Please enter your phone number");
      }

      if (!newUser.musicsample) {
        return res
          .status(400)
          .send("Please enter your Music Sharing site URL.");
      }

      if (!newUser.img) {
        return res.status(400).send("Please enter an image URL.");
      }

	  //Saves the new user to the database.
      newUser.save((err, savedUser) => {
        if (err) return res.json(err);
        return res.json(savedUser);
      });
    }
  );
});

module.exports = router;
