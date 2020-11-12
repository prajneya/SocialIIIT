const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server')

const { validateRegisterInput, validateLoginInput } = require('../../util/validators')
const { SECRET_KEY } = require('../../config');
const {User, Profile, UserDets} = require('../../models/User');

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
      rating: user.rating,
      times_answered: user.times_answered
    },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
}

module.exports = {
	Mutation: {

		async login(_, { email, password }) {
	      const { errors, valid } = validateLoginInput(email, password);

	      if (!valid) {
	        throw new UserInputError('Errors', { errors });
	      }

	      const user = await User.findOne({ email });

	      if (!user) {
	        errors.general = 'User not found';
	        throw new UserInputError('User not found', { errors });
	      }

	      const match = await bcrypt.compare(password, user.password);
	      if (!match) {
	        errors.general = 'Wrong credentials';
	        throw new UserInputError('Wrong credentials', { errors });
	      }

	      const token = generateToken(user);

	      return {
	        ...user._doc,
	        id: user._id,
	        token
	      };
	    },
		async register(_, 
			{ registerInput: { username, email, password, confirmPassword } 
			}
		){
			const { valid, errors } = validateRegisterInput(email, password, confirmPassword)
			if(!valid){
				throw new UserInputError('Errors', { errors });
			}
			const user = await User.findOne({ email });
			if(user){
				throw new UserInputError('Email is already taken', {
					errors: {
						email: email + ' is already taken'
					}
				})
			}
			const user_byName = await User.findOne({ username });
			if(user_byName){
				throw new UserInputError('Username is already taken', {
					errors: {
						username: username + ' is already taken'
					}
				})
			}
			password = await bcrypt.hash(password, 12);

			const newUser = new User({
				username,
				email,
				password, 
				createdAt: new Date().toISOString()
			});

			await newUser.save()
				.then((saved) => {
					res = saved;
			});

			const newProfile = new Profile({
				_id: res.id
			});

			const ret = await newProfile.save();

			const newDets = new UserDets({
				_id: res.id
			});

			const rex = await newDets.save();

			const token = generateToken(res);

			return {
				...res._doc,
				id: res._id,
				token
			}
		}
	}
}
