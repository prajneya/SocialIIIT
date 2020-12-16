const jwt = require('jsonwebtoken');
const {User, Profile} = require('../../models/User');
const { SECRET_KEY, VERIFY_KEY } = require('../../config')

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      rating: user.rating,
      times_answered: user.times_answered,
      imgUrl: user.imgUrl
    },
    SECRET_KEY,
    { expiresIn: '2h' }
  );
}

module.exports = {
	verify: {
		async verify(_, { tok }) {
			errors = {}
			flag = 0
				await jwt.verify(tok, VERIFY_KEY, (err, ret) => {
					if (err) 
					{
						errors.general = 'Link expired';
						throw new UserInputError('Link expired', { errors });
					}

					payload = ret;
				});

			user = await User.findOne({ _id: payload.id, email: payload.email, username: payload.username, createdAt: payload.time })
			if(user)
			{
				await User.updateOne({ _id: payload.id, email: payload.email, username: payload.username, createdAt: payload.time }, {$set: {verified: true}});
				return {
					id: user.id,
					email: user.email,
					createdAt: user.createdAt,
					token: generateToken(user),
					username: user.username
				}
			}

			else
			{
				errors.general = 'User not found';
				throw new UserInputError('User not found', { errors });
			}
		}
	}
}
