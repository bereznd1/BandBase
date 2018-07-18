const router = require("express").Router();
const signupRoutes = require("./signup");
const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const authTestRoutes = require("./authtest");
const updateRoutes = require("./update");

//Tells the router to use the routes defined in the various "auth" api files.
router.use("/signup", signupRoutes);
router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/authtest", authTestRoutes);
router.use("/update" ,updateRoutes);



module.exports = router;
