const {User, Profile, UserDets, UserSub} = require("../../models/User");
const data = require("../../util/userdata");
const {recomain, getscore} = require('../../recosys/score')


module.exports = {
	Query: 
	{
		async getNotif(_, { id })
		{
			try
			{
				const curdets =  await data.getUserDetsById(id);
				var ret = [];
				var j=0;

				for(let i = 0; i < curdets.notif.length; ++i)
				{
					mat = await getscore(id, curdets.notif[i].user);
					ret.push({userId: curdets.notif[i].user, match: mat[0].match, email: mat[0].email, type: curdets.notif[i].ntype, time: curdets.notif[i].createdAt});
					j++;
				}	

				if(!curdets.notif.length)
				{
					throw new Error('No new notification');
				}
				ret.sort((a, b) => (a.time > b.time) ? 1 : -1);
				return	ret;
			} 
			catch (err)
			{
				throw new Error(err);
			}
		}
	}
}
