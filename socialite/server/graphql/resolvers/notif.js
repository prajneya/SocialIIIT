const {User, Profile, UserDets, UserSub} = require("../../models/User");
const data = require("../../util/userdata");


module.exports = {
	Query: 
	{
        async getNotif(_, { id })
        {
            try
            {
		const curdets =  await data.getUserDetsById(id);
                ret = Array(curdets.request.length+curdets.requestmeet.length).fill({});
                j=0;
                for(let i = 0; i < curdets.request.length; ++i)
                {
                	ret[j]={id:curdets.request[i]};
                	j++;
                }	
                for(let i = 0; i < curdets.requestmeet.length; ++i)
                {
                	ret[j]={id:curdets.requestmeet[i]};
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
