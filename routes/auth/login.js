//======================================================
//This page defines what happens on the backend when specific API routes are hit.
//It connects to PassportJS to authenticate a user who is attempting to log-in.
//======================================================

const bandsController = require("../../controllers/bandsController");
const express = require("express");
const router = require("express").Router();
const User = require("../../models/band");
const passport = require("../../passport");

router.get("/", (req, res) => {
  res.json(200);
});

router.post(
  "/",
  function(req, res, next) {
    next();
  },
  passport.authenticate("local"),
  (req, res) => {
    const user = JSON.parse(JSON.stringify(req.user)); // hack
    const cleanUser = Object.assign({}, user);
    if (cleanUser.local) {
      delete cleanUser.local.password;
    }
    res.json({ user: cleanUser });
  }
);

module.exports = router;
