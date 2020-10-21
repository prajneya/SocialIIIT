const {User, Profile} = require("../models/User");
const e = require("express");


module.exports = {
	getProfileById: async function getProfileById(id){
		ret = {};
		await Profile.findById(id, (err, profile) => {
			ret = profile;
		});
		return ret;
	},
	getProfiles: async function getProfiles(){
		ret = [{}];
		await Profile.find({}, (err, profiles) => {
			ret = profiles;
		});
		return ret;
	},
	getUserEmail: async function (id){
		ret = ""
		await User.findById(id, (err, user) => {
			ret = user.email;
		});
		return ret;
	}
}
