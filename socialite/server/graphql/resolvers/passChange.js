const bcrypt = require('bcryptjs');
const { UserInputError } = require('apollo-server')
const { validateRegisterInput, validateLoginInput } = require('../../util/validators')
const jwt = require('jsonwebtoken')
const { User } = require('../../models/User')
const { VERIFY_KEY } = require('../../config')

module.exports = {
	passChange: {
		async passChange(_, { token, password, confirmPassword }) {

			await jwt.verify(token, VERIFY_KEY, (err, ret) => {
				if (err) 
					throw new UserInputError('Errors', { errors });
				payload = ret;
			});

			const { valid, errors } = validateRegisterInput(payload.email, password, confirmPassword)
			if(!valid){
				throw new UserInputError('Errors', { errors });
			}

			hash = await bcrypt.hash(password, 12);
			await User.updateOne({_id: payload.id}, {$set:{password: hash}});
			return 0
		}
	}
}
