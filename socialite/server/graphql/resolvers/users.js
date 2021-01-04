const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server')
const cloudinary = require("cloudinary");

const { usernameVal, validateRegisterInput, validateLoginInput } = require('../../util/validators')
const { SECRET_KEY, VERIFY_KEY, CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = require('../../config');
const {User, Profile, UserDets, Timeline, Badge} = require('../../models/User');
const checkAuth = require('../../util/check-auth');

const util = require('../../util/userdata')
const {scoring, common, resetratio} = require('../../recosys/content')
const verify = require('../../verification')

const {ObjectId} = require('mongodb');


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
    { expiresIn: '365d' }
  );
}

module.exports = {
	Query:{
		async getPotentialBadges(_, {}, context){
			try{
				var user = checkAuth(context);

				var badgeUser = await Badge.findById(user.id);

				if(badgeUser){
					return badgeUser.potential;
				}
				else{
					return [];
				}
			} catch(err){
				throw new Error(err);
			}
		},
		async getBadge(_, {}, context){
			try{
				var user = checkAuth(context);

				var badgeUser = await Badge.findById(user.id);

				if(badgeUser){
					return badgeUser.display;
				}
				else{
					return "NoBadge";
				}
			} catch(err){
				throw new Error(err);
			}
		},
		async getBadgeById(_, { id }){
			try{

				var badgeUser = await Badge.findById(id);

				if(badgeUser){
					return badgeUser.display;
				}
				else{
					return "NoBadge";
				}
			} catch(err){
				throw new Error(err);
			}
		}
	},
	Mutation: {

		async login(_, { credential, password }) {
		errors = {}
		var user = await User.findOne({ email: credential});
		if (!user) {
		user = await User.findOne({ username: credential});
		}

	      if (!user) {
	        errors.general = 'User not found';
	        throw new UserInputError('User not found', { errors });
	      }

	      if (!user.verified) {
	        errors.general = 'User not verified';
	        throw new UserInputError('User not verified', { errors });
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
			const { valid, errors } = validateRegisterInput(email, username, password, confirmPassword)
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
		async updateProfile(_, { name, username, fblink, ghlink, about, house, clubs, hostel, sports, pOneTitle, pOneGhLink, pOneELink, pOneDesc, pTwoTitle, pTwoGhLink, pTwoELink, pTwoDesc, pThreeTitle, pThreeGhLink, pThreeELink, pThreeDesc, roomNo }, context) {
			try{
				const user = checkAuth(context);

				usernameErr = usernameVal(username)
				const user_byName = await User.findOne({ username });
				if(user_byName && user_byName._id != user.id){
					throw new UserInputError('Username is already taken', {
						errors: {
							username: username + ' is already taken'
						}
					})
				}

				else if(usernameErr != "")
				{
					errors.general = usernameErr;
					throw new UserInputError(usernameErr, { errors });
				}

				await User.updateOne({_id: user.id}, { $set: { username: username } })

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
			} catch(err){
				throw new Error(err);
			}

		},
		async addBadge(_, { display }, context){
			try{
				const user = checkAuth(context);

				const badgeUser = await Badge.findById(user.id);
				if(badgeUser){
					await Badge.updateOne({_id: user.id}, {$set: {display: display}});
					return display;
				}
				else{
					const newBadgeUser = new Badge({
						_id: user.id,
						potential: [],
						display: display
					})
					await newBadgeUser.save();

					return display;
				}
			} catch (err){
				throw new Error(err);
			}
			
		},
		async removeBadge(_, {}, context){
			try{
				const user = checkAuth(context);

				const badgeUser = await Badge.findById(user.id);
				if(badgeUser){
					await Badge.updateOne({_id: user.id}, {$set: {display: "NoBadge"}});
					return "NoBadge";
				}
				else{
					throw new Error("No Badge alloted.")
				}
			} catch (err){
				throw new Error(err);
			}
			
		},
	}
}
