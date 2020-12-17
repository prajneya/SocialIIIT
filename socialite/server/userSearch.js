const { User } = require('./models/User.js');

module.exports = async function userPartialTextSearch(query) {
	try{
		const pipeline = [
		{
			'$match': {
		      '$or': [
		        {
		          'username': {
		            '$regex': query, 
		            '$options': 'i'
		          }
		        }, {
		          'email': {
		            '$regex': query, 
		            '$options': 'i'
		          }
		        }
		      ]
		    }
		}
		];

		const aggCursor = User.aggregate(pipeline);
		return aggCursor;
	} catch(err){
		throw new Error(err);
	}
}
