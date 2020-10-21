const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  createdAt: String
});

const Profile = new mongoose.Schema({
	id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	house: String,
	hosnum: Number,
	hosname: String,
	sports: [String],
	clubs: [String]
});

module.exports = {User: mongoose.model('User', userSchema), Profile: mongoose.model('Profile', Profile, 'Profile')};
