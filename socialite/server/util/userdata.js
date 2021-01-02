const {User, Profile, UserDets, UserSub, Meet} = require("../models/User");
const mail = require('../email')
const e = require("express");
const schedule = require('node-schedule')


module.exports = {
	mailSched: async function(ts, mdets)
	{
		fts = new Date(ts)
		var task = await schedule.scheduleJob(fts, async function() {
			err = await mail(mdets.email, mdets.title, mdets.msg);
		})
	},
	getMeet: async function getMeet(curid, id){
		curdets = await UserDets.findOne({_id: curid})
		arr1 = [curid, id]
		arr2 = [id, curid]
		var meetf = await Meet.find({people: arr1})
		var meetfb = await Meet.find({people: arr2})

		var ret = {}
		for(var i = 0; i < meetf.length; ++i)
		{
			if(await curdets.meets.includes(meetf[i]._id))
				continue
			ret = meetf[i]
			break
		}

		for(var j = 0; !Object.keys(ret).length && j < meetfb.length; ++j)
		{
			if(await curdets.meets.includes(meetfb[j]._id))
				continue
			ret = meetfb[j]
			break
		}
		return ret 
	},
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
	getUserInfo: async function (id){
		ret = {}
		await User.findById(id).then((user) => {
			ret = {email: user.email, username: user.username, imgUrl: user.imgUrl, verified: user.verified};
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
		await Profile.update({_id: id}, {$set: { cluster_no: cluster }});
	},
	updateDets: async function (id, arr){
		await UserDets.update({_id: id}, {$set: { hosnum : arr[0], hosname : arr[1], house: arr[2], sports : arr[3], clubs : arr[4], batch : arr[5], stream : arr[6]}})
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
		dets = await UserDets.findOne({_id: ida})
		ret = dets.notif[dets.notif.length - 1]._id
		return ret
	},
	removeNotif: async function (ida, idb, type){
		await UserDets.update( { _id: ida }, { $pull: { notif: { user: idb, ntype: type }} } ); 
	},
	updateAccRejMeet: async function (ida, idb, meet, flag = 1){
		await UserDets.update( { _id: ida }, { $pull: { requestmeet: meet } } ); // this is to remove the send request from user of the friend id
		await UserDets.update( { _id: idb }, { $pull: { sendmeet: meet } } ); // this is to remove the request from friend of the user

		if(flag)
		{
			await UserDets.update( { _id: ida }, { $push: { meets: meet } } ); 
			await UserDets.update( { _id: idb }, { $push: { meets: meet } } );
		}
	},
	updateRequestMeet: async function (ida, idb, meet){
		await UserDets.update( { _id: ida }, { $push: { sendmeet: meet } } ); 
		await UserDets.update( { _id: idb }, { $push: { requestmeet: meet } } ); 
	}
}
