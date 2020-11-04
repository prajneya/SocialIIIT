const data = require("../util/userdata");

async function meetaccept(user_id, fren_id)
{
	await data.updateAccRejMeet(user_id, fren_id);	
}

async function meetreject(user_id, fren_id)
{
	await data.updateAccRejMeet(user_id, fren_id);
}

async function meetrequest(user_id, fren_id)
{
	await data.updateRequestMeet(user_id, fren_id);
}


module.exports = { "meetrequest": meetrequest, "meetaccept": meetaccept, "meetreject": meetreject };
