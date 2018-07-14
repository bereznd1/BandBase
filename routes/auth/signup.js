const router = require("express").Router();
// const bandsController = require("../../controllers/bandsController");
const User = require('../../models/band')

// router.get('/', (req,res) => {
//     console.log('signup is working')
//     res.json(200);
// })


   

router.post('/', (req, res) => {
	const { username, password, name, location, genre, availability, facebook, email, phone, bandcamp, soundcloud, img } = req.body
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
			'img': img
			// 'img.data': fs.readFileSync(req.files.img.path),

			

		});

		// newUser.img.data = fs.readFileSync(req.files.img.path);
		// newUser.img.contentType = 'image/png';

		if (!newUser.username)
		{
			return res.status(400).send("Please enter a username.");
		}

		if (!newUser.password)
		{
			return res.status(400).send("Please enter a password.");
		}

		if (!newUser.name)
		{
			return res.status(400).send("Please enter a band name.");
		}

		if (!newUser.location)
		{
			return res.status(400).send("Please select a location.");
		}

		if (!newUser.genre)
		{
			return res.status(400).send("Please select a genre.");
		}

		if (!newUser.availability)
		{
			return res.status(400).send("Please select an availability.");
		}

		if (!newUser.email )
		{
			return res.status(400).send("Please enter your email.");
		}

		if (!newUser.facebook) {
			return res.status(400).send("Please enter your Facebook URL.");
		}

		if (!newUser.phone)
		{
			return res.status(400).send("Please enter your phone number.");
		}

		if (!newUser.bandcamp)
		{
			return res.status(400).send("Please enter your bandcamp embed.");
		}

		if (!newUser.soundcloud )
		{
			return res.status(400).send("Please enter your soundcloud embed.");
		}

		if (!newUser.img )
		{
			return res.status(400).send("Please enter an image URL.");
		}

		

		newUser.save((err, savedUser) => {
			 console.log('made it here');

			if (err) return res.json(err);
			console.log('Saved user', savedUser)
			console.log('error', err);
			return res.json(savedUser);

		})

		console.log('new user', newUser)
		
	})
})



module.exports = router;