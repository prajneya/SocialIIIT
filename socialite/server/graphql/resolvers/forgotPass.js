const jwt = require('jsonwebtoken')
const { UserInputError } = require('apollo-server')
const { User } = require('../../models/User')
const mail = require('../../email')
const { VERIFY_KEY } = require('../../config')

module.exports = {
	forgotPass: {
		async forgotPass(_, { email }) {

			errors = {}
			const user = await User.findOne({email: email})
			if (!user) {
				errors.general = 'Email not registered';
				throw new UserInputError('Email not registered', { errors });
			}

			if (!user.verified) {
				errors.general = 'Email not verified';
				throw new UserInputError('Email not verified', { errors });
			}

			token = jwt.sign(
				{
					id: user.id,
					email: user.email,
					username: user.username,
					time: user.createdAt
				},
				VERIFY_KEY,
				{ expiresIn: '1h' }
			);

			link = "https://peersity.in/passChange/" + token;
			msg = `Kindly click on the attached link to change your password: ${link}`;
			err = await mail(user.email, "Reset Password", msg);
			if(err)
			{
				errors.general = err;
				throw new UserInputError(err, { errors });
			}
		}
	}
}
