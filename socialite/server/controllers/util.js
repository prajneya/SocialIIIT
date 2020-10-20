const User = require("../models/User");
const e = require("express");


module.exports = {
	getUserById: function getUserById(id){
		return User.findById(id, (err, user) => {
			return user;
		});
	},
	getUsers: function getUsers(){
		return User.find({}, (err, users) => {
			console.log(users);
			return users;
		});
	}
}
