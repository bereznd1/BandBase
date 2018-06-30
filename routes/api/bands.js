const router = require("express").Router();
const bandsController = require("../../controllers/bandsController");


//-----------------PASSPORT VALIDATION--------------------------//
//passport validation 

var passport = require('passport');
var flash    = require('connect-flash');
var session      = require('express-session');

//-----------------PASSPORT VALIDATION--------------------------//

//-----------------PASSPORT CONFIGUREATION


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
