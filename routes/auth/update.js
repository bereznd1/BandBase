//======================================================
//This page tests handles what happens on the back-end when a logged-in user is updating his/her profile info.
//======================================================

const express = require("express");
const router = require("express").Router();
const User = require("../../models/band");
const passport = require("../../passport");
const db = require("../../models");

//When a "put" request is sent containing a specific band's id as a parameter, find that band within the DB & update it with the new info that the user updated.
router.put("/:id", (req, res) => {
  db.Band.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true
  })
    .then(dbModel => {
      return res.json(dbModel);
    })
    .catch(err => res.status(422).json(err));

});

module.exports = router;
