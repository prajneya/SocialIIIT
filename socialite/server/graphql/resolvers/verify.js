const jwt = require('jsonwebtoken');
const {User, Profile} = require('../../models/User');
const { VERIFY_KEY } = require('../../config')

module.exports = {
	verify: {
		async verify(_, { token }) {
			//if (req.protocol + "://" + req.get("host") == "https://" + host) {
			flag = 0
				await jwt.verify(token, VERIFY_KEY, (err, ret) => {
					if (err) 
					{
						console.log(err)
						flag = 1
					}

					payload = ret;
				});

			if(flag)
				return -1
			exist = await User.exists({ _id: payload.id, email: payload.email, username: payload.username, createdAt: payload.time })
			if(exist)
			{
				await User.updateOne({ _id: payload.id, email: payload.email, username: payload.username, createdAt: payload.time }, {$set: {verified: true}});
			return 0
			}
			else
				return -1
		}
	}
}
