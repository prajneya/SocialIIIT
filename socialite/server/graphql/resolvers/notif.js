const {User, Profile, UserDets, UserSub} = require("../../models/User");
const data = require("../../util/userdata");
const recomain = require('../../recosys/score')


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
                	mat = await recomain.match(id, curdets.request[i]);
					ema =  await data.getUserEmail(curdets.request[i]);
					ret.push({id: curdets.request[i], match: mat, email: ema, reqtype: "friend"});
					//console.log(ret[j].id, ret[j].email, ret[j].reqtype);
                	j++;
                }	
                for(let i = 0; i < curdets.requestmeet.length; ++i)
                {
                	mat = await recomain.match(id, curdets.requestmeet[i]);
					ema =  await data.getUserEmail(curdets.requestmeet[i]);
					ret.push({id: curdets.requestmeet[i], match: mat, email: ema, reqtype: "meet"});
					//console.log(ret[j].id, ret[j].email, ret[j].reqtype);
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
