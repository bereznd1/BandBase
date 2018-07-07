const router = require("express").Router();
const signupRoutes = require("./signup");
const loginRoutes = require("./login");
const logoutRoutes = require("./logout");

// Book routes
router.use("/signup", signupRoutes);
router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);



module.exports = router;
