
const bandsController = require("../../controllers/bandsController");
const express = require('express')
const router = require("express").Router();
const User = require('../../models/band')
const passport = require('../../passport')


router.get('/', (req,res) => {
    console.log("yeah");
    if (req.user) {
        res.json(200);
        console.log("it works");
        console.log(req.user);
    } else {
        res.json(401);
        console.log("it does not work");
    }
  })
  



module.exports = router;