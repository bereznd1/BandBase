const router = require("express").Router();
// const bandsController = require("../../controllers/bandsController");
const User = require('../../models/band')

// router.get('/', (req,res) => {
//     console.log('signup is working')
//     res.json(200);
// })


router.post('/', (req, res) => {
	const { username, password } = req.body
	// ADD VALIDATION
	User.findOne({ 'username': username }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the username: ${username}`
			})
		}
		const newUser = new User({
			'username': username,
			'password': password
		})
		newUser.save((err, savedUser) => {
			if (err) return res.json(err)
			return res.json(savedUser)
		})
	})
})



module.exports = router;