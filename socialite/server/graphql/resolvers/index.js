const postResolvers = require('./posts');
const userResolvers = require('./users')
const recoResolvers = require('./recommend')
const profileResolvers = require('./profile')

module.exports = {
	Query: {
		...postResolvers.Query,
		...recoResolvers.recommend,
		...profileResolvers.profile
	},
	Mutation: {
		...userResolvers.Mutation,
		...postResolvers.Mutation
	}
}
