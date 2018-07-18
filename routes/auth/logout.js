//======================================================
//This page defines what happens on the backend when specific API routes are hit.
//It connects to PassportJS to process user's log-out requests.
//======================================================

const bandsController = require("../../controllers/bandsController");
const express = require("express");
const router = require("express").Router();
const User = require("../../models/band");
const passport = require("../../passport");

router.post("/", (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie("connect.sid"); // clean up!
    return res.json({ msg: "logging you out" });
  } else {
    return res.json({ msg: "no user to log out!" });
  }
});

module.exports = router;
