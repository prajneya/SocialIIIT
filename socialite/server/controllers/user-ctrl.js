const User = require("../models/user-model");
const valReg = require("../validation/signup");

const validate = require("validator");
const empty = require("is-empty");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const e = require("express");

host = {}

createUser = async (req, res) => {
	const body = req.body;

	if (!body) {
		return res.status(400).json({
			success: false,
			error: "You must provide a user",
		});
	}

	const errors = valReg(body);
	if (!empty(errors)) return res.status(400).json(errors);

	delete body.password2;
	const newUser = await new User(body);

	crypt.genSalt(10, (err, salt) => {
		crypt.hash(newUser.password, salt, async (err, hash) => {
			if (err) throw err;

			newUser.password = hash;
			ret = await save(newUser, "User created!", "User not created!");

			if (ret.stat == 201) {
				host = req.get("host");
				token = tokenGen(
					{
						userid: newUser._id,
						time: newUser.createdAt,
						email: newUser.email,
					},
					true
				);
				res.redirect(307, "https://" + host + "/api/user/send?token=" + token);
			} else return res.status(ret.stat).json(ret.obj);
		});
	});
};


getUserById = async (req, res) => {
	body = req.body;

	await jwt.verify(body.token, secret, (err, ret) => {
		if (!empty(err)) return res.status(400).json(err);

		payload = ret.userid;
	});

	await User.findById(payload, (err, user) => {
		if (err) {
			return res.status(400).json({ success: false, error: err });
		}

		if (!user) {
			return res.status(404).json({ success: false, error: `User not found` });
		}
		return res.status(200).json({ success: true, data: user });
	}).catch((err) => console.log(err));
};

module.exports = {
	createUser,
	getUserById
};
