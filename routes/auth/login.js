const router = require("express").Router();
const bandsController = require("../../controllers/bandsController");

router
  .route("/")
    .post(bandsController.findByUserName)
  router
  .route("/:username")
    .get(bandsController.findByUserName);


module.exports = router;