const {User, Profile} = require('../../models/User');
const recomain = require('../../recosys/score')

module.exports = {
	recommend: {
		async recommend(_, { id }) {
			return await recomain(id);
		}
	}
}
