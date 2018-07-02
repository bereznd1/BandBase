const router = require("express").Router();
const loginRoutes = require("./login");

// Book routes
router.use("/login", loginRoutes);

module.exports = router;
