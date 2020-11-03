const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  createdAt: String,
  rating: Number,
  volatility: Number,
  times_answered: Number
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
	request: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = {User: mongoose.model('User', userSchema), Profile: mongoose.model('Profile', Profile, 'Profile'), UserDets: mongoose.model('UserDets', UserDets, 'UserDets')};
