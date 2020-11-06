const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	createdAt: String,
	rating: { type: Number, default: 1000 },
	volatility: { type: Number, default: 400.00 },
	times_answered: { type: Number, default: 0 }
});

const Profile = new mongoose.Schema({
	id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	house: String,
	hosnum: Number,
	hosname: String,
	sports: [String],
	clubs: [String],
	cluster_no: Number
});

const UserDets = new mongoose.Schema({
	id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	house: Number,
	hosnum: Number,
	hosname: Number,
	sports: [Number],
	clubs: [Number],
	send: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	request: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	sendmeet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	requestmeet: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const UserSub = new mongoose.Schema({
	id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	sub: Object
});

module.exports = {User: mongoose.model('User', userSchema), Profile: mongoose.model('Profile', Profile, 'Profile'), UserDets: mongoose.model('UserDets', UserDets, 'UserDets'), UserSub: mongoose.model('UserSub', UserSub, 'UserSub')};
