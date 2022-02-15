const express = require("express")
const router = express.Router()
const User = require("../models/User")
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const JWT_SECRET = "sachinisActively$!Coding";

// todo Route:1 Create a user using : POST "/api/auth/createUser"
router.post(
	"/createUser",
	[
		body("name", "Enter a valid name").isLength({ min: 3 }),
		body("email", "Enter a valid email").isEmail(),
		body("password", "Password must be of atleast 5 characters").isLength({
			min: 5,
		}),
	],
	async (req, res) => {
		let success = false
		/*
     ! If there are errors,return Bad requewt and the error
     */
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// !Check whether the user with this email exist already
		try {
			let user = await User.findOne({ email: req.body.email });
			if (user) {
				return res.status(400).json({
					success,
					error: "Sorry a user with this email already exists !",
				});
			}

			const salt = await bcrypt.genSalt(10);
			const seccPassword = await bcrypt.hash(req.body.password, salt);

			user = await User.create({
				name: req.body.name,
				email: req.body.email,
				password: seccPassword,
			});
			const data = {
				user: {
					id: user.id,
				},
			};
			const authToken = jwt.sign(data, JWT_SECRET);
			success = true
			userName = user.name
			res.json({ success, authToken, userName });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal server error");
		}
	}
);

// todo Route:2 Authenticate a user using : POST "/api/auth/login"
router.post(
	"/login",
	[
		body("email", "Enter a valid email").isEmail(),
		body("password", "Password must not be blank").exists(),
	],
	async (req, res) => {
		let success = false
		/*
     ! If there are errors,return Bad requewt and the error
     */
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res
					.status(400)
					.json({success, error: "Please enter correct credentials" });
			}
			const passwordCompare = await bcrypt.compare(
				password,
				user.password
			);
			if (!passwordCompare) {
				return res
					.status(400)
					.json({success, error: "Please enter correct credentials" });
			}

			const data = {
				user: {
					id: user.id,
				},
			};
			const authToken = jwt.sign(data, JWT_SECRET);

			success = true
			res.json({ success, authToken, userName:user.name });
		} catch (error) {
			console.error(error.message);
			res.status(500).send("Internal server error");
		}
	}
);

module.exports = router;
