const router = require("express").Router();
const loginRoutes = require("./login");
const signupRoutes = require("./signup");

// Book routes
router.use("/login", loginRoutes);
router.use("/signup", signupRoutes);

module.exports = router;
