const { Post } = require('./models/Post.js');

module.exports = async function postFullTextSearch(query) {
	try{
		const pipeline = [
		{
			'$search': {
			'text': {
				'query': query, 
				'path': [
				'title', 'body', 'tags'
				],
				'fuzzy': {
			      'maxEdits': 2,
			      'prefixLength': 3
			    }
			}, 
			'highlight': {
				'path': 'body'
			}
			}
		}
		];

		const aggCursor = Post.aggregate(pipeline);
		return aggCursor;
	} catch(err){
		throw new Error(err);
	}
}
