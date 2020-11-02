const data = require('./util/userdata');
const content = require('./recosys/content');

module.exports = async function profiledisp(curid, id) {
	cur = await data.getProfileById(curid);
	user = await data.getProfileById(id);

	send = Array(cur.friends.length);
	for(i = 0; i < cur.friends.length; ++i)
		send[i] = await data.getProfileById(cur.friends[i]);

	email = await data.getUserEmail(id);
	curdets = await data.getUserDetsById(cur);
	ret = await content.common(cur, user, send, email, curdets);
	return ret;
}
