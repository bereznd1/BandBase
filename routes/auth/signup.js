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

	//CHECKING FOR DUPLICATES
	User.find ({ $or:[ {'username':username}, {'name':name}, {'facebook':facebook}, {'email':email}, {'bandcamp':bandcamp}, {'soundcloud':soundcloud}, {'img':img} ]}, 
	
	(err, users) => {
		var errors = "";
		if (users && users.length>0) {
			if (users[0].username === username)
			{
				errors += `Sorry, already a user with the Username: ${username}. Please enter a different Username. \n\n`;
			}

			if (users[0].name.toLowerCase() === name.toLowerCase())
			{
				errors += `Sorry, already a user with the Band Name: ${name}. Please enter a different Band Name. \n\n`;
			}


			if (users[0].facebook === facebook)
			{
				errors += `Sorry, already a user with the Facebook URL that you entered. Please enter a different Facebook URL. \n\n`;
			}

			if (users[0].email === email)
			{
				errors += `Sorry, already a user with the Email Address: ${email}. Please enter a different one. \n\n`;
			}

			if (users[0].bandcamp === bandcamp)
			{
				errors += `Sorry, already a user with the Bandcamp URL that you entered. Please enter a different Bandcamp URL. \n\n`;
			}

			if (users[0].soundcloud === soundcloud)
			{
				errors += `Sorry, already a user with the Soundcloud URL that you entered. Please enter a different Soundcloud URL. \n\n`;
			}

			if (users[0].img === img)
			{
				errors += `Sorry, already a user with the Img URL that you entered. Please enter a different Img URL. \n\n`;
			}

			if (errors)
			{
				return res.json({
					error: errors
				})
			}

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