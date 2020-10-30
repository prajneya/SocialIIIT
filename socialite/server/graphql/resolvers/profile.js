const {User, Profile} = require('../../models/User');
const profiledisp = require('../../profile')

module.exports = {
	profile: {
		async profile(_, { curid, id }) {
			return await profiledisp(curid, id);
		}
	}
}
