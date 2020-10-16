const User = require("../models/user-model");

const validate = require("validator");
const empty = require("is-empty");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const e = require("express");


host = {}

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
	getUserbyId
};
