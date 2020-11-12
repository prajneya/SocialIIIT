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
				for(let i = 0; i < curdets.request.length; ++i)
				{
					mat = await getscore(id, curdets.request[i]);
					ret.push({userId: curdets.request[i], match: mat[0].match, email: mat[0].email, type: "friend"});
					j++;
				}	
				for(let i = 0; i < curdets.requestmeet.length; ++i)
				{
					mat = await getscore(id, curdets.requestmeet[i]);
					ret.push({userId: curdets.requestmeet[i], match: mat[0].match, email: mat[0].email, type: "meet"});
					j++;
				}	
				if(!curdets.request.length && !curdets.requestmeet.length)
				{
					throw new Error('No new notification');
				}
				return	ret;
			} 
			catch (err)
			{
				throw new Error(err);
			}
		}
	}
}
