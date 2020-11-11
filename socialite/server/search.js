const { Post } = require('./models/Post.js');

module.exports = async function postFullTextSearch(query) {
	const pipeline = [
	  {
	    '$search': {
	      'text': {
	        'query': query, 
	        'path': [
	          'title', 'body', 'tags'
	        ]
	      }, 
	      'highlight': {
	        'path': 'body'
	      }
	    }
	  }
	];

	const aggCursor = Post.aggregate(pipeline);

	return aggCursor;
}
