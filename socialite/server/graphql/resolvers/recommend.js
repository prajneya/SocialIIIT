const {User, Profile} = require('../../models/User');
const {recomain, getscore} = require('../../recosys/score')

module.exports = {
	recommend: {
		async recommend(_, { id }) {
			try{
				return await recomain(id);
			} catch(err){
                throw new Error(err);
            }
		}
	}
}
