const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  email: String,
  password: String,
  createdAt: String
});

//const userFriends = new Schema({
	//id: String,
	//friends: { type: [ {type: String} ] }
//});
module.exports = model('User', userSchema);
