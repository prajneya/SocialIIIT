const {User, Profile} = require('../../models/User');
const meet = require('../../meetrequest/meet')

module.exports = {
	meetaccept: {
		async meetaccept(_, { user_id, fren_id }) {
			return await meet.meetaccept(user_id, fren_id);
		}
	},
	meetreject: {
		async meetreject(_, { user_id, fren_id }) {
			return await meet.meetreject(user_id, fren_id);
		}
	},
	meetrequest: {
		async meetrequest(_, { user_id, fren_id }) {
			return await meet.meetrequest(user_id, fren_id);
		}
	},
}