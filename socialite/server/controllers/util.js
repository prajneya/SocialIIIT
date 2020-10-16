const User = require("../models/user-model");
const e = require("express");


module.exports = function getUserById(body){
	User.findById(body.Id, (err, user) => {
		if (err) {
			console.log(err);
			return null;
		}

		if (!user) {
			console.log("User not found!");
			return null;
		}
		return user;
	}).catch((err) => console.log(err));
};
