const router = require("express").Router();
// const bandsController = require("../../controllers/bandsController");
const User = require("../../models/band");

// router.get('/', (req,res) => {
//     console.log('signup is working')
//     res.json(200);
// })

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
  // ADD VALIDATION
  console.log("hit  the endpoint");

  //CHECKING FOR DUPLICATES
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

    (err, users) => {
      var errors = {
        username: "",
        name: "",
        facebook: "",
        email: "",
        musicsample: "",
        img: ""
      };
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

        if (errors) {
          return res.json({
            error: errors
          });
        }
      }
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
        // 'img.data': fs.readFileSync(req.files.img.path),
      });

      // newUser.img.data = fs.readFileSync(req.files.img.path);
      // newUser.img.contentType = 'image/png';

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

      newUser.save((err, savedUser) => {
        console.log("made it here");

        if (err) return res.json(err);
        console.log("Saved user", savedUser);
        console.log("error", err);
        return res.json(savedUser);
      });

      console.log("new user", newUser);
    }
  );
});

module.exports = router;
