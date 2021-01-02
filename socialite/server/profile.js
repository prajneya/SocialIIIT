const data = require('./util/userdata');
const content = require('./recosys/content');
const { createSourceEventStream } = require('graphql');

module.exports = async function profiledisp(curid, id) {
	try{
		cur = await data.getProfileById(curid);
		user = await data.getProfileById(id);
		flag = 0
		send = Array(cur.friends.length);
		var meetf = await data.getMeet(curid, id)

		for(i = 0; i < cur.friends.length; ++i)
		{
			if(cur.friends[i] == id)
				flag = 1
			send[i] = await data.getProfileById(cur.friends[i]);
		}

		info =  await data.getUserInfo(id);
		email = info.email
		username = info.username
		curdets = await data.getUserDetsById(cur);
		ret = await content.common(cur, user, send, email, curdets);
		ret.friend = flag;
		ret.meet = 0
		ret.username = username
		if(meetf && await curdets.sendmeet.includes(meetf._id))
			ret.meet = 2
		else if(meetf && await curdets.requestmeet.includes(meetf._id))
			ret.meet = 3

		if(await curdets.send.includes(user._id))
			ret.friend = 2
		else if(await curdets.request.includes(user._id))
			ret.friend = 3

		if(curid == id)
		{
			ret.friend = 4
			ret.meet = 4
		}
		return ret;
	} catch(err){
		throw new Error(err);
	}
}
