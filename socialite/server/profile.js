const data = require('./util/userdata');
const content = require('./recosys/content');
const { createSourceEventStream } = require('graphql');

module.exports = async function profiledisp(curid, id) {
	cur = await data.getProfileById(curid);
	user = await data.getProfileById(id);
	flag = 0
	send = Array(cur.friends.length);

	for(i = 0; i < cur.friends.length; ++i)
	{
		if(cur.friends[i] == id)
			flag = 1
		send[i] = await data.getProfileById(cur.friends[i]);
	}

	email = await data.getUserEmail(id);
	curdets = await data.getUserDetsById(cur);
	ret = await content.common(cur, user, send, email, curdets);
	ret.friend = flag;
	return ret;
}
