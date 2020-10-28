const postResolvers = require('./posts');
const userResolvers = require('./users')
const recoResolvers = require('./recommend')

module.exports = {
	Query: {
		...postResolvers.Query,
		...recoResolvers.recommend
	},
	Mutation: {
		...userResolvers.Mutation,
		...postResolvers.Mutation
	}
}
