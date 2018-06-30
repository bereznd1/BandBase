const router = require("express").Router();
const bandsController = require("../../controllers/bandsController");


//-----------------PASSPORT VALIDATION--------------------------//
//passport validation 

var passport = require('passport');
var flash    = require('connect-flash');
var session  = require('express-session');

//-----------------PASSPORT VALIDATION--------------------------//


//-----------------PASSPORT CONFIGURATION----------------------//

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
//-----------------PASSPORT CONFIGURATION----------------------//

//https://github.com/tinkerstash/node-react-passport/blob/master/backend/controllers/user.js

// Matches with "/api/books"
router.route("/")
  .get(bandsController.findAll)
  .post(bandsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(bandsController.findById)
  // .put(bandsController.update)
  // .delete(bandsController.remove);

module.exports = router;
