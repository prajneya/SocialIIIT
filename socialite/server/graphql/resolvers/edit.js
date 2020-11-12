const {User, Profile, UserDets, UserSub} = require("../../models/User");
const data = require("../../util/userdata");
const {scoring, common, resetratio} = require('../../recosys/content')


module.exports = {
	edit: {
		async edit(_, { user_id, hou, hsnum, hsname, sprts, clbs }) {
			await data.updateProfileDets(user_id, hou, hsnum, hsname, sprts, clbs);
			const cur1 = await data.getProfileById(user_id);
			// console.log(cur1);
			arr = cur1.friends;
			console.log(cur1.sports.length);
			ret = await resetratio(cur1, arr);
			return await data.updateDets(user_id, ret);
		}
	}
}
