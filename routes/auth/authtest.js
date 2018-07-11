
const bandsController = require("../../controllers/bandsController");
const express = require('express')
const router = require("express").Router();
const User = require('../../models/band')
const passport = require('../../passport')


router.get('/', (req,res) => {
    console.log("yeah");
    if (req.user) {
        res.status(200).json({});
        console.log("it works");
        console.log(req.user);
    } else {
        res.status(401).json({});
        console.log("it does not work");
    }
  })
  
// this route is just used to get the user basic info
router.get('/user', (req, res, next) => {
	console.log('===== user!!======')
	console.log(req.user)
	if (req.user) {
		return res.json({ user: req.user })
	} else {
		return res.json({ user: null })
	}
})



module.exports = router;