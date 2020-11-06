const postResolvers = require('./posts');
const userResolvers = require('./users')
const recoResolvers = require('./recommend')
const profileResolvers = require('./profile')
const requestResolvers = require('./friendreq')
const meetrequestResolvers = require('./meetreq')

module.exports = {
	Query: {
		...postResolvers.Query,
		...recoResolvers.recommend,
		...profileResolvers.profile
	},
	Mutation: {
		...userResolvers.Mutation,
		...postResolvers.Mutation,
		...requestResolvers.frenrequest,
		...requestResolvers.frenaccept,
		...requestResolvers.frenreject,
		...meetrequestResolvers.meetrequest,
		...meetrequestResolvers.meetaccept,
		...meetrequestResolvers.meetreject
	}
}
