const data = require("../util/userdata");

async function meetaccept(user_id, fren_id)
{
	try{
		await data.updateAccRejMeet(user_id, fren_id);	
		await data.newNotif(fren_id, user_id, "macc");
		await data.removeNotif(user_id, fren_id, "mreq");
		await data.newNotif(user_id, fren_id, "macc");
	} catch(err){
		throw new Error(err);
	}
}

async function meetreject(user_id, fren_id)
{
	try{
		await data.updateAccRejMeet(user_id, fren_id, 0);
		await data.removeNotif(user_id, fren_id, "mreq");
	} catch(err){
		throw new Error(err);
	}
}

async function meetrequest(user_id, fren_id)
{
	try{
		await data.updateRequestMeet(user_id, fren_id);
		await data.newNotif(fren_id, user_id, "mreq");
	} catch(err){
		throw new Error(err);
	}
}


module.exports = { "meetrequest": meetrequest, "meetaccept": meetaccept, "meetreject": meetreject };
