const data = require("../util/userdata");
const ratio = require("../recosys/ratio");
const collab = require("../recosys/collab");

async function frenaccept(user_id, fren_id)
{
	await data.updateFriendlist(user_id, fren_id);
	await data.updateRequest(user_id, fren_id);
	
	const cur1 = await data.getProfileById(user_id);
	const cur2 = await data.getProfileById(fren_id);

	friendlist1 = Array(cur1.friends.length);
	friendlist2 = Array(cur2.friends.length);

	var arr1 = await ratio.updateratio(cur1, cur2, friendlist1);
	arr1.push(await collab.clusallot(user_id));
	
	var arr2 = await ratio.updateratio(cur2, cur1, friendlist2);
	arr2.push(await collab.clusallot(fren_id));
	
	await data.updateDets(user_id, arr1);
	await data.updateDets(fren_id, arr2);

}