const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	createdAt: String,
	verified: { type: Boolean, default: false },
	rating: { type: Number, default: 1000 },
	volatility: { type: Number, default: 400.00 },
	times_answered: { type: Number, default: 0 },
	imgUrl: { type: String, default: "" }
});

const Profile = new mongoose.Schema({
	id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	house: String,
	hosnum: Number,
	hosname: String,
	sports: [String],
	clubs: [String],
	cluster_no: Number,
	batch: String,
	stream: String
});

const UserDets = new mongoose.Schema({
	id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	batch: Number,
	stream: Number,
	house: Number,
	hosnum: Number,
	hosname: Number,
	sports: [Number],
	clubs: [Number],
	send: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	request: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	sendmeet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meet' }],
	requestmeet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meet' }],
	notif: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, ntype: String, createdAt: {type: Date, default: Date.now} }],
	meets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meet' }],
});

const UserSub = new mongoose.Schema({
	id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	sub: Object
});

const skillSchema = new mongoose.Schema({
	email: String,
	skills: {}
})

const timelineSchema = new mongoose.Schema({
	id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	name: String,
	fblink: String,
	ghlink: String,
	about: String,
	pOneTitle: String,
	pOneGhLink: String,
	pOneELink: String,
	pOneDesc: String,
	pTwoTitle: String,
	pTwoGhLink: String,
	pTwoELink: String,
	pTwoDesc: String,
	pThreeTitle: String,
	pThreeGhLink: String,
	pThreeELink: String,
	pThreeDesc: String,
	blogs: [String]
})

const Meet = new mongoose.Schema({
	people: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	type: String,
	date: String,
	time: String,
	duration: Number,
	link: String,
	msg: String,
	place: String,
	notif: Boolean
});

module.exports = {User: mongoose.model('User', userSchema), Profile: mongoose.model('Profile', Profile, 'Profile'), UserDets: mongoose.model('UserDets', UserDets, 'UserDets'), UserSub: mongoose.model('UserSub', UserSub, 'UserSub'), Skills: mongoose.model('skillDetails', skillSchema, 'skillDetails'), Timeline: mongoose.model('timelineDetails', timelineSchema, 'timelineDetails'), Meet: mongoose.model('Meet', Meet, 'Meet')};
