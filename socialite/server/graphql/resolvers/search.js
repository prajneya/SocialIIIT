const postFullTextSearch = require('../../search')

module.exports = {
	search: {
		async searchByTextPost(_, { query }) {
			try{
				const Posts = await postFullTextSearch(query);
				return await Posts;
			} catch(err){
                throw new Error(err);
            }
		}
	}
}