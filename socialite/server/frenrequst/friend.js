const data = require("../util/userdata");
const ratio = require("../recosys/ratio");
const collab = require("../recosys/collab");

//how to include friendlist and also cluster
async function frenaccept(user_id, fren_id)
{
	await data.updateRequest(user_id, fren_id);
	var arr = await ratio.updateratio(user_id, fren_id, friendlist);
	await data.updateFriend(user_id, arr);

}