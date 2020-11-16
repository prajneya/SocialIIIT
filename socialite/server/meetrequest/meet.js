const data = require("../util/userdata");

async function meetaccept(user_id, fren_id)
{
	await data.updateAccRejMeet(user_id, fren_id);	
	await data.newNotif(fren_id, user_id, "macc");
	await data.removeNotif(user_id, fren_id, "mreq");
	await data.newNotif(user_id, fren_id, "macc");
}

async function meetreject(user_id, fren_id)
{
	await data.updateAccRejMeet(user_id, fren_id, 0);
	await data.removeNotif(user_id, fren_id, "mreq");
}

async function meetrequest(user_id, fren_id)
{
	await data.updateRequestMeet(user_id, fren_id);
	await data.newNotif(fren_id, user_id, "mreq");
}


module.exports = { "meetrequest": meetrequest, "meetaccept": meetaccept, "meetreject": meetreject };
