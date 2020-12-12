const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server')
const cloudinary = require("cloudinary");

const { validateRegisterInput, validateLoginInput } = require('../../util/validators')
const { SECRET_KEY, VERIFY_KEY, CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('../../config');
const {User, Profile, UserDets, Timeline} = require('../../models/User');
const checkAuth = require('../../util/check-auth');

const util = require('../../util/userdata')
const {scoring, common, resetratio} = require('../../recosys/content')
const mail = require('../../email')


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

async function verify(user) 
{
	tok = jwt.sign(
		{
			id: user.id,
			email: user.email,
			username: user.username,
			time: user.createdAt
		},
		VERIFY_KEY,
		{ expiresIn: '1h' }
	);

	link = "https://localhost:3000/verify/" + tok;
	msg = `Kindly click on the attached link to verify your account: ${link}`;
	return err = await mail(user.email, "Account Verification", msg);
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
			{ registerInput: { username, email, password, confirmPassword, batch, stream } 
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
				_id: res.id,
				cluster_no: -1,
				batch: batch,
				stream: stream,
				hosnum: -1,
				hosname: "",
				house: ""
			});

			const ret = await newProfile.save();

			const newDets = new UserDets({
				_id: res.id,
				batch: 0,
				stream: 0,
				hosname: 0,
				hosnum: 0,
				house: 0
			});

			const rex = await newDets.save();

			console.log(await verify(res));
			//const token = generateToken(res);
			const token = ""

			return {
				...res._doc,
				id: res._id,
				token
			}
		},
		uploadPhoto: async (_, { photo }, context) => {

			const user = checkAuth(context);

			const { stream } = await photo;
		//initialize cloudinary
		      cloudinary.config({
		        cloud_name: CLOUDINARY_NAME,
		        api_key: CLOUDINARY_API_KEY,
		        api_secret: CLOUDINARY_API_SECRET,
		      });
		/*
		try-catch block for handling actual image upload
		*/
		      try {

		      	await new Promise((resolve, reject) => {
                const streamLoad = cloudinary.v2.uploader.upload_stream({ folder: "profile_pics", public_id: user.id }, async function (error, result) {
                    if (result) {
                        resultUrl = result.secure_url;
                        resultSecureUrl = result.secure_url;

                        await User.updateOne({_id: user.id}, { $set: { imgUrl: resultUrl } });

                        resolve(resultUrl)
                    } else {
                        reject(error);
                    }
                });

                stream.pipe(streamLoad);
            });
        }catch (e) {
		//returns an error message on image upload failure.
		        return `Image could not be uploaded`;
		      }
		/*returns uploaded photo url if successful `result.url`.
		if we were going to store image name in database,this
		*/
		      return `Successfully uploaded!`;
		},
		async updateProfile(_, { name, fblink, ghlink, about, house, clubs, hostel, sports, pOneTitle, pOneGhLink, pOneELink, pOneDesc, pTwoTitle, pTwoGhLink, pTwoELink, pTwoDesc, pThreeTitle, pThreeGhLink, pThreeELink, pThreeDesc, roomNo }, context) {
			
			const user = checkAuth(context);

			sports_arr = [];
			for(sport in sports){
				sports_arr.push(sport);
			}

			clubs_arr = [];
			for(club in clubs){
				clubs_arr.push(club);
			}

			await util.updateProfileDets(user.id, house, roomNo, hostel, sports_arr, clubs_arr)
			cur1 = await util.getProfileById(user.id);
			arr = cur1.friends;
			if(arr.length)
			{
				ret = await resetratio(cur1, arr);
				await util.updateDets(user.id, ret);
			}

			for(var i = 0; i < arr.length; ++i)
			{
				cur = await util.getProfileById(arr[i]);
				ret = await resetratio(cur, cur.friends);
				await util.updateDets(cur._id, ret);
			}

			const timelineData = await Timeline.findById(user.id);

			if(timelineData){
				await Timeline.updateOne({_id: user.id}, {$set: { 
					name: name, fblink: fblink, ghlink: ghlink, about: about, 
					pOneTitle: pOneTitle, pOneGhLink: pOneGhLink, pOneELink: pOneELink, pOneDesc: pOneDesc,
					pTwoTitle: pTwoTitle, pTwoGhLink: pTwoGhLink, pTwoELink: pTwoELink, pTwoDesc: pTwoDesc,
					pThreeTitle: pThreeTitle, pThreeGhLink: pThreeGhLink, pThreeELink: pThreeELink, pThreeDesc: pThreeDesc
				}});
			}
			else{
				const newTimelineData = new Timeline({
	                _id: user.id,
	                name,
	                fblink,
	                ghlink,
	                about,
	                pOneTitle,
	                pOneGhLink,
	                pOneELink,
	                pOneDesc,
	                pTwoTitle,
	                pTwoGhLink,
	                pTwoELink,
	                pTwoDesc,
	                pThreeTitle,
	                pThreeGhLink,
	                pThreeELink,
	                pThreeDesc
            	});

            	await newTimelineData.save();
			}

		}
	}
}
