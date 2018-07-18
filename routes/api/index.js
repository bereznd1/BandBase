const router = require("express").Router();
const bandRoutes = require("./bands");

//Tells the router to use the Band routes defined in the bands api file.
router.use("/bands", bandRoutes);

module.exports = router;
