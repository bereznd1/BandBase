//======================================================
//This page tests whether or not user authentication was successful.
//It defines what happens on the backend when specific API routes are hit.
//======================================================

const bandsController = require("../../controllers/bandsController");
const express = require("express");
const router = require("express").Router();
const User = require("../../models/band");
const passport = require("../../passport");

router.get("/", (req, res) => {
  if (req.user) {
    res.status(200).json({});
  } else {
    res.status(401).json({});
  }
});

// this route is just used to get the user's basic info
router.get("/user", (req, res, next) => {
  if (req.user) {
    return res.json({ user: req.user });
  } else {
    return res.json({ user: null });
  }
});

module.exports = router;
