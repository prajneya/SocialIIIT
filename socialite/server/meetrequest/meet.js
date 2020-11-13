const data = require("../util/userdata");

async function meetaccept(user_id, fren_id)
{
	await data.updateAccRejMeet(user_id, fren_id);	
	await data.updateNotif(fren_id, user_id, "macc");
}

async function meetreject(user_id, fren_id)
{
	await data.updateAccRejMeet(user_id, fren_id);
}

async function meetrequest(user_id, fren_id)
{
	await data.updateRequestMeet(user_id, fren_id);
	await data.updateNotif(fren_id, user_id, "mreq");
}


module.exports = { "meetrequest": meetrequest, "meetaccept": meetaccept, "meetreject": meetreject };
