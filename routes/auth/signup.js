const router = require("express").Router();
// const bandsController = require("../../controllers/bandsController");
const User = require('../../models/band')

// router.get('/', (req,res) => {
//     console.log('signup is working')
//     res.json(200);
// })


   

router.post('/', (req, res) => {
	const { username, password, name, location, genre, availability, facebook, email, phone, bandcamp, soundcloud } = req.body
	// ADD VALIDATION
	console.log('hit  the endpoint')
	User.findOne({ 'username': username }, (err, userMatch) => {
		if (userMatch) {
			return res.json({
				error: `Sorry, already a user with the username: ${username}`

			})
		}
		const newUser = new User({
			'username': username,
            'password': password,
            'name' : name,
            'location': location,
            'genre': genre,
			'availability':availability,
			'facebook': facebook,
			'email': email,
			'phone': phone,
			'bandcamp': bandcamp,
			'soundcloud': soundcloud,
			// 'img.data': fs.readFileSync(req.files.img.path),

			

		});

		newUser.img.data = fs.readFileSync(req.files.img.path);
		newUser.img.contentType = 'image/png';


		console.log('new user', newUser)
		newUser.save((err, savedUser) => {
			if (err) return res.json(err);
			console.log('Saved user', savedUser)
			return res.json(savedUser);

		})
	})
})



module.exports = router;