const {User, Profile, UserDets, UserSub} = require("../../models/User");
const data = require("../../util/userdata");
const {scoring, common, resetratio} = require('../../recosys/content')


module.exports = {
	edit: {
		async edit(_, { input }) {
			try{
				await data.updateProfileDets(input.user_id, input.house, input.hosnum, input.hosname, input.sports, input.clubs);
				const cur1 = await data.getProfileById(input.user_id);
				arr = cur1.friends;
				console.log(cur1.sports.length);
				ret = await resetratio(cur1, arr);
				return await data.updateDets(input.user_id, ret);
			} catch(err){
                throw new Error(err);
            }
		}
	}
}
