const {User, Profile} = require('../../models/User');
const {recomain, getscore} = require('../../recosys/score')

module.exports = {
	recommend: {
		async recommend(_, { id }) {
			return await recomain(id);
		}
	}
}
