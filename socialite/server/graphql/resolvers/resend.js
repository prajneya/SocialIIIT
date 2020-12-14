const { User } = require('../../models/User')
const verify = require('../../verification')

module.exports = {
	resend: {
		async resend(_, { data }) {

			const user = await User.findOne({email: data.email, username: data.username})
			const send = {id: user.id, username: user.username, email: user.email, createdAt: user.createdAt}
			console.log(await verify(send))
			return 0
		}
	}
}
