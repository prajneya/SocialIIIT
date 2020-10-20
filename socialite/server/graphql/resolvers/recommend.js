const {User, Profile} = require('../../models/User');
const recomain = require('../../recosys/collab')

module.exports = {
	recommend: {
		async recommend(_, { id }) {
			return recomain(id);
		}
	}
}
