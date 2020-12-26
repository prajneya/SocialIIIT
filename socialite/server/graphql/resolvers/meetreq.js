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
		async meetrequest(_, { data }) {
			try{
				return await meet.meetrequest(data);
			} catch(err){
                throw new Error(err);
            }
		}
	},
	meetDisp: {
		async meetDisp(_, { user, other }) {
			try{
				return await meet.meetDisp(user, other);
			} catch(err){
				throw new Error(err);
			}
		}
	},
	allMeets: {
		async allMeets(_, { user }) {
			try{
				return await meet.allMeets(user);
			} catch(err){
				throw new Error(err);
			}
		}
	},
	meetEdit: {
		async meetEdit(_, { data }) {
			try{
				return await meet.meetEdit(data);
			} catch(err){
                throw new Error(err);
            }
		}
	},
}
