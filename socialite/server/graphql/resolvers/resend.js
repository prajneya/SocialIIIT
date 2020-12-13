const verify = require('../../verification')

module.exports = {
	resend: {
		async resend(_, { data }) {
			console.log(await verify(data))
			return 0
		}
	}
}
