const {User, Profile} = require('../../models/User');
const friend = require('../../frenrequst/friend')

module.exports = {
	frenaccept: {
		async frenaccept(_, { user_id, fren_id }) {
			try{
				return await friend.frenaccept(user_id, fren_id);
			} catch(err){
                throw new Error(err);
            }
		}
	},
	frenreject: {
		async frenreject(_, { user_id, fren_id }) {
			try{
				return await friend.frenreject(user_id, fren_id);
			} catch(err){
                throw new Error(err);
            }
		}
	},
	frenrequest: {
		async frenrequest(_, { user_id, fren_id }) {
			try{
				return await friend.frenrequest(user_id, fren_id);
			} catch(err){
                throw new Error(err);
            }
		}
	},
}
