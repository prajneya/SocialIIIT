const data = require("../util/userdata");
const { UserDets, Meet } = require("../models/User")

const moment = require("moment-timezone")
const schedule = require('node-schedule-tz')
const { UserInputError } = require('apollo-server')

async function meetaccept(user_id, fren_id)
{
	try{
		var meet = await data.getMeet(user_id, fren_id);	
		await data.updateAccRejMeet(user_id, fren_id, meet._id);	
		await data.newNotif(fren_id, user_id, "macc");
		await data.removeNotif(user_id, fren_id, "mreq");
		await data.newNotif(user_id, fren_id, "macc");
	} catch(err){
		throw new Error(err);
	}
}

async function meetreject(user_id, fren_id)
{
	try{
		var meet = await data.getMeet(user_id, fren_id);	
		await data.updateAccRejMeet(user_id, fren_id, meet._id, 0);
		await data.removeNotif(user_id, fren_id, "mreq");
		await Meet.deleteOne({_id: meet._id})
	} catch(err){
		throw new Error(err);
	}
}

async function meetrequest(meetdata)
{
	try{
		errors = {}
		fdate = moment(meetdata.date).format("DD-MM-YYYY")
		ftime = moment(moment(meetdata.time, "HH:mm:ss")).format("HH:mm:ss")
		var fts = moment(`${fdate} ${ftime}`, 'DD-MM-YYYY HH:mm:ss').format();
		fts = moment(fts)
		var now = moment().format('YYYY-MM-DD HH:mm:ss')
		now = moment(now)

		if(now > fts)
		{
			errors.general = 'Invalid timestamp';
			throw new UserInputError('Invalid starting date', { errors });
		}

		user_id = meetdata.sender
		fren_id = meetdata.sendee
		await data.newNotif(fren_id, user_id, "mreq");

		const newMeet = new Meet({
			people: [user_id, fren_id],
			type: meetdata.type,
			date: meetdata.date,
			time: meetdata.time,
			duration: meetdata.duration,
			link: meetdata.link,
			msg: meetdata.msg,
			place: meetdata.place,
			notif: meetdata.notif
		});

		if(meetdata.notif)
		{
			var task = schedule.scheduleJob('mail', moment(now).format(), 'Asia/Kolkota', function() {
				console.log("hi")
			})
		}
		await newMeet.save().then(async(saved) => {
			await data.updateRequestMeet(user_id, fren_id, saved._id);
			});
	} catch(err){
		throw new Error(err);
	}
}

async function meetDisp(user, other)
{
	try{
		var meet = await data.getMeet(user, other);	
		return meet
	} catch(err){
		throw new Error(err);
	}
}

async function allMeets(user)
{
	try{
		var meets, m, meetDets = []
		await UserDets.findOne({_id: user}).then((dets) => {
			meets = dets.meets
		})

		for(var i = 0; i < meets.length; ++i)
		{
			m = await Meet.findOne({_id: meets[i]})
			meetDets.push(m)
		}

		return meetDets
	} catch(err){
		throw new Error(err);
	}
}


async function meetEdit(meetdata)
{
	try{
		errors = {}
		fdate = moment(meetdata.date).format("DD-MM-YYYY")
		ftime = moment(moment(meetdata.time, "HH:mm:ss")).format("HH:mm:ss")
		var fts = moment(`${fdate} ${ftime}`, 'DD-MM-YYYY HH:mm:ss').format();
		fts = moment(fts)
		var now = moment().format('YYYY-MM-DD HH:mm:ss')
		now = moment(now)

		if(now > fts)
		{
			errors.general = 'Invalid timestamp';
			throw new UserInputError('Invalid starting date', { errors });
		}

		user_id = meetdata.sender
		fren_id = meetdata.sendee
		var meet = await data.getMeet(user_id, fren_id);	

		await data.removeNotif(user_id, fren_id, "mreq");
		await data.newNotif(fren_id, user_id, "mreq");

		await Meet.updateOne({_id: meet._id}, {$set: {
			type: meetdata.type,
			date: meetdata.date,
			time: meetdata.time,
			duration: meetdata.duration,
			link: meetdata.link,
			msg: meetdata.msg,
			place: meetdata.place,
			notif: meetdata.notif
		}});

		if(meetdata.notif)
		{
			console.log("ni")
			var task = schedule.scheduleJob('mail', moment(now).format(), 'Asia/Kolkota', function() {
				console.log("hi")
			})
		}

		await data.updateAccRejMeet(user_id, fren_id, meet._id, 0);
		await data.updateRequestMeet(user_id, fren_id, meet._id);
	} catch(err){
		throw new Error(err);
	}
}


module.exports = { "meetrequest": meetrequest, "meetaccept": meetaccept, "meetreject": meetreject, "meetDisp": meetDisp, "allMeets": allMeets, "meetEdit": meetEdit };
