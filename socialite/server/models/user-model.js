const mongoose = require('mongoose')
const uniqueval = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const User = new Schema(
    {
	email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
	roll_no: { type: Number, required: true, unique: true },
	token: { type: String, required: true, unique: true},
	friends: { type: Array, required: false }
    },
    { timestamps: true },
)

User.plugin(uniqueval, { message: 'Error, {PATH} already exists!' })
module.exports = mongoose.model('users', User)

