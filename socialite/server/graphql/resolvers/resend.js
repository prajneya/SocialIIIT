const { User } = require('../../models/User')
const verify = require('../../verification')

module.exports = {
	resend: {
		async resend(_, { data }) {
			try{
				errors = {}
				var user = await User.findOne({email: data.email})
				if(!user)
					user = await User.findOne({username: data.username})

				if(user.verified)
				{
					errors.general = 'User already verified';
					throw new UserInputError('User already verified', { errors });
				}
				const send = {id: user.id, username: user.username, email: user.email, createdAt: user.createdAt}
				await verify(send)
				return 0;
			} catch(err){
                throw new Error(err);
            }
		}
	}
}
