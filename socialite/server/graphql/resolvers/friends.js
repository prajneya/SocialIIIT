const {User, Profile} = require('../../models/User');
const util = require('../../util/userdata')

module.exports = {
	friendList: {
		async friendList(_, { id }) {
			try{
				user = await util.getProfileById(id)
				var ret = []
				for(var i = 0; i < user.friends.length; ++i)
				{
					info = await util.getUserInfo(user.friends[i])
					ret.push({
						id: user.friends[i],
						username: info.username,
						email: info.email
					})
				}

				return ret;
			} catch(err){
                throw new Error(err);
            }
		}
	}
}
