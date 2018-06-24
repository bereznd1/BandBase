const router = require("express").Router();
const bandRoutes = require("./bands");

// Book routes
router.use("/bands", bandRoutes);

module.exports = router;
