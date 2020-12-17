const userPartialTextSearch = require('../../userSearch')

module.exports = {
	userSearch: {
		async searchForUsers(_, { query }) {
			try{
				const Users = await userPartialTextSearch(query);
				return await Users;
			} catch(err){
                throw new Error(err);
            }
		}
	}
}