const router = require("express").Router();
const bandsController = require("../../controllers/bandsController");

router
  .route("/")

  router
  .route("/:username")
    .post(bandsController.findByUserName)
    .get(bandsController.findByUserName);


module.exports = router;