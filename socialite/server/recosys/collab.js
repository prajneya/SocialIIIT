const User = require("../models/user-model");
const util = require("../controllers/util");

//const empty = require("is-empty");
const ex = require("express");
ctr = 0;
var score = [{}];

function friendlist(id, flag)
{
	const cur = util(body);

	for(i = 0; i < cur.friends.length; ++i)
	{
		if(flag)
		{
			if(score[cur.friends[i]])
				++score[cur.friends[i]];
			else
				score[cur.friends[i]] = 0;
		}
		friendlist(cur.friends[i], 1);
	}
}

main = async(req, res) => {
	const body = req.body;

	friendlist(body.Id, 0);
	//User x = await util(body);
}

module.exports = {
	main
};
