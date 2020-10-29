const {User, Profile} = require("../models/User");
const e = require("express");


module.exports = {
	getProfileById: async function getProfileById(id){
		ret = {};
		await Profile.findById(id).then((profile) => {
			ret = profile;
		});
		return ret;
	},
	getProfiles: async function getProfiles(){
		ret = [{}];
		await Profile.find({}).then((profiles) => {
			ret = profiles;
		});
		return ret;
	},
	getUserEmail: async function (id){
		ret = ""
		await User.findById(id).then((user) => {
			ret = user.email;
		});
		return ret;
	},
	updateProfile: async function (id, cluster){
		await Profile.update({_id: id}, {$set: { cluster_no: cluster }}, {}, {});
	}
}
