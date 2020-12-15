const {User, Profile} = require('../../models/User');
const meet = require('../../meetrequest/meet')

module.exports = {
	meetaccept: {
		async meetaccept(_, { user_id, fren_id }) {
			try{
				return await meet.meetaccept(user_id, fren_id);
			} catch(err){
                throw new Error(err);
            }
		}
	},
	meetreject: {
		async meetreject(_, { user_id, fren_id }) {
			try{
				return await meet.meetreject(user_id, fren_id);
			} catch(err){
                throw new Error(err);
            }
		}
	},
	meetrequest: {
		async meetrequest(_, { user_id, fren_id }) {
			try{
				return await meet.meetrequest(user_id, fren_id);
			} catch(err){
                throw new Error(err);
            }
		}
	},
}