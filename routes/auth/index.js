const router = require("express").Router();
const signupRoutes = require("./signup");
const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const authTestRoutes = require("./authtest");
const updateRoutes = require("./update");

// Book routes
router.use("/signup", signupRoutes);
router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/authtest", authTestRoutes);
router.use("/update" ,updateRoutes);



module.exports = router;
