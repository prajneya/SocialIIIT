const {User, Profile, UserDets, UserSub} = require("../models/User");
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
	getUserSub: async function getUserSub(id){
		ret = {};
		await UserSub.findById(id).then((UserSub) => {
			ret = UserSub.sub;
		});
		return ret;
	},
	getUserDetsById: async function getUserDetsById(id){
		ret = {};
		await UserDets.findById(id).then((UserDets) => {
			ret = UserDets;
		});
		return ret;
	},
	updateFriendlist: async function (ida, idb){
		await Profile.update( { _id: ida }, { $push: { friends: idb } } ); 
		await Profile.update( { _id: idb }, { $push: { friends: ida } } ); 
	},
	updateProfileDets: async function (id, house, hosnum, hosname, sports, clubs){
		await Profile.update({_id: id}, {$set: { hosnum : hosnum, hosname : hosname, house : house, sports : sports, clubs : clubs }});
	},
	updateProfile: async function (id, cluster){
		await Profile.update({_id: id}, {$set: { cluster_no: cluster }}, {}, {});
	},
	updateDets: async function (id, arr){
		await UserDets.update({_id: id}, {$set: { hosnum : arr[0], hosname : arr[1], house: arr[2], sports : arr[3], clubs : arr[4]}})
	},
	updateAccRej: async function (ida, idb, flag = 1){
		await UserDets.update( { _id: ida }, { $pull: { request: idb } } );// this is to remove the send request from user of the friend id
		if(flag)
			await UserDets.update( { _id: idb }, { $pull: { send: ida } } );  // this is to remove the request from friend of the user
	},
	updateRequest: async function (ida, idb){
		await UserDets.update( { _id: ida }, { $push: { send: idb } } ); 
		await UserDets.update( { _id: idb }, { $push: { request: ida } } ); 
	},
	newNotif: async function (ida, idb, type){
		await UserDets.update( { _id: ida }, { $push: { notif: { user: idb, ntype: type }} } ); 
	},
	removeNotif: async function (ida, idb, type){
		await UserDets.update( { _id: ida }, { $pull: { notif: { user: idb, ntype: type }} } ); 
	},
	updateAccRejMeet: async function (ida, idb, flag = 1){
		await UserDets.update( { _id: ida }, { $pull: { requestmeet: idb } } ); // this is to remove the send request from user of the friend id
		if(flag)
			await UserDets.update( { _id: idb }, { $pull: { sendmeet: ida } } ); // this is to remove the request from friend of the user
	},
	updateRequestMeet: async function (ida, idb){
		await UserDets.update( { _id: ida }, { $push: { sendmeet: idb } } ); 
		await UserDets.update( { _id: idb }, { $push: { requestmeet: ida } } ); 
	}
}
