//======================================================
//This page defines what happens on the backend when specific API routes are hit.
//It connects the HTTP requests to the "bandsController" file, which defines the actual MongooseJS syntax that is used to access the DB.
//======================================================

const router = require("express").Router();
const bandsController = require("../../controllers/bandsController");

// Matches with "/api/bands"
router
  .route("/")
  .get(bandsController.findAll)
  .post(bandsController.create);

// Matches with "/api/bands/:id"
router
  .route("/:id")
  .get(bandsController.findById)
  .delete(bandsController.remove);

module.exports = router;
