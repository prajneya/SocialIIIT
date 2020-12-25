const data = require('./util/userdata');
const content = require('./recosys/content');
const { createSourceEventStream } = require('graphql');
const { Meet } = require('./models/User')

module.exports = async function profiledisp(curid, id) {
	try{
		console.log("noice")
		cur = await data.getProfileById(curid);
		user = await data.getProfileById(id);
		flag = 0
		send = Array(cur.friends.length);

		arr1 = [curid, id]
		arr2 = [id, curid]
		var meetf = await Meet.findOne({people: arr1})
		if(!meetf)
			var meetf = await Meet.findOne({people: arr2})

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
		if(meetf && curdets.sendmeet.includes(meetf._id))
			ret.meet = 2
		else if(meetf && curdets.requestmeet.includes(meetf._id))
			ret.meet = 3

		if(curdets.send.includes(user._id))
			ret.friend = 2
		else if(curdets.request.includes(user._id))
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
