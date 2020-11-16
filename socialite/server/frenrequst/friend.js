const data = require("../util/userdata");
const ratio = require("../recosys/ratio");
const collab = require("../recosys/collab");
const notif = require("../notif");

async function frenaccept(user_id, fren_id)
{
	await data.updateFriendlist(user_id, fren_id);
	await data.updateAccRej(user_id, fren_id);
	await data.newNotif(fren_id, user_id, "facc");
	await data.removeNotif(user_id, fren_id, "freq");
	
	const cur1 = await data.getProfileById(user_id);
	const cur2 = await data.getProfileById(fren_id);

	friendlist1 = Array(cur1.friends.length);
	friendlist2 = Array(cur2.friends.length);

	var arr1 = await ratio.updateratio(cur1, cur2, friendlist1);
	var arr2 = await ratio.updateratio(cur2, cur1, friendlist2);
	rand = await collab.clusallot();
	
	await data.updateDets(user_id, arr1);
	await data.updateDets(fren_id, arr2);
	// await notif.sendNotif(user_id);

}

async function frenreject(user_id, fren_id)
{
	await data.updateAccRej(user_id, fren_id, 0);
	await data.removeNotif(user_id, fren_id, "freq");
}

async function frenrequest(user_id, fren_id)
{
	// await notif.sendNotif(fren_id);
	await data.updateRequest(user_id, fren_id);
	await data.newNotif(fren_id, user_id, "freq");
}


module.exports = { "frenrequest": frenrequest, "frenaccept": frenaccept, "frenreject": frenreject };
