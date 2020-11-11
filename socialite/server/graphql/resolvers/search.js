const postFullTextSearch = require('../../search')

module.exports = {
	search: {
		async searchByTextPost(_, { query }) {
			const Posts = await postFullTextSearch(query);
			return await Posts;
		}
	}
}