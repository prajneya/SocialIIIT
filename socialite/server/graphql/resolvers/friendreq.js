const {User, Profile} = require('../../models/User');
const friend = require('../../frenrequst/friend')

module.exports = {
	frenaccept: {
		async frenaccept(_, { user_id, fren_id }) {
			return await friend.frenaccept(user_id, fren_id);
		}
	},
	frenreject: {
		async frenreject(_, { user_id, fren_id }) {
			return await friend.frenreject(user_id, fren_id);
		}
	},
	frenrequest: {
		async frenrequest(_, { user_id, fren_id }) {
			return await friend.frenrequest(user_id, fren_id);
		}
	},
}