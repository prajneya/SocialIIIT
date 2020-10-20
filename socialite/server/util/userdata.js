const {User, Profile} = require("../models/User");
const e = require("express");


module.exports = {
	getProfileById: function getProfileById(id){
		return Profile.findById(id, (err, profile) => {
			return profile;
		});
	},
	getProfiles: function getProfiles(){
		return Profile.find({}, (err, profiles) => {
			return profiles;
		});
	},
	getUserEmail: function (id){
		return User.findById(id, (err, user) => {
			return user.email;
		});
	}
}
