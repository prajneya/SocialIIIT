const postResolvers = require('./posts');
const userResolvers = require('./users')
const recoResolvers = require('./recommend')
const profileResolvers = require('./profile')
const requestResolvers = require('./friendreq')
const subResolvers = require('./sub')
const meetrequestResolvers = require('./meetreq')
const notifResolvers = require('./notif')
const searchResolvers = require('./search')
const userSearchResolvers = require('./userSearch')
const editResolvers = require('./edit')
const verifyResolvers = require('./verify')
const resendResolvers = require('./resend')
const forgotPassResolvers = require('./forgotPass')
const passChangeResolvers = require('./passChange')
const friendListResolvers = require('./friends')
const dbFixResolvers = require('./dbFix')

module.exports = {
	Query: {
		...postResolvers.Query,
		...recoResolvers.recommend,
		...profileResolvers.profile,
		...notifResolvers.Query,
		...searchResolvers.search,
		...forgotPassResolvers.forgotPass,
		...friendListResolvers.friendList,
		...userSearchResolvers.userSearch,
		...meetrequestResolvers.meetDisp,
		...meetrequestResolvers.allMeets
	},
	Mutation: {
		...userResolvers.Mutation,
		...verifyResolvers.verify,
		...postResolvers.Mutation,
		...requestResolvers.frenrequest,
		...requestResolvers.frenaccept,
		...requestResolvers.frenreject,
		...subResolvers.subsave,
		...meetrequestResolvers.meetrequest,
		...meetrequestResolvers.meetEdit,
		...meetrequestResolvers.meetaccept,
		...meetrequestResolvers.meetreject,
		...editResolvers.edit,
		...resendResolvers.resend,
		...passChangeResolvers.passChange,
		...dbFixResolvers.dbFix
	}
}
