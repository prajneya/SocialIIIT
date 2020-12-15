const {User, Profile} = require('../../models/User');
const profiledisp = require('../../profile')

module.exports = {
	profile: {
		async profile(_, { curid, id }) {
			try{
				return await profiledisp(curid, id);
			} catch(err){
                throw new Error(err);
            }
		}
	}
}
